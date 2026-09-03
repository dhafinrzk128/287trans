import useReveal from "../hooks/useReveal";

export default function Reveal({ as: Tag = "div", children, className = "", delay = 0, langsung = false, ...props }) {
  const [ref, visible] = useReveal({ langsung });

  return (
    <Tag
      ref={ref}
      className={`reveal${visible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  );
}
