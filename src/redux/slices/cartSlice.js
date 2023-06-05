import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    totalPrice: 0,
    items: [],
};
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct:(state, action)=> {
            const { id } = action.payload
            const existingItem = state.items.find((obj) => obj.id === id);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.items.push({ ...action.payload, count: 1, });
            }
            state.totalPrice = calculateTotalPrice(state.items);
        },
        removeItem:(state, action)=> {
            const itemId = action.payload;
            state.items = state.items.filter((obj) => obj.id !== itemId);
            state.totalPrice = calculateTotalPrice(state.items);
        },
        clearItem:(state)=> {
            state.items = [];
            state.totalPrice = 0;
        },
        plusCount:(state, action)=> {
            const itemId = action.payload;
            const item = state.items.find((obj) => obj.id === itemId);
            if (item) {
                item.count += 1;
                state.totalPrice = calculateTotalPrice(state.items);
            }
        },
        minusCount:(state, action)=> {
            const itemId = action.payload;
            const item = state.items.find((obj) => obj.id === itemId);
            if (item) {
                item.count -= 1;
                state.totalPrice -= item.price;
            }
        },
    }
});
export const { addProduct, removeItem, clearItem, plusCount, minusCount } = cartSlice.actions;
export default cartSlice.reducer;

function calculateTotalPrice(items) {
    return items.reduce((sum, item) => {
        return sum + item.price * item.count;
    }, 0);
}