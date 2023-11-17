import { FC } from "react";
import { Outlet } from "react-router-dom";
import { TransferGraph } from "../components/TransferGraph";

export const MainLayout: FC = () => {
   return (
      <div className="flex bg-slate-100">
         <div className="sticky top-0 h-screen w-[40ch]  shrink-0 overflow-auto bg-slate-700 p-5 shadow-md">
            <TransferGraph />
         </div>
         <div className="w-full p-4">
            <Outlet />
         </div>
      </div>
   );
};
