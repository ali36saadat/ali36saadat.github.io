const closeContentPanel = (panel, onClose = () => {}) => {
  if (!panel?.open || panel.classList.contains("is-closing")) return;

  panel.classList.add("is-closing");

  const finish = () => {
    if (!panel.open || !panel.classList.contains("is-closing")) return;
    window.clearTimeout(panel.closeTimer);
    panel.open = false;
    panel.classList.remove("is-closing");
    panel.closeTransitionHandler = null;
    onClose();
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finish();
    return;
  }

  panel.closeTransitionHandler = (transitionEvent) => {
    if (transitionEvent.target === panel && transitionEvent.propertyName === "clip-path") finish();
  };
  panel.addEventListener("transitionend", panel.closeTransitionHandler, { once: true });
  panel.closeTimer = window.setTimeout(finish, 700);
};

document.addEventListener("click", (event) => {
  const summary = event.target.closest(".content-disclosure > summary");
  if (!summary) return;

  const panel = summary.parentElement;
  if (!panel.open) return;

  event.preventDefault();
  closeContentPanel(panel);
});

document.addEventListener("click", (event) => {
  const summary = event.target.closest(".site-disclosure > summary");
  if (!summary) return;

  const panel = summary.parentElement;
  event.preventDefault();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const iconClipPath = "circle(calc(var(--toggle-size) / 2) at var(--toggle-origin) var(--toggle-y))";

  if (!panel.open) {
    if (reducedMotion) {
      panel.open = true;
      return;
    }

    panel.style.setProperty("transition", "none");
    panel.style.setProperty("clip-path", iconClipPath);
    panel.open = true;
    panel.offsetWidth;
    panel.style.removeProperty("transition");
    panel.style.removeProperty("clip-path");
    return;
  }

  if (panel.classList.contains("is-closing")) {
    window.clearTimeout(panel.closeTimer);
    if (panel.closeTransitionHandler) {
      panel.removeEventListener("transitionend", panel.closeTransitionHandler);
      panel.closeTransitionHandler = null;
    }
    panel.classList.remove("is-closing");

    if (reducedMotion) return;

    const currentClipPath = window.getComputedStyle(panel).clipPath;
    panel.style.setProperty("transition", "none");
    panel.style.setProperty("clip-path", currentClipPath);
    panel.offsetWidth;
    panel.style.removeProperty("transition");
    panel.style.removeProperty("clip-path");
    return;
  }

  if (reducedMotion) {
    panel.open = false;
    return;
  }

  const currentClipPath = window.getComputedStyle(panel).clipPath;
  panel.style.setProperty("transition", "none");
  panel.style.setProperty("clip-path", currentClipPath);
  panel.classList.add("is-closing");
  panel.offsetWidth;
  panel.style.removeProperty("transition");
  panel.style.removeProperty("clip-path");

  const finish = () => {
    if (!panel.open || !panel.classList.contains("is-closing")) return;
    window.clearTimeout(panel.closeTimer);
    panel.style.setProperty("transition", "none");
    panel.open = false;
    panel.classList.remove("is-closing");
    panel.offsetWidth;
    panel.style.removeProperty("transition");
    panel.closeTransitionHandler = null;
  };

  panel.closeTransitionHandler = (transitionEvent) => {
    if (transitionEvent.target === panel && transitionEvent.propertyName === "clip-path") finish();
  };
  panel.addEventListener("transitionend", panel.closeTransitionHandler, { once: true });
  panel.closeTimer = window.setTimeout(finish, 700);
});

document.addEventListener("click", (event) => {
  const link = event.target.closest(".content-disclosure-content a[href^='#']");
  if (!link) return;

  const panel = link.closest(".content-disclosure");
  if (!panel?.open) return;

  const targetId = decodeURIComponent(link.hash.slice(1));
  const target = document.getElementById(targetId);
  if (!target) return;

  event.preventDefault();
  closeContentPanel(panel, () => {
    window.history.pushState(null, "", link.hash);
    target.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  });
});