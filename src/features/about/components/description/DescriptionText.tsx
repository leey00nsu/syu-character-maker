import { motion } from 'framer-motion';

import { Paragraph } from '@/ui/texts';

import { DESCRIPTION_TEXTS } from '../../constants/description';

const DescriptionText = () => {
  return (
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
  );
};

export default DescriptionText;
