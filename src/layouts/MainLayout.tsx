import { FC } from "react";
import { Outlet } from "react-router-dom";
import { TransferGraph } from "../components/TransferGraph";

export const MainLayout: FC = () => {
   return (
      <div className="flex bg-slate-100">
         <div className="sticky top-0 h-screen w-[40ch]  overflow-auto bg-slate-700 p-5 shadow-md">
            <TransferGraph />
         </div>
         <div className="w-3/4 p-4">
            <Outlet />
         </div>
      </div>
   );
};
