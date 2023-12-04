interface SaveProps {
  stageRef: any;
}

const Save = (props: SaveProps) => {
  // 현재 Stage를 이미지 파일로 저장하기
  const changeSaveHandler = () => {
    const dataURL = props.stageRef.current.toDataURL({ pixelRatio: 3 });
    var link = document.createElement('a');
    link.download = 'save';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="flex w-full grow items-center justify-center  border-t border-base-300 bg-white">
      <button onClick={changeSaveHandler} className="btn-primary btn-wide btn">
        이미지 파일로 저장하기
      </button>
    </section>
  );
};

export default Save;
