"use client";

import { AppSettings, SymptomRecord } from "./types";

const RECORDS_KEY = "rise-watch-records";
const SETTINGS_KEY = "rise-watch-settings";

export const defaultSettings: AppSettings = {
  reminderEnabled: true,
  reminderTime: "18:00"
};

export function loadRecords(): SymptomRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const value = window.localStorage.getItem(RECORDS_KEY);
    return value ? (JSON.parse(value) as SymptomRecord[]) : [];
  } catch {
    return [];
  }
}

export function saveRecords(records: SymptomRecord[]) {
  window.localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
  window.dispatchEvent(new Event("rise-watch-storage"));
}

export function addRecord(record: SymptomRecord) {
  const records = loadRecords();
  saveRecords([record, ...records]);
}

export function loadSettings(): AppSettings {
  if (typeof window === "undefined") return defaultSettings;
  try {
    const value = window.localStorage.getItem(SETTINGS_KEY);
    return value ? { ...defaultSettings, ...(JSON.parse(value) as AppSettings) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: AppSettings) {
  window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event("rise-watch-storage"));
}
