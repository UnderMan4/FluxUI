import { SyncService } from "@/services";
import { useDataStore } from "@/stores/dataStore";
import { useEffect, useRef } from "react";

export const usePeriodicUpdate = () => {
   const { isLoggedIn, updateData } = useDataStore();
   const rid = useRef<number>(0);
   const sendRequest = async () => {
      try {
         const { data } = await SyncService.mainData(rid.current);
         if (data.rid) rid.current = data.rid;
         updateData(data);
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
