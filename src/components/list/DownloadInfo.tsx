import { TorrentIconInfo } from "@/components/list/TorrentIconInfo";
import { Torrent } from "@/types/responses";
import { filesize } from "filesize";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

export type DownloadInfoProps = {
   torrent: Torrent;
};

export const DownloadInfo: FC<DownloadInfoProps> = ({ torrent }) => {
   const { t } = useTranslation();

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

   return (
      <div className="flex gap-3">
         <TorrentIconInfo icon={"ph:download-simple-bold"}>
            {filesize(torrent.dlspeed, { base: 2 })}/s
         </TorrentIconInfo>
         <TorrentIconInfo icon="ph:upload-simple-bold">
            {filesize(torrent.upspeed, { base: 2 })}/s
         </TorrentIconInfo>
         {torrent.state === "downloading" && (
            <TorrentIconInfo icon="ph:clock-bold">{eta}</TorrentIconInfo>
         )}
      </div>
   );
};
