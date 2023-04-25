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
