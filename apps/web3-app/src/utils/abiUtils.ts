import Contracts from "@/config/contracts";
import { AbiEvent } from "viem";

type TABI =
  | (typeof Contracts.JTCoin)["abi"]
  | (typeof Contracts.BlogShop)["abi"];

export function getEventDefined(abi: TABI, eventEventName: string) {
  const event = abi.filter((e) => e.type === "event" && e.name === eventEventName);
  return event[0] as AbiEvent;
}
