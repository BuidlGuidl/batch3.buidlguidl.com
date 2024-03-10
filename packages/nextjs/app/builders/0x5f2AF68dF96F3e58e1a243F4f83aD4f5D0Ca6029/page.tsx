import Image from "next/image";
import type { NextPage } from "next";

const AhmedBIO: NextPage = () => {
  return (
    <div className=" container mx-auto px-4 py-8">
      <div className="UserProfile">
        <h1 className="text-2xl font-bold text-center">Ahmed Borwin</h1>
        <Image src="/HourGlass.png" alt="Avatar" width={200} height={200} />
      </div>

      <div className="my-8">
        <h2 className="text-xl font-semibold">Bio</h2>
        <p className="text-base">
          Born in Libya, north Africa, raised in the united Kingdom Manchester. Graduated from Economics. Started
          learning how to code 18 months ago. Submitted a project to the constellation hackathon called Chainrunners
          which received a small prize. Also submitted zkCV to the recent circuit breaker hackathon. So much to learn. I
          struggle with typescripts which makes it hard to contribute to open source projects. The goal is to build
          meaningful user focused projects that will add value and or entertain. Long term goal is to study token
          engineering. I find the idea of creating an economy very exciting!!
        </p>
      </div>

      <div className="my-8">
        <h2 className="text-xl font-semibold">Socials</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <a
            href="https://github.com/AhmedBorwin"
            className="text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          <a
            href="https://linkedin.com/in/ahmedborwindev"
            className="text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkedin
          </a>
          <a
            href="https://t.me/lostdecades"
            className="text-blue-600 hover:text-blue-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram
          </a>
        </div>
      </div>
    </div>
  );
};

export default AhmedBIO;
