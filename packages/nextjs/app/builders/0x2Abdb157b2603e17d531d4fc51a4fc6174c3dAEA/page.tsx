"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { blo } from "blo";
import type { NextPage } from "next";
import { useEnsAvatar, useEnsName } from "wagmi";

/*
 Based on:
 https://github.com/BuidlGuidl/batch2.buidlguidl.com/blob/main/packages/nextjs/app/builders/0x78b0DCCE8F4367e2Fd514bF428aDfaFBCB15101C/page.tsx
 */

const VitorPyPersonal: NextPage = () => {
  const address = "0x2Abdb157b2603e17d531d4fc51a4fc6174c3dAEA";
  const avatarSize = 200;
  const [ensAvatar, setEnsAvatar] = useState<string | null>();

  const { data: fetchedEns } = useEnsName({ address, chainId: 1 });
  const { data: fetchedEnsAvatar } = useEnsAvatar({
    name: fetchedEns,
    enabled: Boolean(fetchedEns),
    chainId: 1,
    cacheTime: 30_000,
  });

  useEffect(() => {
    setEnsAvatar(fetchedEnsAvatar);
  }, [fetchedEnsAvatar]);

  return (
    <>
      <div className="flex text-center bg-base-300 p-10 w-full">
        <div className="flex-initial w-1/3 gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="rounded-full mx-auto"
            src={ensAvatar || blo(address as `0x${string}`)}
            width={avatarSize}
            height={avatarSize}
            alt={`${address} avatar`}
          />
        </div>
        <div className="flex-auto gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
          <h1 className="text-4xl font-bold">vitorpy.eth</h1>
          <p className="text-lg">Hi, I&apos;m vitorpy.eth</p>
          <p className="text-lg">
            Telegram:&nbsp;
            <Link className="text-lg text-accent" href="https://t.me/vitorpyb" passHref>
              @vitorpyb
            </Link>
          </p>
          <p className="text-lg">
            Twitter:&nbsp;
            <Link className="text-lg text-accent" href="https://twitter.com/PyVitor" passHref>
              @PyVitor
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default VitorPyPersonal;
