import tinycolor = require("tinycolor2");

export default function colorPalette(color:string, index:number):string {
    const hueStep = 2;
    const saturationStep = 16;
    const saturationStep2 = 5;
    const brightnessStep1 = 5;
    const brightnessStep2 = 15;
    const lightColorCount = 5;
    const darkColorCount = 4;
    const pIsLight = index <= 6;
    const pHsv = tinycolor(color).toHsv();
    const pI = pIsLight ? lightColorCount + 1 - index : index - lightColorCount - 1;
  
    const getHue = (hsv:any, i:number, isLight:boolean) => {
      let hue;
      if (hsv.h >= 60 && hsv.h <= 240) {
        hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
      } else {
        hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
      }
      if (hue < 0) {
        hue += 360;
      } else if (hue >= 360) {
        hue -= 360;
      }
      return Math.round(hue);
    };
    const getSaturation = (hsv:any, i:number, isLight:boolean) => {
      let saturation;
      if (isLight) {
        saturation = Math.round(hsv.s * 100) - saturationStep * i;
      } else if (i === darkColorCount) {
        saturation = Math.round(hsv.s * 100) + saturationStep;
      } else {
        saturation = Math.round(hsv.s * 100) + saturationStep2 * i;
      }
      if (saturation > 100) {
        saturation = 100;
      }
      if (isLight && i === lightColorCount && saturation > 10) {
        saturation = 10;
      }
      if (saturation < 6) {
        saturation = 6;
      }
      return Math.round(saturation);
    };
    const getValue = (hsv:any, i:number, isLight:boolean) => {
      if (isLight) {
        return Math.round(hsv.v * 100) + brightnessStep1 * i;
      }
      return Math.round(hsv.v * 100) - brightnessStep2 * i;
    };

    return tinycolor({
        h: getHue(pHsv, pI, pIsLight),
        s: getSaturation(pHsv, pI, pIsLight),
        v: getValue(pHsv, pI, pIsLight),
      }).toHexString();
  }