import { TorrentListElement } from "@/components/list";
import { isLoadingSignal, torrentsSignal } from "@/signals/appData";
import { Icon } from "@iconify/react";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

export type TorrentListProps = {
   className?: string;
};

export const TorrentList: FC<TorrentListProps> = ({ className }) => {
   return isLoadingSignal.value ? (
      <div className="flex h-40 w-full items-center justify-center">
         <Icon
            icon="svg-spinners:blocks-shuffle-3"
            height={30}
            className="text-slate-700"
         />
      </div>
   ) : (
      <div className={twMerge("flex w-full flex-col gap-2", className)}>
         {torrentsSignal.value.map((torrent) => (
            <TorrentListElement torrent={torrent} key={torrent.infohash_v1} />
         ))}
      </div>
   );
};
