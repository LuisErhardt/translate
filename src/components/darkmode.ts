function setDarkClasses(theme: "dark" | "light"): void {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

function themeInit() {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

function switchTheme(theme: "dark" | "light"): "dark" | "light" {
  return theme === "dark" ? "light" : "dark";
}

export { setDarkClasses, themeInit, switchTheme };
