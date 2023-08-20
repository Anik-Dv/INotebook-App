
const reducer = (state=0, action)=>{
    if (action.type==='addcard') {
        return state + action.payload
    }

    else if (action.type==='descard') {
        return state - action.payload
    }
    else{
        return state;
    }

}
export default reducer;