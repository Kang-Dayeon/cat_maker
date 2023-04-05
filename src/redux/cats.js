import * as data from '../database/catList'
import {createSlice} from '@reduxjs/toolkit'
import {PURGE} from 'redux-persist'

export const catSlice = createSlice({
  name: 'cat',
  initialState: {
    catList: data.catList,
    selectedCat: null,
  },
  //todos: 리듀서 하나당 하나의 기능만
  reducers: {
    // 데이터 업로드
    updateData: (state) => {
      state.catList = [
        ...state.catList.filter(cat => cat.id !== state.selectedCat.id),
        state.selectedCat,
      ]
      state.catList.sort((a,b) => {
        return a.id - b.id
      })
    },
    // selectedCat 찾는 함수
    handleSelectedCat: (state, action) => {
      state.selectedCat = state.catList.find(cat => cat.id === action.payload)
    },
    // 밥먹거나 운동하면 히스토리 저장
    addHistory: (state, action) => {
      state.selectedCat.history.push(action.payload)
    },
    // 마지막으로 밥먹고 경과된 시간 체크
    addTimeDifference: (state, action) => {
      if (state.selectedCat.history.length > 0){
        state.selectedCat.timeDifference = action.payload
      }
    },
    // weight
    handleWeight: (state, action) => {
      state.selectedCat.weight = Math.round((state.selectedCat.weight + action.payload) * 10) / 10
    },
    // age
    handleAge: (state, action) => {
      state.selectedCat.age += action.payload
    },
    // state
    handleState: (state) => {
      state.selectedCat.state = ((state.selectedCat.weight < 2) && (state.selectedCat.weight >= 0)) ? data.catStatus.skinny :
        (state.selectedCat.weight > 30) ? data.catStatus.fatness :
           (state.selectedCat.age >= 15) || ((state.selectedCat.age * 0.1) > state.selectedCat.weight) ? data.catStatus.death :
            data.catStatus.normal
    },
    // message
    addMessage: (state, action) => {
      state.selectedCat.message = [...action.payload]
    },
    // last eat
    handleTimeDifference: (state) => {
      state.catList.map((item) => {
        return item.timeDifference = (item.history.length > 0) ? Date.now() - item.history[item.history.length - 1].timeStamp : null
      })
    },
    // profile page 몸무게, 나이등 체크해서 상태변경하기
    stateCheck: (state) => {
      state.catList.map((item) => {
        return item.state = ((item.weight < 2) && (item.weight > 0)) ? data.catStatus.skinny
        : (item.weight > 30) ? data.catStatus.fatness
        : ((item.age >= 15) || ((item.age * 0.1) > (item.weight))) ? data.catStatus.death
        : data.catStatus.normal
      })
    },
    handleCatListAge: (state) => {
      state.catList.map((item) => {
        return item.age = ((item.history.length > 0) && (item.state !== data.catStatus.death)) ? item.age + 1 : item.age
      })
    },
    handleCatListWeight: (state) => {
      state.catList.map((item) => {
        return item.weight = ((item.timeDifference > 60000) && (item.state !== data.catStatus.death)) ? Math.round((item.weight - 1) * 10) / 10 : item.weight
      })
    },
    deleteCat: (state, action) => {
      state.catList = state.catList.filter(item => item.id !== action.payload)
    },
    createCat : (state, action) => {
      state.catList.push(action.payload)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (initialState) => customElements.removeAll(initialState))
  },
})

export const {
  addHistory,
  addTimeDifference,
  handleSelectedCat,
  handleWeight,
  handleAge,
  handleState,
  addMessage,
  updateData,
  handleTimeDifference,
  stateCheck,
  handleCatListAge,
  handleCatListWeight,
  deleteCat,
  createCat
} = catSlice.actions
export default catSlice.reducer

