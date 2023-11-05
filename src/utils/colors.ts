import Color from "color";

export const white = Color("#fff");
export const black = Color("#000");

export const getTextColor = (color: Color) => {
   const whiteContrast = color.contrast(white);
   const blackContrast = color.contrast(black);
   return whiteContrast > blackContrast ? white : black;
};
