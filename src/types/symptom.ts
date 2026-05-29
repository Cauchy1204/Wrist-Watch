export type HandView = "palm" | "dorsal";

export type PainRegion =
  | "right_ulnar_wrist"
  | "right_radial_wrist"
  | "right_central_wrist"
  | "thenar"
  | "hypothenar"
  | "right_dorsal_ulnar_wrist"
  | "right_dorsal_radial_wrist"
  | "right_dorsal_central_wrist"
  | "anatomical_snuffbox";

export interface SymptomRecord {
  id: string;
  createdAt: string;
  occurredAt?: string;
  bodyPart: "right_wrist";
  view: HandView;
  region: PainRegion;
  painType?: string;
  severity?: number;
  triggers?: string[];
  trigger?: string;
  aggravatingMotion?: string[];
  relievingFactors?: string[];
  rawText: string;
  note?: string;
  noSymptom?: boolean;
}

export interface AppSettings {
  reminderEnabled: boolean;
  reminderTime: string;
}

export const regionLabels: Record<PainRegion, string> = {
  right_ulnar_wrist: "尺侧掌侧腕部",
  right_radial_wrist: "桡侧掌侧腕部",
  right_central_wrist: "中央掌侧腕部",
  thenar: "大鱼际",
  hypothenar: "小鱼际",
  right_dorsal_ulnar_wrist: "尺侧背侧腕部",
  right_dorsal_radial_wrist: "桡侧背侧腕部",
  right_dorsal_central_wrist: "中央背侧腕部",
  anatomical_snuffbox: "解剖鼻烟窝"
};
