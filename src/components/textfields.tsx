import * as React from "react";
import { FetchState, fetchTranslation } from "./fetch";
import LangSelect from "./langSelect";
import Spinner from "./spinner";
import { debounce } from "lodash";
import { LangSwitcher } from "./langSwitcher";
import ReactTooltip from "react-tooltip";

export interface ITextfieldsProps {
  setLoadingError: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ITextfieldsState {
  value: string;
  fetchState: FetchState;
  sourceLang: string;
  targetLang: string;
  showTooltip: boolean;
}

export default class Textfields extends React.Component<ITextfieldsProps, ITextfieldsState> {
  constructor(props: ITextfieldsProps) {
    super(props);

    this.state = {
      value: "",
      fetchState: {
        translatedText: "",
        isLoaded: true,
        error: null,
      },
      sourceLang: "de",
      targetLang: "en",
      showTooltip: true,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSourceLangChange = this.handleSourceLangChange.bind(this);
    this.handleTargetLangChange = this.handleTargetLangChange.bind(this);
    this.handleLanguageSwitch = this.handleLanguageSwitch.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  // delays api call until user stops typing for 300ms
  debouncedSearch = debounce(() => {
    this.setState({
      fetchState: {
        translatedText: this.state.fetchState.translatedText,
        isLoaded: false,
        error: this.state.fetchState.error,
      },
    });
    fetchTranslation(this.state.value, this.state.sourceLang, this.state.targetLang).then((res) => {
      this.setState({ fetchState: res });
    });
  }, 300);

  handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    let value: string = event.target.value;
    this.setState({
      value: value,
    });
    this.debouncedSearch();
  }

  handleSourceLangChange(lang: string) {
    let newLang: string = lang;
    this.setState({
      sourceLang: newLang,
    });
  }

  handleTargetLangChange(lang: string) {
    let newLang: string = lang;
    this.setState({
      targetLang: newLang,
    });
  }

  handleLanguageSwitch() {
    this.setState({
      sourceLang: this.state.targetLang,
      targetLang: this.state.sourceLang,
    });
    this.debouncedSearch();
  }

  clearInput() {
    this.setState({
      value: "",
      fetchState: {
        translatedText: "",
        isLoaded: true,
        error: null,
      },
    });
    let textfield = document.getElementById("textInput");
    if (textfield) {
      textfield.focus();
    }
  }

  public render() {
    const textOutput = (): string => {
      const { translatedText, isLoaded, error } = this.state.fetchState;
      if (error) {
        return "Error";
      }
      return translatedText;
    };
    return (
      <div className="flex flex-col items-center w-full mt-10  xl:max-w-[1200px] px-3 md:px-6 xl:px-0 h-screen">
        <div className="flex justify-between items-center min-w-full max-h-16">
          <LangSelect
            onChange={this.handleSourceLangChange}
            selectedLang={this.state.sourceLang}
            setLoadingError={this.props.setLoadingError}
          />
          <LangSwitcher onClick={this.handleLanguageSwitch} />
          <LangSelect
            onChange={this.handleTargetLangChange}
            selectedLang={this.state.targetLang}
            setLoadingError={this.props.setLoadingError}
          />
        </div>
        <div className="flex flex-wrap sm:justify-between justify-center min-w-full relative">
          <div className="relative sm:w-2/5 w-full">
            <textarea
              id="textInput"
              className="block p-2.5 pr-8 w-full h-64 dark:rounded-md
            text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 border-2 border-black dark:border-none
             outline-none outline-0 focus:border-gray-700
             dark:focus:ring-2 dark:focus:ring-blue-500 focus:outline-none appearance-none
             dark:focus:bg-transparent
            shadow-[5px_5px_0px_0px_rgb(0,219,195)] dark:shadow-none"
              placeholder={"Enter text to translate"}
              value={this.state.value}
              onChange={this.handleInputChange}
            />
            {this.state.value ? (
              <button onClick={this.clearInput}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 absolute top-2.5 right-2.5 text-black dark:text-white"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            ) : (
              <div />
            )}
          </div>
          <div className="flex justify-center items-center sm:w-auto w-3/4 sm:my-0 my-3">
            {!this.state.fetchState.isLoaded ? <Spinner /> : <div className="w-20 h-8" />}
          </div>
          <div className="relative sm:w-2/5 w-full">
            <textarea
              className="block p-2.5 pr-8 w-full h-64 dark:rounded-md
            text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 border-2 border-black  outline-none outline-0
             shadow-[5px_5px_0px_0px_rgb(0,219,195)] dark:shadow-none dark:border-none"
              placeholder={"Translation"}
              value={textOutput()}
              readOnly={true}
            />
            {this.state.fetchState.translatedText ? (
              <div
                className="text-black dark:text-slate-400 hover:text-black dark:hover:text-white
              absolute top-2.5 right-2.5 "
                data-tip
                data-for="tooltip"
                onMouseEnter={() => {
                  this.setState({ showTooltip: true });
                }}
                onMouseLeave={() => {
                  this.setState({ showTooltip: false });
                  setTimeout(() => this.setState({ showTooltip: true }), 50);
                }}
              >
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(this.state.fetchState.translatedText);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                    />
                  </svg>
                </button>
                {this.state.showTooltip && (
                  <ReactTooltip id="tooltip" place="top" effect="solid">
                    Copy to clipboard
                  </ReactTooltip>
                )}
              </div>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}
