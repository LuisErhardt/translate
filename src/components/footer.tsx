import * as React from "react";

interface IFooterProps {}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  return (
    <div className="px-5 sm:px-20 w-full">
      <div
        className="w-full py-2
   border-t border-slate-600 dark:border-slate-500 text-slate-600 dark:text-slate-400"
      >
        <p className="flex justify-center">
          Made by Luis Erhardt &nbsp;
          <a href="https://github.com/LuisErhardt/translate" className="" target="_blank" rel="noopener noreferrer">
            <img className="dark:hidden h-8" src={process.env.PUBLIC_URL + "/GitHub-Mark-64px.png"} alt="" />
            <img
              className="hidden dark:block h-8"
              src={process.env.PUBLIC_URL + "/GitHub-Mark-Light-64px.png"}
              alt=""
            />
          </a>
        </p>
        <p className="flex justify-center">
          Using&nbsp;
          <a href="https://github.com/LibreTranslate/LibreTranslate" className="underline">
            LibreTranslate API
          </a>
        </p>
        <p className="flex justify-center">
          Hosted by&nbsp;
          <a href="https://github.com/argosopentech/argos-translate/" className="underline">
            Argos Translate
          </a>
        </p>
        <p className="flex justify-center">Version: {`${process.env.REACT_APP_VERSION}`}</p>
      </div>
    </div>
  );
};

export default Footer;
