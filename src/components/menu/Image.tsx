import React from 'react';
import useObjectControll from '../../hooks/useObjectControll';

const Image = () => {
  const { addImage } = useObjectControll();

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      if (!file) return;

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.result) {
          addImage({ url: reader.result as string });
          e.target.value = '';
        }
      };
    }
  };

  return (
    <section className="flex w-full grow items-center justify-center  border-t border-base-300 bg-white">
      <div className="flex w-full flex-col items-center gap-2">
        <p className="text-lg font-medium ">사진 레이어 추가</p>
        <input
          onChange={onUpload}
          type="file"
          accept="image/*"
          className="file-input-bordered file-input-primary file-input w-full max-w-xs shrink-0"
        />
      </div>
    </section>
  );
};

export default Image;
