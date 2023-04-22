import { useCallback, useEffect, useState } from "react";

const Test = () => {
  const [s, setS] = useState(0);

  console.log("rerenders");

  const main = () => {
    setS(s + 10);
  };
  const inc = useCallback(main, [s]);

  return (
    <div className="mt-32" onClick={main}>
      {s}
    </div>
  );
};
export default Test;
