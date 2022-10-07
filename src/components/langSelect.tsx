import * as React from "react";
import { fetchLanguages } from "./fetch";

export interface ILangSelectProps {
  onChange: (lang: string) => void;
  selectedLang: string;
  setLoadingError: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ILangSelectState {
  languages: { code: string; name: string }[] | null;
}

export default class LangSelect extends React.Component<ILangSelectProps, ILangSelectState> {
  constructor(props: ILangSelectProps) {
    super(props);

    this.state = {
      languages: null,
    };
  }

  componentDidMount(): void {
    fetchLanguages()
      .then((res) => {
        this.setState({ languages: res });
      })
      .catch((error) => {
        console.log(error);
        this.props.setLoadingError(true);
      });
  }

  public render() {
    const options = (): JSX.Element[] => {
      if (this.state.languages) {
        const optionsArray: JSX.Element[] = [];
        this.state.languages.forEach((elem) => {
          optionsArray.push(
            <option key={elem.code} value={elem.code}>
              {elem.name}
            </option>
          );
        });
        return optionsArray;
      }
      return [];
    };

    return (
      <div className="w-2/5">
        <select
          className="font-semibold tracking-wider border-2 border-black dark:border-none 
          bg-teal-400 dark:bg-slate-700 text-black dark:text-white 
          hover:bg-teal-600 focus:ring-4 focus:outline-none focus:ring-white 
          dark:hover:bg-blue-500 dark:focus:ring-0
          my-3 px-4 py-2.5 w-full dark:rounded-md text-center inline-flex items-center"
          onChange={(ev: React.ChangeEvent<HTMLSelectElement>): void => this.props.onChange(ev.target.value)}
          value={this.props.selectedLang}
        >
          {options()}
        </select>
      </div>
    );
  }
}
