import localforage from "localforage";
import { v4 as uuidv4 } from "uuid";

const STORAGE_KEY = "weight-tracker:weights";

/** @returns {Promise<import("../core/types").WeightEntry[]>} */
async function readAll() {
  const raw = await localforage.getItem(STORAGE_KEY);
  if (!raw) return [];

  if (Array.isArray(raw)) {
    return /** @type {import("../core/types").WeightEntry[]} */ (raw);
  }

  try {
    // if for some reason it’s a JSON string
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/** @param {import("../core/types").WeightEntry[]} weights */
async function writeAll(weights) {
  await localforage.setItem(STORAGE_KEY, weights);
}

/** @type {import("../core/types").WeightDataStore} */
export const dataStore = {
  async addWeight(entryWithoutId) {
    const weights = await readAll();
    const newEntry = { id: uuidv4(), ...entryWithoutId };
    const updated = [...weights, newEntry];
    await writeAll(updated);
    return newEntry;
  },

  async getWeights() {
    return readAll();
  },

  async updateWeight(id, updates) {
    const weights = await readAll();
    const index = weights.findIndex((w) => w.id === id);
    if (index === -1) return null;

    const updatedEntry = { ...weights[index], ...updates };
    const updatedList = [...weights];
    updatedList[index] = updatedEntry;
    await writeAll(updatedList);
    return updatedEntry;
  },

  async deleteWeight(id) {
    const weights = await readAll();
    const updated = weights.filter((w) => w.id !== id);
    await writeAll(updated);
  },
};
