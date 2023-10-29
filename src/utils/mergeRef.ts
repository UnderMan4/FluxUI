import { RefObject } from "react";

type Ref<T> = ((instance: T | null) => void) | RefObject<T> | null;

export const mergeRefs = <T>(...refs: Ref<T>[]): Ref<T> => {
   return (value: T | null) => {
      refs.forEach((ref) => {
         if (typeof ref === "function") {
            ref(value);
         } else if (ref != null) {
            (ref as React.MutableRefObject<T | null>).current = value;
         }
      });
   };
};
