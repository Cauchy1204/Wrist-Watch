import { PainRegion } from "@/types/symptom";

export type Hotspot = {
  id: PainRegion;
  d: string;
};

export const palmHotspots: Hotspot[] = [
  {
    id: "right_radial_wrist",
    d: "M260 908C302 846 372 829 428 862C408 920 406 982 430 1042C363 1065 296 1040 258 984C239 956 239 930 260 908Z"
  },
  {
    id: "right_central_wrist",
    d: "M428 862C494 830 583 831 646 862C680 920 680 992 646 1050C583 1082 494 1081 430 1042C406 982 408 920 428 862Z"
  },
  {
    id: "right_ulnar_wrist",
    d: "M646 862C707 835 775 858 806 916C826 956 813 999 776 1030C738 1062 688 1063 646 1050C680 992 680 920 646 862Z"
  }
];

export const dorsalHotspots: Hotspot[] = [
  {
    id: "right_dorsal_radial_wrist",
    d: "M260 910C305 852 373 838 428 866C407 924 407 986 431 1044C367 1064 299 1041 260 986C239 956 239 932 260 910Z"
  },
  {
    id: "right_dorsal_central_wrist",
    d: "M428 866C494 836 584 836 648 866C682 923 682 992 648 1048C584 1080 495 1080 431 1044C407 986 407 924 428 866Z"
  },
  {
    id: "right_dorsal_ulnar_wrist",
    d: "M648 866C709 839 777 861 807 918C828 958 815 1000 778 1030C740 1060 690 1062 648 1048C682 992 682 923 648 866Z"
  },
  {
    id: "anatomical_snuffbox",
    d: "M196 770C232 704 297 686 351 730C340 796 293 852 226 868C188 838 176 804 196 770Z"
  }
];
