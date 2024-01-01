import { motion } from 'framer-motion';

import { Paragraph } from '@/ui/texts';

import { DESCRIPTION_TITLE } from '../../constants/description';

const DescriptionTitle = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Paragraph size="3xl" weight="bold" className=" text-neutral sm:text-6xl">
        {DESCRIPTION_TITLE}
      </Paragraph>
    </motion.div>
  );
};

export default DescriptionTitle;
