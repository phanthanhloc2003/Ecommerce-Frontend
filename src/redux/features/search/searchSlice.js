import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value : null
}
export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchTerm: (state , action) => {
            state.value = action.payload
        }
    }
})

export const { searchTerm} = searchSlice.actions
export default searchSlice.reducer