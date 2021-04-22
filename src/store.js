import React, {createContext, useReducer} from 'react';
let x;
if(!localStorage.getItem("token")){
    x=["login","register","Adminlogin"]
    if(!localStorage.getItem("admintoken")){
      x=["login","register","Adminlogin"]
    }
    else{
      x=["","","hey admin"]
    }
}
else if(localStorage.getItem("token")){x=["hey, "+JSON.parse(localStorage.getItem("userdata")).username,"",""]}

const initialState = x;
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'action description':
        const newState = action.payload// do something with the action
        return newState;
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }