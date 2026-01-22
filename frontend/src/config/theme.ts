export interface Theme {
  name: string;
  colors: {
    // Backgrounds
    bgWorld: string;
    bgFrame: string;
    bgParchment: string;
    bgSlot: string;

    // Borders & Metals
    borderSilver: string;
    borderGold: string;
    borderGoldBright: string;

    // Text
    textNormal: string;
    textQuest: string;
    textGold: string;
    textLabel: string;
    textMuted: string;

    // Item Quality (Rarity)
    qualityPoor: string;
    qualityCommon: string;
    qualityUncommon: string;
    qualityRare: string;
    qualityEpic: string;
    qualityLegendary: string;
    qualityArtifact: string;

    // Status colors
    success: string;
    error: string;
    horde: string;
    alliance: string;
  };

  fonts: {
    warcraft: string;
    serif: string;
    ui: string;
  };

  spacing: {
    radiusWow: string;
  };

  effects: {
    shadowText: string;
  };
}

// Thème World of Warcraft Vanilla (Interface Authentique)
export const wowVanillaTheme: Theme = {
  name: "WoW Vanilla",
  colors: {
    // Backgrounds
    bgWorld: "#050614",
    bgFrame: "#111116",
    bgParchment: "#e3d5b6",
    bgSlot: "#181818",

    // Borders & Metals
    borderSilver: "#a3a3a3",
    borderGold: "#b39348",
    borderGoldBright: "#eecf6e",

    // Text
    textNormal: "#ffffff",
    textQuest: "#2f2010",
    textGold: "#ffd100",
    textLabel: "#fbdc66",
    textMuted: "#808080",

    // Item Quality (Codes Hex Officiels Vanilla)
    qualityPoor: "#9d9d9d",
    qualityCommon: "#ffffff",
    qualityUncommon: "#1eff00",
    qualityRare: "#0070dd",
    qualityEpic: "#a335ee",
    qualityLegendary: "#ff8000",
    qualityArtifact: "#e6cc80",

    // Status colors
    success: "#1eff00",
    error: "#ff2020",
    horde: "#8c1616",
    alliance: "#142e66",
  },

  fonts: {
    warcraft: '"MedievalSharp", cursive',
    serif: '"EB Garamond", serif',
    ui: '"Inter", sans-serif',
  },

  spacing: {
    radiusWow: "3px",
  },

  effects: {
    shadowText: "1px 1px 0px #000000",
  },
};

// Fonction pour obtenir le thème actuel (pourra être étendue)
export const getTheme = (themeName: string = "wow-vanilla"): Theme => {
  switch (themeName) {
    case "wow-vanilla":
      return wowVanillaTheme;
    default:
      return wowVanillaTheme;
  }
};

export const availableThemes = [
  { id: "wow-vanilla", name: "WoW Vanilla", theme: wowVanillaTheme },
];
