import AnimatedButton from "../ui/Carousel/AnimatedButton";

const BannerAds = () => {
  return (
    <header className=" h-96 mt-11 bg-[url(https://i.pinimg.com/736x/36/3a/05/363a05ba5c7700b20b29898fd7c5a0f1.jpg)] bg-center bg-no-repeat bg-cover bg-origin-content">
      <div className="flex flex-col justify-center items-center p-6 pt-24 text-center md:text-start">
        <h1 className="text-3xl font-extrabold pb-2 uppercase">
          Want Books In Bundel
        </h1>
        <p className="text-xl">
          Feel free to send us mssage on our socials channel
        </p>
      </div>
      <div className="text-center flex items-center justify-center gap-4 mt-8">
        <a href="#">
          <AnimatedButton name="WhatsApp" active={true} />
        </a>
        <a href="#">
          <AnimatedButton name="WhatsApp" active={true} />
        </a>
      </div>
      <br />
    </header>
  );
};

export default BannerAds;
