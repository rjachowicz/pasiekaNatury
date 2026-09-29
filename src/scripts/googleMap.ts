import {
  getPrivacyPreferences,
  openPrivacySettingsEvent,
  privacyPreferencesEvent,
} from "./privacyPreferences";

document.querySelectorAll<HTMLElement>("[data-map-root]").forEach((map) => {
  const iframe = map.querySelector<HTMLIFrameElement>("[data-map-iframe]");
  const placeholder = map.querySelector<HTMLElement>("[data-map-placeholder]");
  const enableButton = map.querySelector<HTMLButtonElement>(
    "[data-enable-google-map]",
  );
  if (!iframe || !placeholder || !enableButton) return;

  const loadMap = () => {
    if (!iframe.getAttribute("src")) iframe.src = iframe.dataset.src ?? "";
    placeholder.setAttribute("hidden", "");
    iframe.removeAttribute("hidden");
  };

  const unloadMap = () => {
    iframe.removeAttribute("src");
    iframe.setAttribute("hidden", "");
    placeholder.removeAttribute("hidden");
  };

  const hasConsent = () => getPrivacyPreferences()?.googleMaps === true;

  if (hasConsent()) loadMap();

  enableButton.addEventListener("click", () => {
    if (hasConsent()) {
      loadMap();
      return;
    }
    window.dispatchEvent(new CustomEvent(openPrivacySettingsEvent));
  });

  window.addEventListener(privacyPreferencesEvent, (event) => {
    if ((event as CustomEvent<{ googleMaps: boolean }>).detail.googleMaps) {
      loadMap();
      return;
    }
    unloadMap();
  });
});
