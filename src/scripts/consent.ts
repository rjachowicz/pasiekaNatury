import {
  getPrivacyPreferences,
  openPrivacySettingsEvent,
  privacyPreferencesEvent,
  savePrivacyPreferences,
} from "./privacyPreferences";
import { lockDocumentScroll, unlockDocumentScroll } from "./documentScrollLock";

const dialog = document.querySelector<HTMLDialogElement>(
  "[data-privacy-consent]",
);
const acceptButton = dialog?.querySelector<HTMLButtonElement>(
  "[data-consent-accept]",
);
const denyButton = dialog?.querySelector<HTMLButtonElement>(
  "[data-consent-deny]",
);
const currentChoice = dialog?.querySelector<HTMLElement>(
  "[data-consent-current]",
);
let opener: HTMLElement | null = null;

const openDialog = (openingElement?: HTMLElement) => {
  const preferences = getPrivacyPreferences();
  if (currentChoice) {
    currentChoice.hidden = !preferences;
    currentChoice.textContent = preferences
      ? preferences.googleMaps
        ? "Aktualny wybór: mapa Google jest włączona."
        : "Aktualny wybór: mapa Google jest wyłączona."
      : "";
  }
  if (dialog && !dialog.open) {
    opener =
      openingElement ??
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null);
    lockDocumentScroll("privacy-consent");
    dialog.showModal();
  }
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
  .forEach((button) =>
    button.addEventListener("click", () => openDialog(button)),
  );
window.addEventListener(openPrivacySettingsEvent, () => openDialog());
window.addEventListener(privacyPreferencesEvent, () => {
  if (dialog?.open) openDialog();
});
if (!getPrivacyPreferences()) openDialog();

dialog?.addEventListener("close", () => {
  unlockDocumentScroll("privacy-consent");
  opener?.focus();
  opener = null;
});
