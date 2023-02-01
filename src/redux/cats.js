import * as data from '../data/cats'
import {createSlice} from '@reduxjs/toolkit'
import {PURGE} from 'redux-persist'

export const catSlice = createSlice({
  name: 'cat',
  initialState: {
    cats: data.cats,
    selectedCat: null,
  },
  //todos: 리듀서 하나당 하나의 기능만
  reducers: {
    addHistory: (state, action) => {
      state.selectedCat.history.push(action.payload)

      state.cats = [
        ...state.cats.filter(cat => cat.id !== state.selectedCat.id),
        state.selectedCat,
      ]
    },
    handleSelectedCat: (state, action) => {
      state.selectedCat = state.cats.find(cat => cat.id === action.payload)
    },
    // weight
    handleWeight: (state, action) => {
      state.selectedCat.weight = action.payload
      state.cats = [
        ...state.cats.filter(cat => cat.id !== state.selectedCat.id),
        state.selectedCat,
      ]
    },
    // age
    handleAge: (state, action) => {
      state.selectedCat.age += action.payload
      state.cats = [
        ...state.cats.filter(cat => cat.id !== state.selectedCat.id),
        state.selectedCat,
      ]
    },
    // state
    handleState: (state) => {
      state.selectedCat.state = (state.selectedCat.weight < 1) ? data.catStatus.state1 :
        (state.selectedCat.weight < 30) ? data.catStatus.state2 :
          ((state.selectedCat.age >= 15) || (state.selectedCat.age * 0.1 > state.selectedCat.weight)) ? data.catStatus.state4 :
            data.catStatus.state3

      state.cats = [
        ...state.cats.filter(cat => cat.id !== state.selectedCat.id),
        state.selectedCat,
      ]
    },
    // message
    addMessage: (state, action) => {
      state.selectedCat.message = state.selectedCat.messages.slice(0, action.payload)
      state.cats = [
        ...state.cats.filter(cat => cat.id !== state.selectedCat.id),
        state.selectedCat,
      ]
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (initialState) => customElements.removeAll(initialState))
  },
})

export const {
  addHistory,
  handleSelectedCat,
  handleWeight,
  handleAge,
  handleState,
  addMessage
} = catSlice.actions
export default catSlice.reducer

