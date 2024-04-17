import { ReactNode } from "react";

type TypographyProps = React.ComponentProps<"h1">;

export const H1 = (props: TypographyProps) => {
  return (
    <h1 {...props} className="font-bold text-4xl">
      {props.children}
    </h1>
  );
};
