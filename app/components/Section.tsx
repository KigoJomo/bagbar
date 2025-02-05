import { FC } from "react";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Section: FC<SectionProps> = ({ title, children, className, style }) => (
  <article className={`border-b border-foreground-faded pb-6 px-2 md:px-24 ${className}`} style={style}>
    <h2 className="text-2xl font-semibold mb-4">{title}</h2>
    {children}
  </article>
)

export default Section