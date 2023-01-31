import * as data from '../data/cats'
import { createSlice } from '@reduxjs/toolkit'
import {PURGE} from 'redux-persist'

export const catSlice = createSlice({
  name: 'cat',
  initialState: {
    cats: data.cats,
    selectedCat: null,
    randomEating: 0,
  },
  reducers: {
    addHistory: (state, action) => {
      state.randomEating = Math.round((Math.random() * (10 - 1)) + 1)
      // 랜덤으로 밥먹이기
      if(state.randomEating < 9) {
        state.selectedCat.history.push(action.payload)
        if(action.payload.actionType === 'water') {
          state.selectedCat.eating += 1
          state.selectedCat.weight = +(state.selectedCat.weight + 0.1).toFixed(1)
        } else if(action.payload.actionType === 'meat') {
          state.selectedCat.eating += 1
          state.selectedCat.weight += 3
        } else if(action.payload.actionType === 'feed') {
          state.selectedCat.eating += 1
          state.selectedCat.weight += 1
        } else if(action.payload.actionType === 'work out') {
          state.randomEating = 11
          state.selectedCat.disabled = true
          state.selectedCat.weight = +(state.selectedCat.weight - 2).toFixed(1)
        }
      } else {
        state.selectedCat.disabled = true
      }

      // 밥 3번 먹으면 나이 먹기
      if(state.selectedCat.eating % 3 === 0){
        state.selectedCat.age += 1
        if(state.selectedCat.age % 3 === 0){
          state.selectedCat.messageLength += 1
        }
      }

      //메세지
      state.selectedCat.message = state.selectedCat.messages.slice(0,state.selectedCat.messageLength)

      // 고양이 상태변경
      if(state.selectedCat.weight < 1){
        state.selectedCat.state = data.catStatus.state1
      } else if(state.selectedCat.weight < 30){
        state.selectedCat.state = data.catStatus.state2
      } else if(state.selectedCat.weight >= 30){
        state.selectedCat.state = data.catStatus.state3
      }

      // 죽는경우
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
    handleDisabled: (state, action) => {
      state.selectedCat.disabled = false
      state.cats = [
        ...state.cats.filter(cat => cat.id !== state.selectedCat.id),
        state.selectedCat
      ]
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (initialState) => customElements.removeAll(initialState));
  }
})

export const { addHistory, handleSelectedCat, handleDisabled } = catSlice.actions
export default catSlice.reducer

