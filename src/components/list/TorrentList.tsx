import { TorrentListElement } from "@/components/list/TorrentListElement";
import { useDataStore } from "@/stores/dataStore";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type TorrentListProps = {
   className?: string;
};

export const TorrentList: FC<TorrentListProps> = ({ className }) => {
   const { torrents } = useDataStore();
   return (
      <div className={twMerge("width-full flex  flex-col gap-4", className)}>
         {torrents.map((torrent) => (
            <TorrentListElement torrent={torrent} key={torrent.infohash_v1} />
         ))}
      </div>
   );
};
