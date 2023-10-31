import { Tracker } from "@/types/data";
import { Category, MainData, Torrent } from "@/types/responses";
import Cookies from "js-cookie";
import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";
import _ from "lodash";

export type DataStoreState = {
   isLoggedIn: boolean;
   logIn: () => void;
   logOut: () => void;
   torrents: Torrent[];
   categories: Category[];
   tags: string[];
   trackers: Tracker[];
   updateData: (data: MainData) => void;
};

export const useDataStore = create<DataStoreState>((set) => ({
   isLoggedIn: false,
   logIn: () => set({ isLoggedIn: true }),
   logOut: () => {
      set({ isLoggedIn: false });
      Cookies.remove("SID");
   },
   torrents: [],
   categories: [],
   tags: [],
   trackers: [],
   updateData: (data) => {
      if (data.full_update) {
         set({
            categories: Object.values(data.categories ?? {}) ?? [],
            tags: data.tags ?? [],
            trackers: Object.keys(data.trackers ?? {}).map((url) => ({
               url,
               hash: data?.trackers?.[url]?.[0] ?? "",
            })),
            torrents: (Object.values(data.torrents ?? {}) as Torrent[]) ?? [],
         });
      } else {
         set((state) => {
            const torrents = [...state.torrents];
            Object.keys(data.torrents ?? {}).forEach((hash) => {
               const index = torrents.findIndex(
                  (torrent) => torrent.infohash_v1 === hash
               );
               if (index !== -1) {
                  torrents[index] = {
                     ...torrents[index],
                     ...(data.torrents?.[hash] as Torrent),
                  };
               } else {
                  torrents.push(data.torrents?.[hash] as Torrent);
               }
            });

            return {
               categories: _.uniqBy(
                  [
                     ...state.categories,
                     ...Object.values(data.categories ?? {}),
                  ],
                  "name"
               ).filter(
                  (category) =>
                     !data.categories_removed?.includes(category.name)
               ),
               tags: _.uniq([...state.tags, ...(data.tags ?? [])]).filter(
                  (tag) => !data.tags_removed?.includes(tag)
               ),
               trackers: _.uniqBy(
                  [
                     ...state.trackers,
                     ...Object.keys(data.trackers ?? {}).map((url) => ({
                        url,
                        hash: data?.trackers?.[url]?.[0] ?? "",
                     })),
                  ],
                  "hash"
               ),
               torrents: torrents.filter(
                  (torrent) =>
                     !data.torrents_removed?.includes(torrent.infohash_v1)
               ),
            };
         });
      }
   },
}));

if (import.meta.env.DEV) {
   mountStoreDevtool("DataStore", useDataStore);
}
