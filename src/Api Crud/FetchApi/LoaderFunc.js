export const loaderFun  =(val)=> {
    if(val){
        document.documentElement.style.setProperty("--DisplayLoader","inline")
    }
    else{
        document.documentElement.style.setProperty("--DisplayLoader","none")
    }
}