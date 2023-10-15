import axios from "axios";

export const SyncService = {
   mainData: async () => axios.get("/sync/maindata"),
};
