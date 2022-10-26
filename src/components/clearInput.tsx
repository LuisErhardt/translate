import * as React from "react";

export interface IClearInputProps {
  clearInput: () => void;
}

export function ClearInput(props: IClearInputProps) {
  return (
    <button className="w-6 absolute top-2.5 right-2.5 text-black dark:text-white" onClick={props.clearInput}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}
