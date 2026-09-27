const storageKey = "pasieka_google_maps_consent_v1";
const dialog = document.querySelector<HTMLDialogElement>(".privacy-consent");
const acceptButton = document.querySelector<HTMLButtonElement>(
  "[data-consent-accept]",
);
const denyButton = document.querySelector<HTMLButtonElement>(
  "[data-consent-deny]",
);

const getConsent = () => {
  const value = localStorage.getItem(storageKey);
  return value === "accepted" || value === "denied" ? value : null;
};

const openDialog = () => {
  if (dialog && !dialog.open) dialog.showModal();
};

const saveConsent = (value: "accepted" | "denied") => {
  localStorage.setItem(storageKey, value);
  dialog?.close();
  window.dispatchEvent(
    new CustomEvent("pasieka:google-maps-consent", { detail: value }),
  );
};

acceptButton?.addEventListener("click", () => saveConsent("accepted"));
denyButton?.addEventListener("click", () => saveConsent("denied"));
dialog?.addEventListener("cancel", (event) => {
  event.preventDefault();
  dialog.close();
});
document
  .querySelectorAll<HTMLElement>("[data-privacy-settings]")
  .forEach((button) => button.addEventListener("click", openDialog));
window.addEventListener("pasieka:open-privacy-settings", openDialog);
if (!getConsent()) openDialog();
