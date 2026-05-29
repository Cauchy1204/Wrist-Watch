import { daysAgo } from "./date";
import { regionLabels, SymptomRecord } from "@/types/symptom";

export function recentRecords(records: SymptomRecord[], days = 14) {
  const start = daysAgo(days - 1);
  return records.filter((record) => new Date(record.createdAt) >= start);
}

export function summarize(records: SymptomRecord[]) {
  const recent = recentRecords(records);
  const symptomRecords = recent.filter((record) => !record.noSymptom);
  const severities = symptomRecords
    .map((record) => record.severity)
    .filter((value): value is number => typeof value === "number");
  const noSymptomDays = new Set(
    recent.filter((record) => record.noSymptom).map((record) => new Date(record.createdAt).toDateString())
  ).size;

  const mostCommonRegion = mostCommon(symptomRecords.map((record) => record.region));
  const commonTrigger = mostCommon(symptomRecords.map((record) => record.trigger).filter(Boolean) as string[]);
  const commonMotion = mostCommon(symptomRecords.flatMap((record) => record.aggravatingMotion ?? []));
  const averageSeverity = severities.length
    ? Number((severities.reduce((sum, value) => sum + value, 0) / severities.length).toFixed(1))
    : 0;

  return {
    symptomCount: symptomRecords.length,
    noSymptomDays,
    mostCommonRegion: mostCommonRegion ? regionLabels[mostCommonRegion] : "暂无",
    highestSeverity: severities.length ? Math.max(...severities) : 0,
    averageSeverity,
    commonTrigger: commonTrigger ?? "暂无",
    commonMotion: commonMotion ?? "暂无",
    doctorText:
      symptomRecords.length === 0
        ? "最近14天暂无右腕症状记录，可继续观察并补充日常无症状记录。"
        : `最近14天共记录右腕症状${symptomRecords.length}次，无症状天数${noSymptomDays}天。最常见疼痛部位为${mostCommonRegion ? regionLabels[mostCommonRegion] : "未明确"}，最高强度${severities.length ? Math.max(...severities) : 0}/10，平均强度${averageSeverity}/10。常见诱因为${commonTrigger ?? "未明确"}，常见加重动作为${commonMotion ?? "未明确"}。建议就诊时结合具体动作、持续时间和是否伴随麻木无力进一步评估。`
  };
}

export type SummaryResult = ReturnType<typeof summarize>;

function mostCommon<T extends string>(items: T[]) {
  const counts = new Map<T, number>();
  items.forEach((item) => counts.set(item, (counts.get(item) ?? 0) + 1));
  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
}
