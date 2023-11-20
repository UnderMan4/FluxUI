import { DeepPartial } from "@/types/util";
import { SyncService } from "@/services";
import { Tracker } from "@/types/data";
import {
   Categories,
   Category,
   MainData,
   Torrent,
   Torrents,
   Trackers,
} from "@/types/responses";
import { signal } from "@preact/signals-react";
import _ from "lodash";

export const isLoadingSignal = signal<boolean>(true);

export const torrentsSignal = signal<Torrent[]>([]);
export const categoriesSignal = signal<Category[]>([]);
export const tagsSignal = signal<string[]>([]);
export const trackersSignal = signal<Tracker[]>([]);

let rid = 0;

let timeout: number;

const updateTorrents = (torrents: DeepPartial<Torrents>) => {
   Object.keys(torrents ?? {}).forEach((hash) => {
      const index = torrentsSignal.value.findIndex(
         (torrent) => torrent.infohash_v1 === hash
      );

      if (index !== -1) {
         torrentsSignal.value[index] = {
            ...torrentsSignal.value[index],
            ...(torrents?.[hash] as Torrent),
         };
      } else {
         torrentsSignal.value.push(torrents?.[hash] as Torrent);
      }
   });
};

const removeTorrents = (torrents_removed: string[]) => {
   torrentsSignal.value = torrentsSignal.value.filter(
      (torrent) => !torrents_removed?.includes(torrent.infohash_v1)
   );
};

const updateCategories = (categories: Categories) => {
   Object.keys(categories ?? {}).forEach((category) => {
      const index = categoriesSignal.value.findIndex(
         (cat) => cat.name === category
      );
      if (index !== -1) {
         categoriesSignal.value[index] = {
            ...categoriesSignal.value[index],
            ...(categories?.[category] as Category),
         };
      } else {
         categoriesSignal.value.push(categories?.[category] as Category);
      }
   });
};

const removeCategories = (categories_removed: string[]) => {
   categoriesSignal.value = categoriesSignal.value.filter((category) => {
      return categories_removed?.includes(category.name) === false;
   });
};

const updateTags = (tags: string[]) => {
   tagsSignal.value = _.uniq([...tagsSignal.value, ...(tags ?? [])]);
};

const removeTags = (tags_removed: string[]) => {
   tagsSignal.value = tagsSignal.value.filter((tag) => {
      return !tags_removed?.includes(tag);
   });
};

const updateTrackers = (trackers: DeepPartial<Trackers>) => {
   Object.keys(trackers ?? {}).forEach((url) => {
      const index = trackersSignal.value.findIndex((tracker) => {
         return tracker.url === url;
      });
      if (index !== -1) {
         trackersSignal.value[index] = _.merge(trackersSignal.value[index], {
            url,
            hash: trackers?.[url]?.[0],
         });
      } else {
         trackersSignal.value.push({
            url,
            hash: trackers?.[url]?.[0] ?? "",
         });
      }
   });
};

const removeTrackers = (trackers_removed: string[]) => {
   trackersSignal.value = trackersSignal.value.filter((tracker) => {
      return !trackers_removed?.includes(tracker.url);
   });
};

const parseData = (data: MainData) => {
   if (Object.keys(data).length <= 1) return;
   const {
      categories,
      categories_removed,
      tags_removed,
      tags,
      torrents,
      torrents_removed,
      trackers,
      full_update,
      trackers_removed,
   } = data;

   if (full_update) {
      categoriesSignal.value = Object.values(categories ?? {}) ?? [];
      tagsSignal.value = tags ?? [];
      trackersSignal.value = Object.keys(trackers ?? {}).map((url) => ({
         url,
         hash: trackers?.[url]?.[0] ?? "",
      }));
      torrentsSignal.value = (Object.values(torrents ?? {}) as Torrent[]) ?? [];
   } else {
      if (torrents) updateTorrents(torrents);
      if (torrents_removed) removeTorrents(torrents_removed);

      if (categories) updateCategories(categories);
      if (categories_removed) removeCategories(categories_removed);

      if (tags) updateTags(tags);
      if (tags_removed) removeTags(tags_removed);

      if (trackers) updateTrackers(trackers);
      if (trackers_removed) removeTrackers(trackers_removed);
   }
};

const sendRequest = async () => {
   try {
      const { data } = await SyncService.mainData(rid);
      if (data.rid) rid = data.rid;
      parseData(data);
   } catch (error) {
      console.error(error);
   } finally {
      if (isLoadingSignal.value) isLoadingSignal.value = false;
      timeout = setTimeout(sendRequest, 1000);
   }
};

export const startPeriodicUpdate = () => {
   timeout = setTimeout(sendRequest, 1000);
};

export const stopPeriodicUpdate = () => {
   clearTimeout(timeout);
};
