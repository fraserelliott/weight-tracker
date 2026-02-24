import localforage from "localforage";

const WEIGHT_STORAGE_KEY = "weight-tracker:weights";
const SETTINGS_STORAGE_KEY = "weight-tracker:settings";
const GOAL_STORAGE_KEY = "weight-tracker:goal";

async function load(key) {
  const raw = await localforage.getItem(key);
  return raw ?? null;
}

async function save(key, value) {
  await localforage.setItem(key, value);
}

export const dataStore = {
  async getWeights() {
    const raw = await load(WEIGHT_STORAGE_KEY);
    if (!Array.isArray(raw)) return [];

    // hydrate to expected format
    return raw.map((e) => ({
      id: String(e.id),
      date: String(e.date),
      weightKg:
        typeof e.weightKg === "number" ? e.weightKg : parseFloat(e.weightKg),
    }));
  },

  async saveWeights(weights) {
    await save(WEIGHT_STORAGE_KEY, weights);
  },

  async getSettings() {
    const raw = await load(SETTINGS_STORAGE_KEY);
    return raw && typeof raw === "object" && !Array.isArray(raw) ? raw : null;
  },

  async saveSettings(settings) {
    await save(SETTINGS_STORAGE_KEY, settings);
  },

  async getGoal() {
    const raw = await load(GOAL_STORAGE_KEY);
    return raw && typeof raw === "object" && !Array.isArray(raw) ? raw : null;
  },

  async saveGoal(goal) {
    await save(GOAL_STORAGE_KEY, goal);
  },
};
