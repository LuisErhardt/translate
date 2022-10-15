import * as React from "react";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <div className="absolute bottom-0 px-20 w-full">
      <div
        className="w-full h-16 flex justify-center items-center
   border-t border-slate-600 dark:border-slate-500 text-slate-600 dark:text-slate-400"
      >
        Made by Luis Erhardt
        <a href="https://github.com/LuisErhardt/translate" className="mx-5" target="_blank" rel="noopener noreferrer">
          <img className="dark:hidden h-8" src={process.env.PUBLIC_URL + "/GitHub-Mark-64px.png"} alt="" />
          <img className="hidden dark:block h-8" src={process.env.PUBLIC_URL + "/GitHub-Mark-Light-64px.png"} alt="" />
        </a>
        Using
        <a href="https://github.com/LibreTranslate/LibreTranslate">LibreTranslate API</a>
        Hosted by
        <a href="https://github.com/argosopentech/argos-translate/">Argos Translate</a>
      </div>
    </div>
  );
};

export default Footer;
