import { motion } from 'framer-motion';

import { Paragraph } from '@/ui/texts';

import { DESCRIPTION_TEXTS, HEADER_TEXT } from '../../constants/description';

const Description = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Paragraph
          size="4xl"
          weight="bold"
          className=" text-neutral sm:text-6xl"
        >
          {HEADER_TEXT}
        </Paragraph>
      </motion.div>
      <div className="flex flex-col gap-1 text-neutral">
        {DESCRIPTION_TEXTS.map((text, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + 0.2 * index }}
          >
            <Paragraph size={text.size} weight={text.weight}>
              {text.text}
            </Paragraph>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Description;
