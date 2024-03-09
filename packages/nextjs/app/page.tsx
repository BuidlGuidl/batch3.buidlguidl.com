"use client";

import { useCallback } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount, useEnsName } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { isLoading, data: checkedInCounter } = useScaffoldContractRead({
    contractName: "BatchRegistry",
    functionName: "checkedInCounter",
  });

  function checkedInCounterElement() {
    if (!isLoading) {
      return checkedInCounter?.toString();
    } else {
      return <span className="loading loading-dots loading-xs"></span>;
    }
  }

  const { address } = useAccount();

  const { data: Ens } = useEnsName({
    address,
    chainId: 1,
  });

  const { data: allowStatus } = useScaffoldContractRead({
    contractName: "BatchRegistry",
    functionName: "allowList",
    args: [address],
  });

  const { data: checkedInStatus } = useScaffoldContractRead({
    contractName: "BatchRegistry",
    functionName: "yourContractAddress",
    args: [address],
  });
  const CheckStatus = useCallback(() => {
    if (!address) return <span>Please connect your wallet to see feature more details.</span>;

    const taskUrl = "https://github.com/BuidlGuidl/batch3.buidlguidl.com/issues";
    const issueUrl = taskUrl + "/9";

    if (!allowStatus)
      return (
        <span>
          Heard about our challenge take a look at{" "}
          <Link
            href="https://speedrunethereum.com"
            target="_blank"
            className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300"
          >
            speedrunethereum.
          </Link>
        </span>
      );

    if (allowStatus && !checkedInStatus)
      return (
        <span>
          Hello {Ens ?? "member"}, you haven&apos;t checked in yet. Please follow the{" "}
          <Link
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300"
          >
            instructions
          </Link>
        </span>
      );

    if (allowStatus && checkedInStatus)
      return (
        <span>
          {" "}
          Hello, {Ens ?? "member"}, You have checked in successfully. your{" "}
          <Link
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300"
          >
            tasks
          </Link>{" "}
          are awaiting you.{" "}
        </span>
      );
  }, [address, Ens, allowStatus, checkedInStatus]);

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center mb-8">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Batch 3</span>
          </h1>
          <p className="text-center text-lg">
            Get started by taking a look at your batch GitHub{" "}
            <Link href="https://github.com/BuidlGuidl/batch3.buidlguidl.com" style={{ color: "#6366f1" }}>
              repository.
            </Link>
          </p>
          <p className="text-lg flex gap-2 justify-center">
            <span className="font-bold">Checked in builders count:</span>
            <span>{checkedInCounterElement()}</span>
          </p>
          <p className="text-center text-lg">
            <CheckStatus />
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <BugAntIcon className="h-8 w-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contract
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <MagnifyingGlassIcon className="h-8 w-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
