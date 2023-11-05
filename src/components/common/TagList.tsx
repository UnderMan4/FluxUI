import { Tag } from "@/components/common/Tag";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";

export type TagListProps = {
   className?: string;
   tags: string | string[];
};

export const TagList: FC<TagListProps> = ({ className, tags }) => {
   const tagsToRender = (Array.isArray(tags) ? tags : tags.split(","))
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "")
      .sort(
         (a, b) => a.toLowerCase().charCodeAt(0) - b.toLowerCase().charCodeAt(0)
      );
   const [isPopupOpen, setIsMoreOpen] = useState(false);

   const popupVarioants: Variants = {
      closed: {
         opacity: 1,
         transition: {
            duration: 5,
         },
         height: "100%",
         width: "100%",
      },
      open: {
         opacity: 1,
         transition: {
            duration: 5,
         },
         height: "auto",
         width: "15rem",
      },
   };

   return (
      <div className={twMerge("relative isolate flex gap-2", className)}>
         {tagsToRender.slice(0, 3).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
         ))}
         {!isPopupOpen && tagsToRender.length > 3 && (
            <button
               className="h-6 rounded-lg border-2 border-slate-400 bg-slate-300 px-2 text-sm"
               onClick={() => {
                  setIsMoreOpen((prev) => !prev);
               }}
            >
               +{tagsToRender.length - 3}
            </button>
         )}
      </div>
   );
};
