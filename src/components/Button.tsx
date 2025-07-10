import type React from "react";

interface ButtonProps {
  id: string;
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ id, children, onClick }: ButtonProps) {
  return (
    <button type="button" id={id} className="cursor-pointer" onClick={onClick}>
      {children}
    </button>
  );
}
