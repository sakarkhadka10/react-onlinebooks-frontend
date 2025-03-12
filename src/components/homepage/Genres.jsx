import AnimatedButton from "../ui/Carousel/AnimatedButton";

const Genres = () => {
  return (
    <>
      <header className="mt-10 lg:mt-14  text-center space-y-1">
        <h1 className="text-4xl font-bold">Genres</h1>
        <p className="text-xl font-normal">
          Browse Our Extensive Collection of Books Across Different Genres.
        </p>

        <div>
          <div className="flex flex-wrap justify-center gap-4 mt-5">
            <AnimatedButton name="Action" active={true} />
            <AnimatedButton name="Adventure" active={true} />
            <AnimatedButton name="Comedy" active={true} />
            <AnimatedButton name="Fantasy" active={true} />
            <AnimatedButton name="Horror" active={true} />
            <AnimatedButton name="Mystery" active={true} />
            <AnimatedButton name="Romance" active={true} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Genres;
