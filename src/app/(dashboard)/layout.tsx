"use client";

interface Props {
  children: React.ReactNode;
}

const layout = ({ children }: Props) => {
  return <main className="min-h-screen w-screen">{children}</main>;
};
export default layout;
