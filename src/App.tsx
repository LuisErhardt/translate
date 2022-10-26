import React, { useState, useEffect } from "react";
import "./App.css";
import Textfields from "./components/textfields";
import ConnectionError from "./components/connectionError";
import Footer from "./components/footer";
import { setDarkClasses, themeInit, switchTheme } from "./components/darkmode";
import { ThemeToggle } from "./components/themeToggle";

function App() {
  const [loadingError, setLoadingError] = useState(false);
  const [key, setKey] = useState(0);
  const [colorTheme, setColorTheme] = useState<"light" | "dark">(themeInit());

  useEffect(() => {
    setDarkClasses(colorTheme);
  }, [colorTheme]);

  return (
    <div
      className="bg-white dark:bg-slate-900 h-fit min-h-100 flex justify-center flex-wrap
                    text-lg relative"
    >
      <ThemeToggle onClick={() => setColorTheme(switchTheme(colorTheme))} isEnabled={colorTheme === "dark"} />
      {loadingError && <ConnectionError setLoadingError={setLoadingError} setKey={setKey} parentKey={key} />}
      <Textfields key={key} setLoadingError={setLoadingError} />
      <Footer />
    </div>
  );
}

export default App;
