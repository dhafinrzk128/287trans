import { inputClassName } from "./FormField";

export default function Select({ error, className = "", children, ...props }) {
  return (
    <select className={`${inputClassName(Boolean(error))} bg-white ${className}`} {...props}>
      {children}
    </select>
  );
}
