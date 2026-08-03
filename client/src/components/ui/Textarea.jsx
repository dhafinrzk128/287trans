import { inputClassName } from "./FormField";

export default function Textarea({ error, className = "", rows = 4, ...props }) {
  return <textarea rows={rows} className={`${inputClassName(Boolean(error))} resize-y ${className}`} {...props} />;
}
