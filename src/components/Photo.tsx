import React from "react";
import { uploadState } from "../store/store";
import { useRecoilState } from "recoil";

const Photo = () => {
  const [upload, setUpload] = useRecoilState(uploadState);
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      if (!file) return;

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.result) {
          setUpload(reader.result); // 파일의 컨텐츠
        }
      };
    }
  };
  return (
    <>
      <input
        onChange={onUpload}
        type="file"
        className="shrink-0 file-input file-input-bordered file-input-primary w-full max-w-xs"
      />
    </>
  );
};

export default Photo;
