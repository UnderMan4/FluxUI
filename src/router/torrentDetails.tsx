import React, { FC } from "react";
import { twMerge } from "tailwind-merge";

export type TorrentDetailsProps = {
   className?: string;
};

export const TorrentDetails: FC<TorrentDetailsProps> = ({ className }) => {
   return <div className={twMerge("", className)}>torrentDetails</div>;
};
