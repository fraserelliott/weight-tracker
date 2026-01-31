import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { useDataStore } from "./DataContext";
import {
  parseDateFormatString,
  formatDate,
} from "@fraserelliott/date-formatter";

const SettingsContext = createContext(undefined);

const DEFAULT_SETTINGS = Object.freeze({
  dateFormat: parseDateFormatString("WWW DD/MM/YYYY"),
});

export const SettingsProvider = ({ children }) => {
  const store = useDataStore();
  const saveQueue = useRef(Promise.resolve());
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // Hydrate once
  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const retrievedSettings = await store.getSettings();
        if (!cancelled) {
          setSettings(
            retrievedSettings &&
              typeof retrievedSettings === "object" &&
              !Array.isArray(retrievedSettings)
              ? retrievedSettings
              : DEFAULT_SETTINGS,
          );
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("Failed to load settings:", err);
          setSettings(DEFAULT_SETTINGS);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [store]);

  // Persist snapshots, serialized, but only after hydration
  useEffect(() => {
    if (loading) return;

    saveQueue.current = saveQueue.current
      .then(() => store.saveSettings(settings))
      .catch((err) => {
        // keep the chain alive
        console.error("Failed to save settings:", err);
      });
  }, [store, settings, loading]);

  // Mutators: sync, stable, based on prev state
  const setDateFormat = useCallback((format) => {
    const parsed =
      typeof format === "string"
        ? parseDateFormatString(format)
        : { ...format };
    setSettings((prev) => ({ ...prev, dateFormat: parsed }));
  }, []);

  // Functions consuming settings
  const dateFormatSetting = settings?.dateFormat ?? DEFAULT_SETTINGS.dateFormat;

  const applyDateFormat = useCallback(
    (date) => formatDate(date, dateFormatSetting),
    [dateFormatSetting],
  );

  const value = useMemo(
    () => ({
      settings,
      loading,
      setDateFormat,
      applyDateFormat,
    }),
    [settings, loading, setDateFormat, applyDateFormat],
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (ctx === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return ctx;
}
