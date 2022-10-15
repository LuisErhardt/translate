import * as React from "react";
import { FetchState, fetchTranslation } from "./fetch";
import LangSelect from "./langSelect";
import Spinner from "./spinner";
import { debounce } from "lodash";
import { LangSwitcher } from "./langSwitcher";
import { CopyToClipboard } from "./copyToClipboard";
import { ClearInput } from "./clearInput";

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
    console.log(event);

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

    let e: any = event.nativeEvent;

    // hide keyboard, if enter is pressed on mobile
    if (window.matchMedia("(max-device-width: 760px)").matches && e.inputType === "insertLineBreak") {
      event.target.blur();
    } else {
      this.setState({
        value: event.target.value,
      });
      this.debouncedSearch();
    }
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
      <div className="flex flex-col items-center w-full pt-10  xl:max-w-[1200px] px-3 md:px-6 xl:px-0 ">
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
                onMouseEnter={() => {
                  this.setState({ showTooltip: true });
                }}
                onMouseLeave={() => {
                  this.setState({ showTooltip: false });
                  setTimeout(() => this.setState({ showTooltip: true }), 50);
                }}
                onClick={() => {
                  navigator.clipboard.writeText(this.state.fetchState.translatedText);
                }}
                showTooltip={this.state.showTooltip}
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
