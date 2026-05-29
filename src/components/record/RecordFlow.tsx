"use client";

import { useState } from "react";
import { addRecord } from "@/lib/storage";
import { HandView, PainRegion, regionLabels } from "@/types/symptom";
import { NoteStep } from "./NoteStep";
import { ReviewSaveStep } from "./ReviewSaveStep";
import { SaveCompleteStep } from "./SaveCompleteStep";
import { SeverityStep } from "./SeverityStep";
import { StepIndicator } from "./StepIndicator";
import { SymptomLocationStep } from "./SymptomLocationStep";
import { TriggerStep } from "./TriggerStep";

export function RecordFlow() {
  const [step, setStep] = useState(1);
  const [view, setView] = useState<HandView>("palm");
  const [region, setRegion] = useState<PainRegion>("right_central_wrist");
  const [severity, setSeverity] = useState<number | null>(null);
  const [triggers, setTriggers] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [occurredDate, setOccurredDate] = useState(() => formatDateInputValue(new Date()));
  const [occurredTime, setOccurredTime] = useState(() => formatTimeInputValue(new Date()));

  function save() {
    const trimmedNote = note.trim();
    const now = new Date();
    const occurredAt = buildLocalDateTime(occurredDate, occurredTime) ?? now;

    addRecord({
      id: crypto.randomUUID(),
      createdAt: now.toISOString(),
      occurredAt: occurredAt.toISOString(),
      bodyPart: "right_wrist",
      view,
      region,
      rawText: buildRawText(region, severity, triggers, trimmedNote),
      severity: severity ?? undefined,
      triggers,
      trigger: triggers.join("、") || undefined,
      note: trimmedNote || undefined
    });
    setStep(6);
  }

  return (
    <>
      {step <= 5 ? <StepIndicator step={step} totalSteps={5} onBack={() => (step === 1 ? history.back() : setStep(step - 1))} /> : null}

      {step === 1 ? (
        <SymptomLocationStep view={view} region={region} onViewChange={setView} onRegionChange={setRegion} onNext={() => setStep(2)} />
      ) : null}

      {step === 2 ? <SeverityStep severity={severity} onSeverityChange={setSeverity} onNext={() => setStep(3)} /> : null}

      {step === 3 ? <TriggerStep triggers={triggers} onTriggersChange={setTriggers} onNext={() => setStep(4)} /> : null}

      {step === 4 ? (
        <NoteStep
          note={note}
          occurredDate={occurredDate}
          occurredTime={occurredTime}
          onNoteChange={setNote}
          onOccurredDateChange={setOccurredDate}
          onOccurredTimeChange={setOccurredTime}
          onNext={() => setStep(5)}
        />
      ) : null}

      {step === 5 ? (
        <ReviewSaveStep
          region={region}
          severity={severity}
          triggers={triggers}
          note={note}
          occurredAt={(buildLocalDateTime(occurredDate, occurredTime) ?? new Date()).toISOString()}
          onSave={save}
        />
      ) : null}

      {step === 6 ? <SaveCompleteStep /> : null}
    </>
  );
}

function formatDateInputValue(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTimeInputValue(date: Date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

function buildLocalDateTime(dateValue: string, timeValue: string) {
  if (!dateValue || !timeValue) return null;
  const date = new Date(`${dateValue}T${timeValue}`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function buildRawText(region: PainRegion, severity: number | null, triggers: string[], note: string) {
  const parts = [
    `部位：${regionLabels[region]}`,
    `疼痛强度：${severity === null ? "未选择" : `${severity}/10`}`,
    triggers.length ? `疼痛诱因：${triggers.join("、")}` : "",
    note ? `备注：${note}` : ""
  ].filter(Boolean);

  return parts.join("；");
}
