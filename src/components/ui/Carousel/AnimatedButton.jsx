const AnimatedButton = (props) => {
  return (
    <div>
      {props.active !== true ? (
        <button className="rounded-sm border-2 border-solid border-black bg-transparent px-4 py-1.5 font-bold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-lg hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none cursor-pointer">
          {props.name}
        </button>
      ) : (
        <button className="rounded-sm border-2 border-solid border-black bg-[#2d2824] px-4 py-1.5 font-bold uppercase text-white transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:rounded-lg  shadow-[4px_4px_0px_white] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none cursor-pointer">
          {props.name}
        </button>
      )}
    </div>
  );
};

export default AnimatedButton;
