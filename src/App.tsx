import React, { useState } from "react";
import "./App.css";
import Textfields from "./components/textfields";
import ConnectionError from "./components/connectionError";

function App() {
  const [loadingError, setLoadingError] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <div
      className="bg-white dark:bg-slate-900 min-h-screen flex flex-col items-center
                    text-lg"
    >
      {loadingError && <ConnectionError setLoadingError={setLoadingError} setKey={setKey} parentKey={key} />}
      <Textfields key={key} setLoadingError={setLoadingError} />
    </div>
  );
}

export default App;
