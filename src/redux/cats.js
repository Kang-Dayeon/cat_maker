import * as data from '../data/cats'
import { createSlice } from '@reduxjs/toolkit'

export const catSlice = createSlice({
  name: 'cat',
  initialState: {
    cats: data.cats,
    selectedCat: null,
  },
  reducers: {
    addHistory: (state, action) => {
      state.selectedCat.history.push(action.payload)
      if(action.payload.actionType === 'water') {
        state.selectedCat.weight = +(state.selectedCat.weight + 0.1).toFixed(1)
      } else if(action.payload.actionType === 'meat') {
        state.selectedCat.weight += 3
      } else if(action.payload.actionType === 'feed') {
        state.selectedCat.weight += 1
      } else if(action.payload.actionType === 'work out') {
        state.selectedCat.weight = +(state.selectedCat.weight - 2).toFixed(1)
      }

      if(state.selectedCat.history.length % 3 === 0){
        state.selectedCat.age += 1
      }

      if(state.selectedCat.weight < 1){
        state.selectedCat.state = data.catStatus.state1
      } else if(state.selectedCat.weight < 30){
        state.selectedCat.state = data.catStatus.state2
      } else if(state.selectedCat.weight >= 30){
        state.selectedCat.state = data.catStatus.state3
      }

      if(state.selectedCat.age >= 15 || state.selectedCat.age * 0.1 > state.selectedCat.weight){
        state.selectedCat.state = data.catStatus.state4
      }

      state.cats = [
        ...state.cats.filter(cat => cat.id !== state.selectedCat.id),
        state.selectedCat
      ]
    },
    handleSelectedCat: (state, action) => {
      state.selectedCat = state.cats.find(cat => cat.id === action.payload)
    },
  }
})

export const { addHistory, handleSelectedCat } = catSlice.actions
export default catSlice.reducer

