import { cls } from "@/utils/styles";
import { FC } from "react";
import { Icon } from "@iconify/react";

export type TorrentIconInfoProps = {
   className?: string;
   icon: string;
   children: string | string[];
};

export const TorrentIconInfo: FC<TorrentIconInfoProps> = ({
   className,
   children,
   icon,
}) => {
   return (
      <div className={cls("flex w-40 items-center gap-2", className)}>
         <Icon icon={icon} height={22} />
         <span>{children}</span>
      </div>
   );
};
