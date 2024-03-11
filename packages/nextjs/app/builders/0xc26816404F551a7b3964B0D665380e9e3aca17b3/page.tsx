"use client";

import Image from "next/image";
import Link from "next/link";
import { blo } from "blo";
import { useEnsAvatar, useEnsName } from "wagmi";
import { GithubIcon, LinkedInIcon, MailIcon, MapMarkerIcon, XIcon } from "~~/components/SocialIcons";

export default function BatchPage() {
  const address = "0xc26816404F551a7b3964B0D665380e9e3aca17b3";
  const { data: Ens } = useEnsName({
    address,
    chainId: 1,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: Ens,
    enabled: Boolean(Ens),
    chainId: 1,
    cacheTime: 30_000,
  });

  const avatarSrc = Boolean(ensAvatar) && typeof ensAvatar == "string" ? ensAvatar : blo(address as `0x${string}`);

  //Personal Details
  const name = "Muhammed Shahinsha P";
  const bio =
    "I am a self-taught developer who transitioned from a college dropout. Moving from traditional Web2 development to the decentralized world of Web3, I am completely Fueled by curiosity and a hunger for innovation and networking with like-minded individuals, and staying ahead of the curve in this rapidly evolving field.";
  const currentAddress = "I live in Malappuram, Kerala INDIA";

  // Link URLS
  const gitHubUrl = "https://github.com/muhammedshahinshapottayil";
  const mailUrl = "mailto:muhammedshahinshapottayil@gmail.com";
  const linkedinUrl = "https://www.linkedin.com/in/muhammed-shahinsha-pottayil-2103b12a4/?trk=public-profile-join-page";
  const XUrl = "https://twitter.com/MuhamShahinshaP";
  return (
    <main>
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto text-center">
        <Image
          width={100}
          height={100}
          src={avatarSrc}
          alt="Avatar"
          className="rounded-full w-48 h-48 object-cover mb-4 mx-auto"
        />
        <h1 className="text-2xl font-bold mb-2">{name}</h1>
        <p className="text-gray-600 mb-4">{bio}</p>
        <div className=" mb-4 flex justify-center space-x-4">
          <span className="mt-3">
            <MapMarkerIcon />
          </span>
          <p className="text-gray-500">{currentAddress}</p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link title="GitHub" href={gitHubUrl} target="_blank" rel="noopener noreferrer">
            <GithubIcon />
          </Link>
          <Link
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            style={{ backgroundColor: "#0A66C2", borderRadius: "100%", color: "white", fill: "white" }}
          >
            <LinkedInIcon />
          </Link>
          <Link title="X" href={XUrl} target="_blank" rel="noopener noreferrer">
            <XIcon />
          </Link>
          <Link title="Mail" href={mailUrl} target="_blank" rel="noopener noreferrer">
            <MailIcon />
          </Link>
        </div>
      </div>
    </main>
  );
}
