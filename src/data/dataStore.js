/**
 * @typedef {Object} WeightEntry
 * @property {string} id
 * @property {string} date  // ISO date string
 * @property {number} weightKg
 */

/**
 * @typedef {Object} WeightDataStore
 * @property {(entry: Omit<WeightEntry, "id">) => Promise<WeightEntry>} addWeight
 * @property {() => Promise<WeightEntry[]>} getWeights
 * @property {(id: string, updates: Partial<WeightEntry>) => Promise<WeightEntry | null>} updateWeight
 * @property {(id: string) => Promise<void>} deleteWeight
 */
