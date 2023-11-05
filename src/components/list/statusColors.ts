import { TorrentState } from "@/types/responses";

type StatusProps = {
   progressColor: string;
   backgroundProgressColor: string;
};

export const statusColors: Record<TorrentState, StatusProps> = {
   allocating: {
      progressColor: "bg-blue-500",
      backgroundProgressColor: "bg-blue-200",
   },
   checkingDL: {
      progressColor: "bg-blue-500",
      backgroundProgressColor: "bg-blue-200",
   },
   checkingResumeData: {
      progressColor: "bg-blue-500",
      backgroundProgressColor: "bg-blue-200",
   },
   checkingUP: {
      progressColor: "bg-blue-500",
      backgroundProgressColor: "bg-blue-200",
   },
   downloading: {
      progressColor: "bg-green-500",
      backgroundProgressColor: "bg-green-200",
   },
   error: {
      progressColor: "bg-red-500",
      backgroundProgressColor: "bg-red-200",
   },
   forcedDL: {
      progressColor: "bg-green-500",
      backgroundProgressColor: "bg-green-200",
   },
   forcedUP: {
      progressColor: "bg-green-500",
      backgroundProgressColor: "bg-green-200",
   },
   metaDL: {
      progressColor: "bg-green-500",
      backgroundProgressColor: "bg-green-200",
   },
   missingFi1es: {
      progressColor: "bg-green-500",
      backgroundProgressColor: "bg-green-200",
   },
   moving: {
      progressColor: "bg-green-500",
      backgroundProgressColor: "bg-green-200",
   },
   pausedDL: {
      progressColor: "bg-blue-500",
      backgroundProgressColor: "bg-blue-200",
   },
   pausedUP: {
      progressColor: "bg-blue-500",
      backgroundProgressColor: "bg-blue-200",
   },
   queuedDL: {
      progressColor: "bg-green-500",
      backgroundProgressColor: "bg-green-200",
   },
   queuedUP: {
      progressColor: "bg-green-500",
      backgroundProgressColor: "bg-green-200",
   },
   stalledDL: {
      progressColor: "bg-green-500",
      backgroundProgressColor: "bg-green-200",
   },
   stalledUP: {
      progressColor: "bg-green-500",
      backgroundProgressColor: "bg-green-200",
   },
   unknown: {
      progressColor: "bg-green-500",
      backgroundProgressColor: "bg-green-200",
   },
   uploading: {
      progressColor: "bg-green-500",
      backgroundProgressColor: "bg-green-200",
   },
};
