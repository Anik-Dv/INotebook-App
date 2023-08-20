
  const reducer = (state=0, action)=>{
    if (action.type==='buyproduct') {
        return state + action.payload
    }

    else if (action.type==='saleproduct') {
        return state - action.payload
    }
    else{
        return state;
    }

}
export default reducer;