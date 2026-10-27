import Image from "next/image";
import Link from "next/link";

const HowItWorks = () => {
  return (
    <div>
      <div>
        {/* Heading Section */}
        <div>
          <h2 className="text-3xl font-semibold uppercase">
            What Will You Receive
          </h2>

          <ul className="flex justify-around pt-10">
            <li>
              <Link href="#" className="hover:text-accent">
                Personalized journeys
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-accent">
                Expert planning
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-accent">
                Private guides
              </Link>
            </li>
          </ul>
        </div>

        {/* Content Sections */}
        <div className="my-10 space-y-8">
          {/* Section 1 */}
          <div className="flex md:flex-row flex-col gap-8 justify-center mx-auto bg-base-200 rounded-3xl p-6">
            <div className="flex-1 relative w-full h-100">
              <Image
                src="https://media.istockphoto.com/id/2181891613/vector/speech-bubbles-forming-brain-communication-concept.jpg"
                alt="Conversation concept"
                fill
                className="rounded-lg object-cover"
              />
            </div>

            <div className="flex-1 mt-10 text-start space-y-6">
              <h1 className="text-primary font-semibold text-3xl">
                Every journey begins with a conversation.
              </h1>
              <p>
                We think care and curation make all the difference in the world.
                Understanding your travel vision is the first priority.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>No fixed dates or schedules</li>
                <li>The freedom of flexibility</li>
                <li>Tailor-made for you</li>
                <li>Accommodating your every need</li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="flex md:flex-row-reverse flex-col gap-8 justify-center mx-auto bg-base-200 rounded-3xl p-6">
            <div className="flex-1 relative w-full h-100">
              <Image
                src="https://cdn.pixabay.com/photo/2022/08/10/18/57/lake-7377942_640.jpg"
                alt="Lake view"
                fill
                className="rounded-lg object-cover"
              />
            </div>

            <div className="flex-1 mt-10 text-start space-y-6">
              <h1 className="text-accent font-semibold text-3xl">
                Itineraries designed by well-traveled experts.
              </h1>
              <p>
                Our Destination Experts have deep local knowledge, having lived,
                worked or traveled extensively throughout the region.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Deep local expertise</li>
                <li>The freedom of flexibility</li>
                <li>A single point of contact</li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="flex md:flex-row flex-col gap-8 justify-center mx-auto bg-base-200 rounded-3xl p-6">
            <div className="flex-1 relative w-full h-100">
              <Image
                src="https://png.pngtree.com/png-clipart/20220617/ourmid/pngtree-cool-travelling-van-tropical-png-image_5125592.png"
                alt="Travel van"
                fill
                className="rounded-lg object-cover"
              />
            </div>

            <div className="flex-1 mt-10 text-start space-y-6">
              <h1 className="text-accent font-semibold text-3xl">
                Your trip. Our responsibility.
              </h1>
              <p>
                With our industry-leading 24/7 support and operational expertise,
                you&apos;ll travel with peace of mind.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>The moment you touch down</li>
                <li>Live updates</li>
                <li>We&apos;re invested in your trip</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
