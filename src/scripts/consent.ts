import {
  getPrivacyPreferences,
  privacyPreferencesEvent,
  savePrivacyPreferences,
} from "./privacyPreferences";

const dialog = document.querySelector<HTMLDialogElement>(".privacy-consent");
const acceptButton = document.querySelector<HTMLButtonElement>(
  "[data-consent-accept]",
);
const denyButton = document.querySelector<HTMLButtonElement>(
  "[data-consent-deny]",
);
const currentChoice = document.querySelector<HTMLElement>(
  "[data-consent-current]",
);

const openDialog = () => {
  const preferences = getPrivacyPreferences();
  if (currentChoice) {
    currentChoice.hidden = !preferences;
    currentChoice.textContent = preferences
      ? preferences.googleMaps
        ? "Aktualny wybór: mapa Google jest włączona."
        : "Aktualny wybór: mapa Google jest wyłączona."
      : "";
  }
  if (dialog && !dialog.open) dialog.showModal();
};

const saveConsent = (googleMaps: boolean) => {
  savePrivacyPreferences(googleMaps);
  dialog?.close();
};

acceptButton?.addEventListener("click", () => saveConsent(true));
denyButton?.addEventListener("click", () => saveConsent(false));
dialog?.addEventListener("cancel", (event) => {
  event.preventDefault();
  if (!getPrivacyPreferences()) saveConsent(false);
  else dialog.close();
});
document
  .querySelectorAll<HTMLElement>("[data-privacy-settings]")
  .forEach((button) => button.addEventListener("click", openDialog));
window.addEventListener("pasieka:open-privacy-settings", openDialog);
window.addEventListener(privacyPreferencesEvent, () => {
  if (dialog?.open) openDialog();
});
if (!getPrivacyPreferences()) openDialog();
