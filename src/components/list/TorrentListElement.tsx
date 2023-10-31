import { Torrent } from "@/types/responses";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type TorrentListElementProps = {
   torrent: Torrent;
};

export const TorrentListElement: FC<TorrentListElementProps> = ({
   torrent,
}) => {
   return (
      <div className={twMerge("")}>
         <h2 className="font-bold">{torrent.name}</h2>
      </div>
   );
};
