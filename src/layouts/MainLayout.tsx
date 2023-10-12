import { FC } from "react";
import { Outlet } from "react-router-dom";
import { TransferGraph } from "../components/TransferGraph";

export const MainLayout: FC = () => {
   return (
      <div className="flex">
         <div className="h-screen w-[40ch] bg-slate-700 p-5 shadow-inner shadow-md">
            <TransferGraph />
         </div>
         <div className="w-3/4 p-4">
            <Outlet />
         </div>
      </div>
   );
};
