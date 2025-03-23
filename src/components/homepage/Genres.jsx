import AnimatedButton from "../ui/AnimatedButton";

const Genres = () => {
  return (
    <>
      <header className="mt-10 lg:mt-14 text-center space-y-1 px-4 bg-[#dbfce7] py-14">
        <h1 className="text-4xl font-bold">Genres</h1>
        <p className="text-xl font-normal">
          Browse Our Extensive Collection of Books Across Different Genres.
        </p>

        <div>
          <div className="flex flex-wrap justify-center gap-4 mt-5">
            <AnimatedButton name="Fiction" active={true} />
            <AnimatedButton name="Science" active={true} />
            <AnimatedButton name="Technology" active={true} />
            <AnimatedButton name="History" active={true} />
            <AnimatedButton name="Biography" active={true} />
            <AnimatedButton name="Romantic" active={true} />
            <AnimatedButton name="Business" active={true} />
            <AnimatedButton name="Children" active={true} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Genres;
