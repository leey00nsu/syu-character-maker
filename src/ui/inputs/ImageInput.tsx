interface ImageInputProps {
  uploadHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ImageInput = ({ uploadHandler }: ImageInputProps) => {
  return (
    <input
      onChange={uploadHandler}
      type="file"
      accept="image/*"
      className="file-input-bordered file-input-primary file-input max-w-xs"
    />
  );
};

export default ImageInput;
