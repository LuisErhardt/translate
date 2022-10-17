import * as React from "react";
import { FetchState, fetchTranslation } from "./fetch";
import Spinner from "./spinner";
import { debounce } from "lodash";
import { CopyToClipboard } from "./copyToClipboard";
import { ClearInput } from "./clearInput";
import { LanguageSelection } from "./languageSelection";

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
    //on mobile: fit height of textarea dynamically to content height
    if (window.matchMedia("(max-device-width: 760px)").matches) {
      const tx = document.getElementById("textInput");
      const txtP = document.getElementById("txtParent");
      if (tx && txtP) {
        tx.style.height = "auto";
        tx.style.height = tx.scrollHeight + "px";
        txtP.style.height = "auto";
        txtP.style.height = tx.scrollHeight + 5 + "px";
      }
    }

    this.setState({
      value: event.target.value,
    });
    this.debouncedSearch();
  }

  onKeyUp(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (window.matchMedia("(max-device-width: 760px)").matches && e.key === "Enter") {
      (e.target as any).blur();
    }
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
      <div className="flex flex-col items-center w-full pt-10  xl:max-w-[1200px] px-3 md:px-6 xl:px-0 ">
        <LanguageSelection
          sourceLang={this.state.sourceLang}
          targetLang={this.state.targetLang}
          handleSourceLangChange={(l: string) => {
            this.setState({ sourceLang: l });
            this.debouncedSearch();
          }}
          handleTargetLangChange={(l: string) => {
            this.setState({ targetLang: l });
            this.debouncedSearch();
          }}
          setLoadingError={this.props.setLoadingError}
        />
        <div className="flex flex-wrap sm:justify-between justify-center min-w-full relative">
          <div id="txtParent" className="relative sm:w-2/5 w-full">
            <textarea
              id="textInput"
              className="block p-2.5 pr-8 w-full h-auto sm:h-64 dark:rounded-md
            text-gray-900 dark:text-white bg-gray-50 dark:bg-slate-700 border-2 border-black dark:border-none
             outline-none outline-0 focus:border-gray-700
             dark:focus:ring-2 dark:focus:ring-blue-500 focus:outline-none appearance-none
             dark:focus:bg-transparent
            shadow-[5px_5px_0px_0px_rgb(0,219,195)] dark:shadow-none"
              placeholder={"Enter text to translate"}
              value={this.state.value}
              onChange={this.handleInputChange}
              onKeyUp={this.onKeyUp}
            />
            {this.state.value ? <ClearInput clearInput={this.clearInput} /> : <div />}
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
              <CopyToClipboard
                onClick={() => {
                  navigator.clipboard.writeText(this.state.fetchState.translatedText);
                }}
              />
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    );
  }
}
