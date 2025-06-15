'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InspirationPopup() {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(true);
    setTimeout(() => setShow(false), 6000);
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-base">
        No inspiration?{" "}
        <button
          onClick={handleClick}
          className="underline text-[#E30713] hover:text-primary/80 transition-colors focus:outline-none"
          style={{ textDecorationThickness: "2px" }}
        >
          Click here
        </button>
      </span>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="mt-4"
          >
            <div role="alert" className="alert alert-info shadow-lg bg-[#070707E6] border-[#E30713] text-[white]">
              <span>Challennge van deze week!<br/><br/>Genereer een afbeelding met AI van jouw droom zwembad.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
