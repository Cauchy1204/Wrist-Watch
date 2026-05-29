import { PainRegion, SymptomRecord } from "@/types/symptom";

const painTypes = ["刺痛", "隐隐作痛", "酸痛", "胀痛", "麻木", "灼痛", "跳痛"];
const motions = ["打字", "拧瓶盖", "撑地", "提重物", "鼠标", "旋转", "屈伸", "用力握"];

export function parseSymptomText(text: string, region: PainRegion, view: SymptomRecord["view"]) {
  const severityMatch = text.match(/([0-9]|10)\s*(分|\/10)?/);
  const painType = painTypes.find((type) => text.includes(type)) ?? inferPainType(text);
  const aggravatingMotion = motions.filter((motion) => text.includes(motion));

  return {
    bodyPart: "right_wrist" as const,
    view,
    region,
    painType,
    severity: severityMatch ? Number(severityMatch[1]) : 4,
    trigger: inferTrigger(text),
    aggravatingMotion: aggravatingMotion.length ? aggravatingMotion : ["日常使用"],
    rawText: text,
    note: text
  };
}

function inferPainType(text: string) {
  if (text.includes("麻") || text.includes("木")) return "麻木";
  if (text.includes("酸")) return "酸痛";
  if (text.includes("刺")) return "刺痛";
  if (text.includes("胀")) return "胀痛";
  return "隐隐作痛";
}

function inferTrigger(text: string) {
  if (text.includes("打字") || text.includes("电脑")) return "长时间打字/电脑使用";
  if (text.includes("运动") || text.includes("健身")) return "运动后";
  if (text.includes("提") || text.includes("搬")) return "提拿重物";
  if (text.includes("早上") || text.includes("起床")) return "晨起后";
  return "日常活动后";
}
