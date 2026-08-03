import { inputClassName } from "./FormField";

export default function Input({ error, className = "", ...props }) {
  return <input className={`${inputClassName(Boolean(error))} ${className}`} {...props} />;
}
