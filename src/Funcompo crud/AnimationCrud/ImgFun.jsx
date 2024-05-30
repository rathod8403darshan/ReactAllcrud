export const handleZoomin = (url) => {
    document.documentElement.style.setProperty("---scale","1");
    document.documentElement.style.setProperty("--url",`url(${url})`);
    console.log(url)
}
export const handleZoomout = () => {
    document.documentElement.style.setProperty("---scale","0");
}