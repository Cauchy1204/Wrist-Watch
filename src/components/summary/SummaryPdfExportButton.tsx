"use client";

import { Document, Font, Page, PDFDownloadLink, StyleSheet, Text, View } from "@react-pdf/renderer";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import { recentRecords, SummaryResult } from "@/lib/summary";
import { regionLabels, SymptomRecord } from "@/types/symptom";

Font.register({
  family: "STHeiti",
  src: "/fonts/STHeiti.ttf"
});

const REPORT_DAYS = 14;

export function SummaryPdfExportButton({
  records,
  summary
}: {
  records: SymptomRecord[];
  summary: SummaryResult;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const fileName = `wrist-symptom-summary-${formatDateForFile(new Date())}.pdf`;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <button
        type="button"
        disabled
        className="primary-action mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-semibold text-white opacity-70"
      >
        <Download size={18} />
        准备导出 PDF...
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<SummaryPdfDocument records={records} summary={summary} />}
      fileName={fileName}
      className="primary-action mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-semibold text-white"
    >
      {({ loading }) => (
        <>
          <Download size={18} />
          {loading ? "正在生成 PDF..." : "导出就诊报告 PDF"}
        </>
      )}
    </PDFDownloadLink>
  );
}

function SummaryPdfDocument({
  records,
  summary
}: {
  records: SymptomRecord[];
  summary: SummaryResult;
}) {
  const reportRecords = recentRecords(records, REPORT_DAYS);
  const symptomRecords = reportRecords.filter((record) => !record.noSymptom);
  const latestRecord = reportRecords[0];
  const generatedAt = new Date();

  return (
    <Document
      title="腕关节症状记录摘要"
      author="Rise the Watch"
      subject="右腕症状就诊沟通摘要"
    >
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>腕关节症状记录摘要</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>基本信息</Text>
          <InfoRow label="报告周期" value={`最近${REPORT_DAYS}天`} />
          <InfoRow label="生成时间" value={formatPdfDateTime(generatedAt)} />
          <InfoRow label="数据来源" value="Rise the Watch 自我症状记录" />
        </View>

        <View style={styles.notice}>
          <Text>本报告基于用户自述症状记录生成，仅供就诊沟通参考，不作为诊断依据。</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>摘要</Text>
          <Text style={styles.paragraph}>{buildPdfSummary(summary)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>关键统计</Text>
          <View style={styles.statsGrid}>
            <Stat label="记录总次数" value={`${symptomRecords.length}`} />
            <Stat label="最高疼痛评分" value={`${summary.highestSeverity}/10`} />
            <Stat label="平均疼痛评分" value={`${summary.averageSeverity}/10`} />
            <Stat label="最常见疼痛区域" value={summary.mostCommonRegion} />
            <Stat label="最常见诱因" value={summary.commonTrigger} />
            <Stat label="最近一次记录时间" value={latestRecord ? formatPdfDateTime(new Date(latestRecord.createdAt)) : "暂无"} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>详细记录</Text>
          {reportRecords.length ? (
            reportRecords.map((record) => <RecordItem key={record.id} record={record} />)
          ) : (
            <Text style={styles.empty}>暂无记录。</Text>
          )}
        </View>
      </Page>
    </Document>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

function RecordItem({ record }: { record: SymptomRecord }) {
  return (
    <View style={styles.recordItem}>
      <Text style={styles.recordDate}>{formatPdfDateTime(new Date(record.createdAt))}</Text>
      <InfoRow label="疼痛区域" value={record.noSymptom ? "无症状记录" : regionLabels[record.region]} />
      <InfoRow label="疼痛程度" value={record.noSymptom ? "0/10" : `${record.severity ?? "未记录"}/10`} />
      <InfoRow label="疼痛诱因" value={formatTriggers(record)} />
      <InfoRow label="备注" value={record.note || record.rawText || "无"} />
    </View>
  );
}

function buildPdfSummary(summary: SummaryResult) {
  return `最近${REPORT_DAYS}天共记录右腕症状${summary.symptomCount}次，主要疼痛区域为${summary.mostCommonRegion}，最高疼痛评分为${summary.highestSeverity}/10，平均疼痛评分为${summary.averageSeverity}/10，常见诱因为${summary.commonTrigger}。`;
}

function formatTriggers(record: SymptomRecord) {
  if (record.triggers?.length) return record.triggers.join("、");
  if (record.trigger) return record.trigger;
  return "未记录";
}

function formatDateForFile(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatPdfDateTime(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontFamily: "STHeiti",
    color: "#2F293D",
    backgroundColor: "#FAF8FF",
    fontSize: 10,
    lineHeight: 1.55
  },
  title: {
    fontSize: 22,
    color: "#6D4FDB",
    marginBottom: 18,
    fontWeight: 700
  },
  section: {
    marginBottom: 16,
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#EDE9FE"
  },
  sectionTitle: {
    fontSize: 13,
    color: "#6D4FDB",
    marginBottom: 9,
    fontWeight: 700
  },
  infoRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 5
  },
  infoLabel: {
    width: 80,
    color: "#6B6478"
  },
  infoValue: {
    flex: 1,
    color: "#2F293D"
  },
  notice: {
    marginBottom: 16,
    padding: 12,
    borderRadius: 10,
    color: "#5B536B",
    backgroundColor: "#F5F3FF",
    borderWidth: 1,
    borderColor: "#EDE9FE"
  },
  paragraph: {
    color: "#3B334A"
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  statBox: {
    width: "31.5%",
    minHeight: 58,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F5F3FF"
  },
  statLabel: {
    color: "#6B6478",
    fontSize: 8,
    marginBottom: 5
  },
  statValue: {
    color: "#2F293D",
    fontSize: 10,
    fontWeight: 700
  },
  recordItem: {
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EDE9FE"
  },
  recordDate: {
    color: "#8B5CF6",
    fontWeight: 700,
    marginBottom: 6
  },
  empty: {
    color: "#6B6478"
  }
});
