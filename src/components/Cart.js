import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  const total = cartItems.reduce((sum, item) => sum + (item.saleInfo?.retailPrice?.amount || 0), 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div> 
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div>
                <img src={item.volumeInfo.imageLinks?.thumbnail} alt={item.volumeInfo.title} />
                <p>{item.volumeInfo.title}</p>
                <p>Price: ${item.saleInfo?.retailPrice?.amount || 'N/A'}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <div className="cart-total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
