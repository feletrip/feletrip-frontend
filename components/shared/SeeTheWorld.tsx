"use client"
import Image from "next/image";
import Link from "next/link";

const SeeTheWorld = () => {
  return (
    <div className="flex flex-col md:flex-row-reverse gap-10 mx-auto my-20">
      
      {/* Image Section */}
      <div className="flex-1">
        <Image
          src="https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg"
          alt="Travel destination"
          width={600}
          height={400}
          className="rounded-xl w-full h-auto object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="flex-1 text-start mt-10">
        <h2 className="text-4xl font-semibold mb-5 text-shadow-slate-800">
          SEE THE WORLD <br />
          DIFFERENTLY !
        </h2>

        <p>
          We create personalized trips based on your preferences, this means no two trips are the same. Our expertise in over 100 countries worldwide means we take on all the complexities and logistics of planning your trip, so you can simply enjoy.
        </p>

        <p className="mt-5">
          Whether you’re looking for culturally immersive experiences, relaxation, culinary delights, exclusive access or unique places to stay, we make it happen. While your local private guide takes it one step further by helping you authentically experience their country. Your next journey is calling.
        </p>

        <Link
          href="/contact-us"
          className="btn btn-primary mt-10 inline-block"
        >
          Start Planning With An Expert
        </Link>
      </div>

    </div>
  );
};

export default SeeTheWorld;