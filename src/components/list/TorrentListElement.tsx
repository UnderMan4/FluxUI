import { ProgressBar } from "@/components/common";
import { Tag } from "@/components/common/Tag";
import { statusColors } from "@/components/list/statusColors";
import { Torrent } from "@/types/responses";
import { cls } from "@/utils/styles";
import { filesize } from "filesize";
import { FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";

export type TorrentListElementProps = {
   torrent: Torrent;
};

export const TorrentListElement: FC<TorrentListElementProps> = ({
   torrent,
}) => {
   console.log(torrent);
   const tags = useMemo(
      () =>
         torrent.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== "")
            .sort(
               (a, b) =>
                  a.toLowerCase().charCodeAt(0) - b.toLowerCase().charCodeAt(0)
            ),
      [torrent.tags]
   );
   return (
      <div
         className={twMerge(
            "relative isolate overflow-hidden rounded-xl bg-slate-200 transition-colors duration-200 hover:bg-slate-300"
         )}
      >
         <ProgressBar
            value={torrent.downloaded}
            max={torrent.size}
            className="absolute -z-10 h-full w-full"
            progressClassName={cls(
               statusColors[torrent.state].progressColor,
               "opacity-[0.25]"
            )}
         />
         <div className="p-2">
            <div className="flex flex-row gap-3">
               <h2 className="text-xl font-bold">{torrent.name}</h2>
               <div className={"relative isolate flex gap-2"}>
                  {tags.slice(0, 3).map((tag) => (
                     <Tag key={tag}>{tag}</Tag>
                  ))}
                  {tags.length > 3 && (
                     <span className="h-6 rounded-lg  px-2 text-sm">
                        +{tags.length - 3}
                     </span>
                  )}
               </div>
            </div>
            <div className="flex gap-4 text-sm text-slate-600">
               <span>
                  {filesize(torrent.downloaded, { base: 2 })} /{" "}
                  {filesize(torrent.size, { base: 2 })}
               </span>
               <span>{filesize(torrent.dlspeed, { base: 2 })}/s</span>
            </div>
         </div>
         <ProgressBar
            value={torrent.downloaded}
            max={torrent.size}
            className="h-1 w-full"
            progressClassName={cls(statusColors[torrent.state].progressColor)}
         />
      </div>
   );
};
