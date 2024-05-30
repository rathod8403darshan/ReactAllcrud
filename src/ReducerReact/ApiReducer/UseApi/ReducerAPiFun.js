import axios from "axios";

const mount = () => {

    console.log("first")
    try {

        return axios.get("https://student-api.mycodelibraries.com/api/user/get").then((response)=>{
             return  response.data.data
        })
        
    } catch (error) {
        console.log(error)
    }
}

export const ReducerAPiFun= async(state,action)=> {
            switch (action.type) {
                case "GET":
                    state = await mount();
                    return [...state];
                    

                case "ADD":
                    console.log(action.obj)
                    return axios.post("https://student-api.mycodelibraries.com/api/user/add",action.obj).then((response)=>{
                        mount();
                   })
                case "update":
                    return axios.post("https://student-api.mycodelibraries.com/api/user/update",action.objup).then((response)=>{
                        mount();
                   })

                case "DELETE":
                        await axios.delete("https://student-api.mycodelibraries.com/api/user/delete?id=" + action.id);
                        state = await mount(); 
                        return state;
              
                      
                    
                default:
                  return [...state];
            }
}