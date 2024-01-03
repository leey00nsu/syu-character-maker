import React from 'react';

import useObjectControll from '@/features/canvas/hooks/useObjectControll';

import ImageInput from '@/ui/inputs/ImageInput';

import MenuContentContainer from '../containers/MenuContentContainer';

const AddImage = () => {
  const { addImage } = useObjectControll();

  // 이미지 리사이징
  const resizeImage = (
    url: string,
    maxWidth: number,
    maxHeight: number,
    callback: (resizedUrl: string) => void,
  ) => {
    const img = document.createElement('img');
    img.src = url;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        const resizedUrl = canvas.toDataURL('image', 0.3); // 이미지를 base64 형식으로 변환
        callback(resizedUrl);
      }
    };
  };

  const uploadHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      if (!file) return;

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.result) {
          resizeImage(
            reader.result.toString(),
            300,
            300,
            (resizedUrl: string) => {
              addImage({ url: resizedUrl });
              e.target.value = '';
            },
          );
        }
      };
    }
  };

  return (
    <MenuContentContainer>
      <MenuContentContainer.Column>
        <MenuContentContainer.Label>이미지 추가</MenuContentContainer.Label>
        <ImageInput uploadHandler={uploadHandler} />
      </MenuContentContainer.Column>
    </MenuContentContainer>
  );
};

export default AddImage;
