import { ProgressBar } from "@/components/common";
import { DownloadInfo } from "@/components/list";
import { mappings } from "@/components/list/TorrentListElement/stateMappings";
import { Torrent } from "@/types/responses";
import { cls } from "@/utils/styles";
import { Icon } from "@iconify/react/dist/iconify.js";
import { FC, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TagList } from "../TagList";
import { useContextMenu } from "@/hooks";

export type TorrentListElementProps = {
   torrent: Torrent;
};

export const TorrentListElement: FC<TorrentListElementProps> = ({
   torrent,
}) => {
   const { t } = useTranslation();

   const mainRef = useRef<HTMLDivElement>(null);
   const buttonRef = useRef<HTMLButtonElement>(null);

   useContextMenu(
      mainRef,
      [
         {
            label: "Pause",
            onClick: () => {},
            icon: "ph:pause-bold",
         },
         {
            label: "Resume",
            onClick: () => {},
            icon: "ph:play-bold",
         },
         {
            label: "Delete",
            onClick: () => {},
            icon: "ph:trash-bold",
         },
         "separator",
         {
            label: "Force Download",
            onClick: () => {},
         },
         {
            label: "Force Upload",
            onClick: () => {},
         },
      ],
      false
   );

   useContextMenu(buttonRef, [
      {
         label: "Pause",
         onClick: () => {},
      },
      {
         label: "Resume",
         onClick: () => {},
      },
   ]);

   const percent = useMemo(() => {
      const percent = (torrent.downloaded / torrent.size) * 100;
      if (isNaN(percent)) return 0;
      if (percent >= 100) return 100;
      return parseFloat(percent.toFixed(2)).toString();
   }, [torrent.downloaded, torrent.size]);

   const stateMapping = mappings[torrent.state];

   const isForced =
      torrent.state === "forcedDL" || torrent.state === "forcedUP";

   return (
      <div className="group flex max-w-6xl grow gap-1 overflow-hidden rounded-2xl">
         <div
            ref={mainRef}
            className={cls(
               "flex flex-grow flex-col gap-1 px-3 py-2",
               " bg-slate-200 group-hover:bg-slate-300"
            )}
         >
            <div className="flex items-center gap-1">
               {isForced && (
                  <span className="flex aspect-square h-6 items-center justify-center rounded-3xl border-[3px] border-red-500 font-bold text-red-500">
                     F
                  </span>
               )}
               <h2 className="max-w-full text-ellipsis whitespace-nowrap text-lg font-bold">
                  {torrent.name}
               </h2>
            </div>
            <TagList torrent={torrent} />
            <div className="flex justify-between">
               <DownloadInfo torrent={torrent} />
               <span className="text-sm">
                  {stateMapping.statusText === "[percent]"
                     ? `${percent}%`
                     : t(stateMapping.statusText)}
               </span>
            </div>
            <ProgressBar
               value={torrent.downloaded}
               max={torrent.size}
               className="h-1 w-full rounded-lg bg-slate-300 group-hover:bg-slate-400 group-hover:bg-opacity-50"
               progressClassName={cls(stateMapping.progressColor)}
            />
         </div>
         <button
            ref={buttonRef}
            disabled={stateMapping.stateButton.disabled}
            className="flex w-28 shrink-0 flex-col items-center justify-center  bg-slate-200 group-hover:bg-slate-300"
         >
            <Icon
               icon={stateMapping.stateButton.icon}
               className={cls(stateMapping.stateButton.iconColor)}
               height={30}
            />
         </button>
      </div>
   );
};
