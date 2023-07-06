import React from "react";
import { objectState, objectCountState } from "../../store/store";
import { useRecoilState } from "recoil";

const Upload = () => {
  const [objects, setObjects] = useRecoilState(objectState);
  const [objectCount, setObjectCount] = useRecoilState(objectCountState);
  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();
      if (!file) return;

      reader.readAsDataURL(file);

      reader.onload = () => {
        if (reader.result) {
          setObjects((prev: any) => [
            ...prev,
            {
              type: "image",
              id: `이미지 ${objectCount}`,
              url: reader.result,
              z: objectCount,
              opacity: 1,
            },
          ]);
          setObjectCount((prev) => prev + 1);
          e.target.value = "";
        }
      };
    }
  };
  return (
    <section className="flex justify-center px-4 py-16 border-t border-base-300">
      <input
        onChange={onUpload}
        type="file"
        className="shrink-0 file-input file-input-bordered file-input-primary w-full max-w-xs"
      />
    </section>
  );
};

export default Upload;
