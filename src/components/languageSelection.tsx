import * as React from "react";
import LangSelect from "./langSelect";
import LangSwitcher from "./langSwitcher";

export interface ILanguageSelectionProps {
  sourceLang: string;
  targetLang: string;
  handleSourceLangChange: (lang: string) => void;
  handleTargetLangChange: (lang: string) => void;
  setLoadingError: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LanguageSelection(props: ILanguageSelectionProps) {
  return (
    <div className="flex justify-between items-center min-w-full max-h-16">
      <LangSelect
        onChange={props.handleSourceLangChange}
        selectedLang={props.sourceLang}
        setLoadingError={props.setLoadingError}
      />
      <LangSwitcher
        onClick={() => {
          props.handleSourceLangChange(props.targetLang);
          props.handleTargetLangChange(props.sourceLang);
        }}
      />
      <LangSelect
        onChange={props.handleTargetLangChange}
        selectedLang={props.targetLang}
        setLoadingError={props.setLoadingError}
      />
    </div>
  );
}
