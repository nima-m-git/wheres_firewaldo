import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import choices from '../choices';

const animationProps = {
  initial: {
    opacity: 0,
    translateX: 100,
  },
  animate: {
    opacity: 1,
    translateX: 0,
  },
};

function Choice({ setChoice }) {
  return (
    <div className="choiceBtns">
      <AnimatePresence initial="false">
        {choices.map((choice, index) => (
          <motion.div
            key={choice.title}
            variants={animationProps}
            initial="initial"
            animate="animate"
            transition={{ duration: 2, delay: index, ease: 'easeOut' }}
          >
            <button type="submit" key={choice.title} onClick={() => setChoice(choice)}>
              {choice.title}
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export { Choice };
