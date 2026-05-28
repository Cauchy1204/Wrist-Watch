"use client";

import { useEffect, useState } from "react";
import { loadRecords, loadSettings } from "./storage";
import { AppSettings, SymptomRecord } from "./types";

export function useRecords() {
  const [records, setRecords] = useState<SymptomRecord[]>([]);

  useEffect(() => {
    const sync = () => setRecords(loadRecords());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("rise-watch-storage", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("rise-watch-storage", sync);
    };
  }, []);

  return records;
}

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(loadSettings());

  useEffect(() => {
    const sync = () => setSettings(loadSettings());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("rise-watch-storage", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("rise-watch-storage", sync);
    };
  }, []);

  return settings;
}
