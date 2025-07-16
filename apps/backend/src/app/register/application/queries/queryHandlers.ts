import { HorseTransferYearlyHandler } from "./horseTransferYearly/horseTransferYearly.handler";
import { GetTransfersQuery } from "./transfers.handler";

export const QueryHandlers = [
  GetTransfersQuery,
  HorseTransferYearlyHandler
];
