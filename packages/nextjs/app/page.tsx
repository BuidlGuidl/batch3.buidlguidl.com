"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { WalletInfo } from "~~/components/WalletInfo";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldContractRead, useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

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
  //event history
  const { isLoading: isReadingEventLoading, data: eventHistory } = useScaffoldEventHistory({
    contractName: "BatchRegistry",
    eventName: "CheckedIn",
    fromBlock: 116978463n,
  });
  //creates a list of checked in builders addresses from the event history of the contract
  const buildersSet = new Set(eventHistory?.map(e => e.args.builder).filter(Boolean));
  const checkedInBuilders = Array.from(buildersSet);

  return (
    <section className="relative h-screen">
      <div className="absolute inset-0 z-0 bg-image "></div>

      <div className="relative z-10 bg-visibility-color flex flex-col justify-center items-center h-full text-white">
        <div className="px-5 ">
          <h1 className="text-center mb-8 text-3xl md:text-4xl lg:text-5xl">
            <span className="block mb-2">Welcome to</span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-bold">Batch 3</span>
          </h1>
          <p className="text-center text-lg md:text-xl lg:text-2xl mb-6">
            Get started by taking a look at your batch GitHub repository.
          </p>
          <p className="text-lg flex items-center justify-center mb-6">
            <span className="font-bold mr-2">Checked in builders count:</span>
            <span>{checkedInCounterElement()}</span>
          </p>
          <p className="text-center text-lg">
            <WalletInfo />
          </p>
        </div>
        <div className="flex flex-col text-center items-center text-md">
          <div>
            <span className="font-extrabold text-lg">List of Builders</span>
            {isReadingEventLoading || !eventHistory?.length ? (
              <span className="loading loading-dots loading-xs"></span>
            ) : (
              <table className="table-auto mt-4 bg-white text-gray-600">
                <thead className=" border-b-2">
                  <tr>
                    <th>Address</th>
                    <th>ENS</th>
                  </tr>
                </thead>
                <tbody>
                  {checkedInBuilders.map((builder, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        <div className="relative flex flex-col items-center group">
                          <Link href={`builders/${builder}`}>
                            {builder ? builder?.slice(0, 5) + "..." + builder?.slice(-4) : "Address not found"}
                          </Link>

                          <div className="absolute bottom-0 flex-col items-center hidden mb-6 group-hover:flex">
                            <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-md">
                              Click here to visit Builders Homepage
                            </span>
                            <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                          </div>
                        </div>
                      </td>
                      <td className="border p-2">
                        <span>
                          <Address address={builder} />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
