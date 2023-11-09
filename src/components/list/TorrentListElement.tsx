import { ProgressBar } from "@/components/common";
import { Tag } from "@/components/common/Tag";
import { Torrent } from "@/types/responses";
import { cls } from "@/utils/styles";
import { filesize } from "filesize";
import { FC, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { TorrentIconInfo } from "./TorrentIconInfo";
import { useTranslation } from "react-i18next";

export type TorrentListElementProps = {
   torrent: Torrent;
};

export const TorrentListElement: FC<TorrentListElementProps> = ({
   torrent,
}) => {
   const { t } = useTranslation();

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

   const color = useMemo(() => {
      switch (torrent.state) {
         case "downloading":
         case "forcedDL":
            return "bg-blue-500";
         case "error":
         case "missingFiles":
            return "bg-red-500";
         case "metaDL":
         case "pausedDL":
         case "queuedDL":
         case "stalledDL":
            return "bg-yellow-500";
         case "uploading":
         case "stalledUP":
         case "queuedUP":
         case "checkingDL":
         case "checkingUP":
         case "forcedUP":
            return "bg-green-500";
         case "pausedUP":
            return "bg-slate-500";
         case "allocating":
         case "checkingResumeData":
         case "moving":
         case "unknown":
         default:
            return "bg-purple-500";
      }
   }, [torrent.state]);

   const eta = useMemo(() => {
      const seconds = torrent.eta;
      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secondsRest = Math.floor(seconds % 60);

      let result = "";
      if (days > 0) {
         result += `${days}${t("common.units.days")} `;
      }
      if (hours > 0) {
         result += `${hours}${t("common.units.hours")} `;
      }
      if (minutes > 0) {
         result += `${minutes}${t("common.units.minutes")} `;
      }
      if (secondsRest > 0) {
         result += `${secondsRest}${t("common.units.seconds")} `;
      }

      return result;
   }, [torrent.eta]);

   const percent = useMemo(() => {
      const percent = (torrent.downloaded / torrent.size) * 100;
      if (isNaN(percent)) return 0;
      if (percent >= 100) return 100;
      return parseFloat(percent.toFixed(2)).toString();
   }, [torrent.downloaded, torrent.size]);

   return (
      <div
         className={twMerge(
            "relative isolate max-w-5xl overflow-hidden rounded-xl bg-slate-200 transition-colors duration-200 hover:bg-slate-300"
         )}
      >
         <ProgressBar
            value={torrent.downloaded}
            max={torrent.size}
            className="absolute -z-10 h-full w-full"
            progressClassName={cls(color, "opacity-[0.25]")}
         />
         <div className="flex w-full flex-col justify-between p-2 ">
            <h2 className="max-w-4xl overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold">
               {torrent.name}
            </h2>
            <div className="flex w-full">
               <div className="flex flex-grow flex-col">
                  <div className="flex w-full justify-between gap-4">
                     <div className="flex gap-4">
                        <TorrentIconInfo icon={"ph:download-simple-bold"}>
                           {filesize(torrent.dlspeed, { base: 2 })}/s
                        </TorrentIconInfo>
                        <TorrentIconInfo icon="ph:upload-simple-bold">
                           {filesize(torrent.upspeed, { base: 2 })}/s
                        </TorrentIconInfo>
                        <TorrentIconInfo icon="ph:clock-bold">
                           {eta}
                        </TorrentIconInfo>
                     </div>
                  </div>
                  {torrent.tags && torrent.tags !== "" && (
                     <div className={"relative isolate mt-2 flex gap-2"}>
                        {tags.slice(0, 5).map((tag) => (
                           <Tag key={tag}>{tag}</Tag>
                        ))}
                        {tags.length > 5 && (
                           <span className="h-6 rounded-lg  px-2 text-sm">
                              +{tags.length - 5}
                           </span>
                        )}
                     </div>
                  )}
               </div>
               <div className="flex flex-col items-end justify-end gap-1 text-sm text-slate-600">
                  <span>{percent}%</span>
               </div>
            </div>
         </div>
         <ProgressBar
            value={torrent.downloaded}
            max={torrent.size}
            className="h-1 w-full"
            progressClassName={color}
         />
      </div>
   );
};
