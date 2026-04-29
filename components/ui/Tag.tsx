interface TagProps {
  children: React.ReactNode;
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 text-xs font-medium border border-foreground/20 rounded-full text-foreground/70">
      {children}
    </span>
  );
}
