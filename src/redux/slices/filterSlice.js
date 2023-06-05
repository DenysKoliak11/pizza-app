import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: 'популярности',
        sortProperty: 'rating'
    },
}
const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId:(state, action)=> {

            state.categoryId = action.payload;
        },
        setSort:(state, action)=> {

            state.sort = action.payload;
        },
        setCurrentPage:(state, action)=> {

            state.currentPage = action.payload;
        },
        setFilter:(state, action)=> {
            const { categoryId, sort, currentPage } = action.payload;
            state.currentPage = Number(currentPage)
            state.sort =sort;
            state.categoryId = Number(categoryId);
        }
    }
});
export const { setCategoryId, setSort, setCurrentPage, setFilter } = filterSlice.actions;
export default filterSlice.reducer;