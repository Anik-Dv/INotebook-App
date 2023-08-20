
export const BuyProduct = (amount)=>{
    return (dispatch)=>{
        dispatch({
            type: 'buyproduct',
            payload: amount
        })
    }
}

export const SaleProduct = (amount)=>{
    return (dispatch)=>{
        dispatch({
            type: 'saleproduct',
            payload: amount
        })
    }
}

export const AddCard = (count)=>{
    return (dispatch)=>{
        dispatch({
            type: 'addcard',
            payload: count
        })
    }
}

export const DesCard = (count)=>{
    return (dispatch)=>{
        dispatch({
            type: 'descard',
            payload: count
        })
    }
}