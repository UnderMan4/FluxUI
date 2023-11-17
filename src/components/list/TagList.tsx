import { Tag } from "@/components/common/Tag";
import { Torrent } from "@/types/responses";
import { FC, useMemo } from "react";

export type TagListProps = {
   torrent: Torrent;
};

export const TagList: FC<TagListProps> = ({ torrent }) => {
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
      <>
         {torrent.tags && torrent.tags !== "" && (
            <div className={"relative isolate flex gap-2"}>
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
      </>
   );
};
