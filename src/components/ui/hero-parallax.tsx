"use client";
import React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const secondRow = products.slice(5, 10);
  const thirdRow = products.slice(10, 15);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1000]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="h-[300vh] pt-20 pb-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`${product.title}-${idx}`}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row  mb-20 space-x-20 ">
          {secondRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={`${product.title}-${idx}`}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20">
          {thirdRow.map((product, idx) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={`${product.title}-${idx}`}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div className="max-w-5xl relative mx-auto py-10 md:py-16 px-4 w-full left-0 top-0 z-20 flex flex-col items-center justify-center text-center pointer-events-none">
      <div className="bg-[#fdfbf7]/70 backdrop-blur-xl p-8 md:p-14 rounded-3xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(74,63,53,0.1)] pointer-events-auto">
        <span className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white border border-[#d4a373]/30 text-[#4a3f35] text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase mb-8 shadow-sm font-accent">
          <span className="text-[#d4a373]">✨</span> Experience Authenticity
        </span>
        <h1 className="text-5xl md:text-8xl font-display font-bold text-[#4a3f35] leading-[1.1] tracking-tight drop-shadow-sm">
          A Symphony of <br/><span className="text-[#d4a373] italic">Indian Flavors</span>
        </h1>
        <p className="max-w-2xl mx-auto text-base md:text-xl mt-8 text-[#6b6255] leading-relaxed font-light tracking-wide">
          Elevating traditional street food into a fine culinary experience. 
          Freshly prepared, passionately served. Join thousands of our delighted regulars.
        </p>
      </div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    link: string;
    thumbnail: string;
  };
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      className="group/product h-96 w-[30rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-left-top absolute h-full w-full inset-0 rounded-2xl"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-90 bg-[#fdfbf7]/80 pointer-events-none rounded-2xl transition-opacity"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-[#4a3f35] font-display font-bold text-xl transition-opacity tracking-tight">
        {product.title}
      </h2>
    </motion.div>
  );
};
