export type PrivacyPreferences = {
  version: 2;
  googleMaps: boolean;
  decidedAt: string;
};

export const privacyPreferencesKey = "pasieka_privacy_preferences_v2";
const legacyGoogleMapsConsentKey = "pasieka_google_maps_consent_v1";
export const privacyPreferencesEvent = "pasieka:privacy-preferences";
export const openPrivacySettingsEvent = "pasieka:open-privacy-settings";

const isPrivacyPreferences = (value: unknown): value is PrivacyPreferences => {
  if (!value || typeof value !== "object") return false;

  const preferences = value as Record<string, unknown>;
  return (
    preferences.version === 2 &&
    typeof preferences.googleMaps === "boolean" &&
    typeof preferences.decidedAt === "string"
  );
};

const readStorage = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

export const getPrivacyPreferences = (): PrivacyPreferences | null => {
  const storedValue = readStorage(privacyPreferencesKey);

  if (storedValue) {
    try {
      const preferences: unknown = JSON.parse(storedValue);
      if (isPrivacyPreferences(preferences)) return preferences;
    } catch {
      // Nieprawidłowa wartość jest traktowana jak brak zapisanej decyzji.
    }
  }

  const legacyValue = readStorage(legacyGoogleMapsConsentKey);
  if (legacyValue === "accepted" || legacyValue === "denied") {
    return savePrivacyPreferences(legacyValue === "accepted", false);
  }

  return null;
};

export const savePrivacyPreferences = (
  googleMaps: boolean,
  notify = true,
): PrivacyPreferences => {
  const preferences: PrivacyPreferences = {
    version: 2,
    googleMaps,
    decidedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(privacyPreferencesKey, JSON.stringify(preferences));
    localStorage.removeItem(legacyGoogleMapsConsentKey);
  } catch {
    // Strona nadal działa, gdy pamięć przeglądarki jest niedostępna.
  }

  if (notify) {
    window.dispatchEvent(
      new CustomEvent<PrivacyPreferences>(privacyPreferencesEvent, {
        detail: preferences,
      }),
    );
  }

  return preferences;
};
