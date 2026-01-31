import localforage from "localforage";

const WEIGHT_STORAGE_KEY = "weight-tracker:weights";
const SETTINGS_STORAGE_KEY = "weight-tracker:settings";

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
    return Array.isArray(raw) ? raw : [];
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
};
