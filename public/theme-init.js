(() => {
  const storageKey = 'cat-energy-theme';

  let preference = 'system';

  try {
    const stored = localStorage.getItem(storageKey);

    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      preference = stored;
    }
  } catch {
    // storage may be unavailable/blocked
  }

  let systemIsDark = false;

  try {
    systemIsDark = matchMedia('(prefers-color-scheme: dark)').matches;
  } catch {
    // use the light fallback
  }

  const resolvedTheme = preference === 'system' ? (systemIsDark ? 'dark' : 'light') : preference;

  document.documentElement.dataset.theme = resolvedTheme;
})();
