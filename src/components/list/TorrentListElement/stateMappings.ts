import { TorrentState } from "@/types/responses";

type StateMapping = {
   progressColor: string;
   statusText: string;
   stateButton: {
      disabled: boolean;
      iconColor: string;
      icon: string;
   };
};

export const mappings: Record<TorrentState, StateMapping> = {
   downloading: {
      progressColor: "bg-blue-500",
      statusText: "[percent]",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:pause-fill",
      },
   },
   forcedDL: {
      progressColor: "bg-blue-500",
      statusText: "[percent]",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:pause-fill",
      },
   },
   error: {
      progressColor: "bg-red-500",
      statusText: "screens.list.status.error",
      stateButton: {
         disabled: true,
         iconColor: "text-slate-800",
         icon: "",
      },
   },
   missingFiles: {
      progressColor: "bg-red-500",
      statusText: "screens.list.status.missing-files",
      stateButton: {
         disabled: true,
         iconColor: "text-slate-800",
         icon: "",
      },
   },
   metaDL: {
      progressColor: "bg-yellow-500",
      statusText: "[percent]",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:pause-fill",
      },
   },
   pausedDL: {
      progressColor: "bg-yellow-500",
      statusText: "screens.list.status.paused",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:play-fill",
      },
   },
   queuedDL: {
      progressColor: "bg-yellow-500",
      statusText: "screens.list.status.queued",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:pause-fill",
      },
   },
   stalledDL: {
      progressColor: "bg-yellow-500",
      statusText: "screens.list.status.stalled",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:pause-fill",
      },
   },
   uploading: {
      progressColor: "bg-green-500",
      statusText: "screens.list.status.seeding",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:stop-fill",
      },
   },
   stalledUP: {
      progressColor: "bg-green-500",
      statusText: "screens.list.status.seeding",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:stop-fill",
      },
   },
   queuedUP: {
      progressColor: "bg-green-500",
      statusText: "screens.list.status.seeding",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:stop-fill",
      },
   },
   checkingDL: {
      progressColor: "bg-green-500",
      statusText: "screens.list.status.checking",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:pause-fill",
      },
   },
   checkingUP: {
      progressColor: "bg-green-500",
      statusText: "screens.list.status.checking",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:stop-fill",
      },
   },
   forcedUP: {
      progressColor: "bg-green-500",
      statusText: "screens.list.status.seeding",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:stop-fill",
      },
   },
   pausedUP: {
      progressColor: "bg-slate-500",
      statusText: "screens.list.status.finished",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:play-fill",
      },
   },
   allocating: {
      progressColor: "bg-purple-500",
      statusText: "screens.list.status.allocating",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:pause-fill",
      },
   },
   checkingResumeData: {
      progressColor: "bg-purple-500",
      statusText: "screens.list.status.checking",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "ph:pause-fill",
      },
   },
   moving: {
      progressColor: "bg-purple-500",
      statusText: "screens.list.status.moving",
      stateButton: {
         disabled: false,
         iconColor: "text-slate-800",
         icon: "",
      },
   },
   unknown: {
      progressColor: "bg-purple-500",
      statusText: "",
      stateButton: {
         disabled: true,
         iconColor: "text-slate-800",
         icon: "",
      },
   },
};
