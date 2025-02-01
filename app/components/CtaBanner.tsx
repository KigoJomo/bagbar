import { MoveRight } from "lucide-react";
import Link from "next/link";

const CtaBanner = ({ text, link }: { text: string; link: string }) => (
  <Link href={link} className="bg-accent hover:opacity-95 p-6 text-center my-8 transition-all duration-300">
    <p className="text-background text-xl flex items-center justify-center gap-4">
      {text}
      <MoveRight />
    </p>
  </Link>
)

export default CtaBanner