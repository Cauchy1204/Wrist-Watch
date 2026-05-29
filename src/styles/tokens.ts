export const tokens = {
  colors: {
    ink: "#2F293D",
    bodyInk: "#3B334A",
    mist: "#F5F3FF",
    shell: "#FAF8FF",
    pageTop: "#FFFCFF",
    pageBottom: "#F5F3FF",
    violet: "#8B5CF6",
    deepViolet: "#6D4FDB",
    azure: "#A78BFA",
    pulse: "#0EA5A4",
    white: "#FFFFFF",
    border: "rgba(196, 181, 253, 0.36)"
  },
  gradients: {
    appBackground:
      "radial-gradient(circle at 10% -5%, rgba(196, 181, 253, 0.22), transparent 30rem), radial-gradient(circle at 100% 4%, rgba(167, 139, 250, 0.14), transparent 26rem), linear-gradient(180deg, #fffaff 0%, #faf8ff 52%, #f5f3ff 100%)",
    shell:
      "linear-gradient(180deg, rgba(255, 252, 255, 0.9), rgba(250, 248, 255, 0.84)), rgba(250, 248, 255, 0.86)",
    panel:
      "radial-gradient(circle at 15% 0%, rgba(237, 233, 254, 0.44), transparent 20rem), linear-gradient(145deg, #a78bfa 0%, #8b5cf6 62%, #6d4fdb 100%)",
    card: "linear-gradient(180deg, rgba(255, 255, 255, 0.94), rgba(250, 248, 255, 0.84))",
    primaryAction: "linear-gradient(135deg, #6d4fdb 0%, #8b5cf6 58%, #a78bfa 100%)",
    accent: "linear-gradient(90deg, #A78BFA 0%, #8B5CF6 100%)"
  },
  radius: {
    shell: "0",
    card: "1rem",
    panel: "1.5rem",
    hero: "2rem",
    control: "0.75rem",
    pill: "999px"
  },
  shadows: {
    card: "0 12px 32px rgba(91, 70, 130, 0.08)",
    soft: "0 18px 48px rgba(91, 70, 130, 0.10)",
    lift: "0 12px 30px rgba(91, 70, 130, 0.09)",
    panel: "0 22px 54px rgba(109, 79, 219, 0.18)",
    action: "0 16px 34px rgba(109, 79, 219, 0.18)",
    ring: "0 10px 26px rgba(91, 70, 130, 0.09)"
  },
  spacing: {
    pageX: "1.25rem",
    pageBottom: "7rem",
    sectionGap: "1.25rem",
    cardPadding: "1rem",
    panelPadding: "1.25rem"
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
    letterSpacing: "0",
    heroSize: "2rem",
    titleSize: "1.875rem"
  },
  motion: {
    fast: "150ms",
    base: "200ms",
    slow: "300ms",
    easing: "ease-out"
  }
} as const;
