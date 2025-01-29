import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Изначально корзина пуста
  },
  reducers: {
    // Редьюсер для добавления товара в корзину
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      
      // Если товар уже есть в корзине, увеличиваем его количество
      if (existingItem) {
        existingItem.quantity++;
      } else {
        // Если товара нет в корзине, добавляем его с количеством 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // Редьюсер для удаления товара из корзины
    removeItem: (state, action) => {
      const { name } = action.payload;
      // Фильтруем корзину, исключая товар с данным именем
      state.items = state.items.filter(item => item.name !== name);
    },

    // Редьюсер для обновления количества товара
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);

      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;  // Обновляем количество товара
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;
