import { TorrentListElement } from "@/components/list";
import { useDataStore } from "@/stores/dataStore";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type TorrentListProps = {
   className?: string;
};

export const TorrentList: FC<TorrentListProps> = ({ className }) => {
   const { torrents } = useDataStore();

   return (
      <div className={twMerge("flex w-full flex-col gap-2", className)}>
         {torrents.map((torrent) => (
            <TorrentListElement torrent={torrent} key={torrent.infohash_v1} />
         ))}
      </div>
   );
};
