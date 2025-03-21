import Link from 'next/link';
import { motion } from 'framer-motion';

export const slide = {
    initial: { x: 80 },
    enter: (i: number) => ({
      x: 0,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
    }),
    exit: (i: number) => ({
      x: 80,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
    }),
  };
  
  export const scale = {
    open: { scale: 1, transition: { duration: 0.3 } },
    closed: { scale: 0, transition: { duration: 0.4 } },
  };
  
interface LinkData {
  title: string;
  href: string;
  index: number;
}

interface LinkProps {
  data: LinkData;
  isActive: boolean;
  setSelectedIndicator: (href: string) => void;
  onClick?: () => void;
}

export default function NavLink({ data, isActive, setSelectedIndicator, onClick }: LinkProps) {
  const { title, href, index } = data;

  return (
    <motion.div
      className="relative flex items-center"
      onMouseEnter={() => setSelectedIndicator(href)}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
      onClick={onClick}
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className="w-[10px] h-[10px] bg-white rounded-full absolute -left-[30px]"
      />
      {["About", "Contact"].includes(title) ? (
        <span className="cursor-pointer">{title}</span>
      ) : (
        <Link href={href} onClick={(e) => e.preventDefault()}>
          {title}
        </Link>
      )}
    </motion.div>
  );
}