import LayerList from './layerList/LayerList';

const Layer = () => {
  return (
    <section className="xl:max-h-1/3 mockup-window h-[200px]  w-[360px] border  border-base-300 bg-white sm:w-[600px]  xl:h-1/3 ">
      <p className="absolute left-2/4 top-[14px]">레이어</p>

      <div className="h-full w-full overflow-y-auto pb-10 ">
        <LayerList />
      </div>
    </section>
  );
};

export default Layer;
