import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

interface IConnectionErrorProps {
  setLoadingError: (b: boolean) => void;
  setKey: (num: number) => void;
  parentKey: number;
}

const ConnectionError: React.FunctionComponent<IConnectionErrorProps> = (props) => {
  const nodeRef = useRef(null);
  return (
    <CSSTransition nodeRef={nodeRef} in={true} timeout={300} classNames="errorWindow" appear={true}>
      <div
        ref={nodeRef}
        className="absolute z-50 text-white bg-red-500 
    dark:rounded-md mt-10 xl:max-w-[800px] mx-5 md:mx-0 p-5 text-2xl
    shadow-[0_0_0_max(100vh,100vw)_rgba(0,0,0,.5)]"
      >
        <h3 className="font-bold">No Connection</h3>
        <p>Unfortunately, the app can't connect to the server. </p>
        <p>
          <button
            className="font-semibold dark:rounded-lg bg-white text-red-500 p-2 mt-2 hover:bg-red-500
            hover:text-white border-white border-2"
            onClick={() => {
              props.setLoadingError(false);
              props.setKey(props.parentKey === 0 ? 1 : 0);
            }}
          >
            Try again
          </button>
        </p>
      </div>
    </CSSTransition>
  );
};

export default ConnectionError;
