import { useCallback, useEffect, useState, useRef, useMemo } from "react";

const Test = () => {
  const [s, setS] = useState(0);

  const unmountRef = useRef(false);
  console.log("rerenders");

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
    </div>
  );
};
export default Test;
