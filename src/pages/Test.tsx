import { useCallback, useEffect, useState, useRef, useMemo, memo } from "react";

const Child = ({ value, children }) => {
  useEffect(() => {
    console.log("child effect");
  }, [value]);
  children = <h1 className="font-black">changed</h1>;
  return <div>{children}</div>;
};

const Test = () => {
  const [s, setS] = useState(0);

  const unmountRef = useRef(false);
  console.log("rerenders");

  const simpleFn = useMemo(() => {
    return null;
  }, []);

  const test10 = useCallback(() => {
    return;
  }, []);
  useEffect(() => {
    console.log("parent simpleFn effect");
  }, [simpleFn]);

  const main = () => {
    setS(s + 10);
  };
  const inc = useCallback(main, [s]);

  useEffect(() => {
    // if (unmountRef.current) return;
    console.log("useEffect body");
    return () => {
      console.log("clean function");
      unmountRef.current = true;
    };
  }, [s]);

  return (
    <div className="mt-32" onClick={main}>
      {s}
      ********************************1010
      <Child value={test10}>
        <div>child of child</div>
      </Child>
    </div>
  );
};
export default Test;
