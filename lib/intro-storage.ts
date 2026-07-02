const INTRO_SESSION_KEY = "alx-studio:intro-seen:v1";

function canUseSessionStorage() {
  return typeof window !== "undefined" && typeof window.sessionStorage !== "undefined";
}

export function hasSeenIntro() {
  if (!canUseSessionStorage()) {
    return false;
  }

  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === "seen";
  } catch {
    return false;
  }
}

export function markIntroAsSeen() {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "seen");
  } catch {
    // Ignore storage failures and fall back to showing the intro again.
  }
}

export function clearIntroAsSeen() {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    window.sessionStorage.removeItem(INTRO_SESSION_KEY);
  } catch {
    // Ignore storage failures and continue with the intro state in memory.
  }
}
