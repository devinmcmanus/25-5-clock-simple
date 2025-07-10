import type React from "react";

interface SectionLabelProps {
  id: string;
  children: React.ReactNode;
}

export default function SectionLabel({ id, children }: SectionLabelProps) {
  return (
    <h2 id={id} className="text-2xl font-bold">
      {children}
    </h2>
  );
}
