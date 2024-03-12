"use client";

import Link from "next/link";
import { useAccount, useEnsName } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

export default function WalletInfo() {
  const { address } = useAccount();

  const { data: ens } = useEnsName({
    address,
    chainId: 1,
  });

  const { data: allowStatus } = useScaffoldContractRead({
    contractName: "BatchRegistry",
    functionName: "allowList",
    args: [address],
  });

  const { data: checkedInAddress } = useScaffoldContractRead({
    contractName: "BatchRegistry",
    functionName: "yourContractAddress",
    args: [address],
  });

  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

  if (!address) return <span>Please connect your wallet to see feature more details.</span>;

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

  if (allowStatus && (checkedInAddress === ZERO_ADDRESS || checkedInAddress === undefined))
    return (
      <span>
        Hello {ens ?? "member"}, you haven&apos;t checked in yet. Please follow the{" "}
        <Link
          href="https://github.com/BuidlGuidl/batch3.buidlguidl.com/issues/9"
          target="_blank"
          className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300"
        >
          instructions
        </Link>
      </span>
    );

  if (allowStatus && checkedInAddress !== undefined && checkedInAddress !== ZERO_ADDRESS)
    return (
      <span>
        {" "}
        Hello, {ens ?? "member"}, You have checked in successfully. your{" "}
        <Link
          href="https://github.com/BuidlGuidl/batch3.buidlguidl.com/issues"
          target="_blank"
          className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300"
        >
          tasks
        </Link>{" "}
        are awaiting you.{" "}
      </span>
    );
}
