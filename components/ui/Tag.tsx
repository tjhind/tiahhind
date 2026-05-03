interface TagProps {
  children: React.ReactNode;
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center px-3 py-1 text-xs bg-darkGrey/30 font-medium rounded-lg text-foreground/70">
      {children}
    </span>
  );
}
