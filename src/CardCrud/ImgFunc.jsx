export const ImgZoom = (url1) => {
   document.documentElement.style.setProperty("--scale",1);
   document.documentElement.style.setProperty("--imagUrl",`url(${url1})`);
   console.log(url1)
}
export const ImgZoomout = () => {
   document.documentElement.style.setProperty("--scale",0);
}
