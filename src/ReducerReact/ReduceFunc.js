export const ReduceFunc = (state,action)=> {

  // state = action;
 if(action.type =="add"){
     state.push(action.obj1);
 }
 if(action.type == "remove"){
   state.splice(action.index,1);
  localStorage.setItem("state", JSON.stringify(state));
 }
 if(action.type ==="edit"){
   state.splice(action.index,1,action.obj);
 }
 if(action.type ==="setItem"){
  localStorage.setItem("state", JSON.stringify(state));
  localStorage.setItem("count", JSON.stringify(action.count)); 
 }

 if(action.type ==="mounting"){
    if(JSON.parse(localStorage.getItem("state")) ){
      state = [...JSON.parse(localStorage.getItem("state"))]
      action.setcount(JSON.parse(localStorage.getItem("count")))
    }
 }

  return [...state]
}