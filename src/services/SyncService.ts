import { MainData } from "@/types/responses";
import axios from "axios";

export const SyncService = {
   mainData: async (rid?: number) =>
      axios.get<MainData>("/sync/maindata", { params: { rid } }),
};
