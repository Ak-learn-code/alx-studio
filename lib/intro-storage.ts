const INTRO_SESSION_KEY = "alx-studio:intro-seen:v1";

function canUseSessionStorage() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return typeof window.sessionStorage !== "undefined";
  } catch (error) {
    logStorageError("Intro storage availability check failed", error);
    return false;
  }
}

function logStorageError(label: string, error: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[ALX] ${label}`, error);
  }
}

export function hasSeenIntro() {
  if (!canUseSessionStorage()) {
    return false;
  }

  try {
    return window.sessionStorage.getItem(INTRO_SESSION_KEY) === "seen";
  } catch (error) {
    logStorageError("Intro storage read failed", error);
    return false;
  }
}

export function markIntroAsSeen() {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    window.sessionStorage.setItem(INTRO_SESSION_KEY, "seen");
  } catch (error) {
    logStorageError("Intro storage write failed", error);
    // Ignore storage failures and fall back to showing the intro again.
  }
}

export function clearIntroAsSeen() {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    window.sessionStorage.removeItem(INTRO_SESSION_KEY);
  } catch (error) {
    logStorageError("Intro storage clear failed", error);
    // Ignore storage failures and continue with the intro state in memory.
  }
}
