import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../State/index';

function Shop() {
  const dispatch = useDispatch();
  const { SaleProduct, BuyProduct } = bindActionCreators(actionCreators, dispatch);
  const amount = useSelector(state => state.amount);
  const { addcard, descard } = bindActionCreators(actionCreators, dispatch);
  const count = useSelector(state => state.count);
 
  return (
    <>
    
      <div className='container my-2'>
        <button type="button" class="btn btn-dark mx-2" onClick={() => { SaleProduct(100); descard(1) }}>-</button>
      <span>Product Cost| {amount} BDT | {count}</span>
        <button type="button" class="btn btn-dark mx-2" onClick={() => { BuyProduct(100); addcard(1) }}>+</button>
      </div>

    </>
  );
}

export default Shop;
