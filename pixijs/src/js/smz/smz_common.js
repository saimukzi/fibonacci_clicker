'use strict';

export const PHI = (1+Math.sqrt(5))/2;

// https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
export const hsv2rgb = (h,s,v) => {
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);
  const rr = Math.floor(f(5)*0xff);
  const gg = Math.floor(f(3)*0xff);
  const bb = Math.floor(f(1)*0xff);
  return (rr<<16)|(gg<<8)|(bb<<0); 
};
