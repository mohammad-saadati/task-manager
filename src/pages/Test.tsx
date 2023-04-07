import { FC, memo, useMemo, useState } from "react";

interface propTypes {
  title: string[];
}

const WrapperComponent = () => {
  const [title, setTitle] = useState(["sample test"]);
  const [flag, setFlag] = useState(false);

  const computed = useMemo(() => {
    return title;
  }, [title]);

  const handleClick = () => {
    setTitle((current) => {
      let temp = Array.from(current);
      temp = ["sample test"];
      return temp;
    });
  };
  return (
    <div>
      <button onClick={handleClick}>reassing string title</button>
      <Bache title={title}></Bache>
    </div>
  );
};

export default WrapperComponent;
