import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Функция для извлечения числа из строки с ценой
  const parseCost = (cost) => parseFloat(cost.replace('$', ''));

  // Рассчитываем общую сумму
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0);
  };

  // Увеличиваем количество товара
  const handleIncrement = (item) => {
    const updatedQuantity = item.quantity + 1;
    dispatch(updateQuantity({ name: item.name, quantity: updatedQuantity }));
  };

  // Уменьшаем количество товара
  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem({ name: item.name }));
    } else {
      const updatedQuantity = item.quantity - 1;
      dispatch(updateQuantity({ name: item.name, quantity: updatedQuantity }));
    }
  };

  // Удаляем товар из корзины
  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  // Добавляем товар в корзину
  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  // Рассчитываем стоимость для каждого товара
  const calculateTotalCost = (item) => {
    return parseCost(item.cost) * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost}</div>
              <div className="cart-item-quantity">
                <button 
                  className="cart-item-button cart-item-button-dec" 
                  onClick={() => handleDecrement(item)} 
                  disabled={item.quantity === 1}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button 
                  className="cart-item-button cart-item-button-inc" 
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
