type Attributes = {
  // define your attributes types here, e.g.
  className?: string;
};
type Element = {
  type?: "block-quote" | string;
  align?: string;
};
type ElementProps = {
  attributes: Attributes;
  children: React.ReactNode;
  element: Element;
};

const Element = ({ attributes, children, element }: ElementProps) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case "block-quote":
      return (
        <blockquote style={style} {...attributes}>
          {children}
        </blockquote>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

export default Element;
