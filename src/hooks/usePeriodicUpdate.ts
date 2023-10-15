import { SyncService } from "@/services";
import { useDataStore } from "@/stores/dataStore";
import { useEffect } from "react";

export const usePeriodicUpdate = () => {
   const { isLoggedIn } = useDataStore();
   const sendRequest = async () => {
      try {
         const response = await SyncService.mainData();
         console.log(response);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      if (!isLoggedIn) return;
      const interval = setInterval(sendRequest, 1000);
      return () => clearInterval(interval);
   }, [isLoggedIn]);
};
