import Link from "next/link";

interface ButtonProps {
  href?: string;
  variant?: "primary" | "outline";
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium leading-none";

  const variants = {
    primary: "bg-coral text-white",
    outline:
      "border border-foreground text-foreground bg-transparent",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
