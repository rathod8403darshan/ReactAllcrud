import axios from "axios";

const mounting = async () => {
  try {
    return await axios.get("https://student-api.mycodelibraries.com/api/student/get").then((res) => {
      return [...res.data.data]
    });
  } catch (error) {
    console.log(error)
  }
};


export const ApiFun = async (state, action) => {

 

  if (action.type === "add") {
    state.push(action.obj1);
  }

  else if (action.type === "mounting") {
    state = await mounting();
    console.log(state);
  }


  //   else if (action.type === "edit") {
  //     state.splice(action.index, 1, action.obj);
  //   }



  return [...state];
};