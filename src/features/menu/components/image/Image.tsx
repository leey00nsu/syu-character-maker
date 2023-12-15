import React from 'react';

import useObjectControll from '@/hooks/useObjectControll';

import ImageInput from '@/ui/inputs/ImageInput';

import MenuContentContainer from '../containers/MenuContentContainer';

const Image = () => {
  const { addImage } = useObjectControll();

  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      if (!file) return;

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.result) {
          addImage({ url: reader.result.toString() });
          e.target.value = '';
        }
      };
    }
  };

  return (
    <MenuContentContainer>
      <MenuContentContainer.Column>
        <MenuContentContainer.Header>이미지 추가</MenuContentContainer.Header>
        <ImageInput uploadHandler={uploadHandler} />
      </MenuContentContainer.Column>
    </MenuContentContainer>
  );
};

export default Image;
