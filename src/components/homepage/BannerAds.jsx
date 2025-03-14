import AnimatedButton from "../ui/AnimatedButton";

const BannerAds = () => {
  return (
    <header className="h-96 mt-11 bg-[url(/bg/bookbg1.webp)] bg-center bg-no-repeat bg-cover bg-origin-content">
      <div className="flex flex-col justify-center items-center lg:items-end p-6 pt-24 lg:pr-36">
        <div className="text-center lg:text-right">
          <h1 className="text-4xl font-extrabold pb-2 uppercase">
            Want Books In Bundle
          </h1>
          <p className="text-xl">
            Feel free to send us message on our socials channel
          </p>
        </div>
      </div>
      <div className="text-center flex items-center justify-center lg:justify-end lg:pr-64 gap-4 mt-8">
        <a href="#">
          <AnimatedButton name="WhatsApp" active={true} />
        </a>
        <a href="#">
          <AnimatedButton name="Instagram" active={true} />
        </a>
      </div>
      <br />
    </header>
  );
};

export default BannerAds;
