import { ReactNode } from "react";

export interface Props {
  children?: ReactNode;
}
export interface User {
  name: string
}
export interface userDetails {
  user: User;
}
