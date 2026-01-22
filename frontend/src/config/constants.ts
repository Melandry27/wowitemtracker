export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

export const API_ENDPOINTS = {
  items: {
    getAll: () => `${API_BASE_URL}/api/items`,
    getById: (id: string) => `${API_BASE_URL}/api/items/${id}`,
    create: () => `${API_BASE_URL}/api/items`,
    update: (id: string) => `${API_BASE_URL}/api/items/${id}`,
    delete: (id: string) => `${API_BASE_URL}/api/items/${id}`,
    stats: () => `${API_BASE_URL}/api/items/stats`,
  },
};

export const ITEM_TYPES = [
  "Armor",
  "Weapon",
  "Accessory",
  "Consumable",
  "Crafting Material",
  "Quest Item",
  "Other",
] as const;

export const ITEM_STATUS = {
  OWNED: "owned",
  SOLD: "sold",
} as const;
