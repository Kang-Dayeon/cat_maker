export const gender = {
  male: 'Male',
  female: 'Female'
}
export const catStatus = {
  state1: 'Skinny',
  state2: 'Normal',
  state3: 'Fatness',
  state4: 'Death'
}
export const catList = [
  {
    id: 0,
    name: '치즈',
    gender: gender.female,
    image: require('../assets/image/cat01.jpg'),
    dieImage: require('../assets/image/cat01_die.jpg'),
    age: 1,
    weight: 1,
    state: catStatus.state2,
    history: [],
    messages: [
      '잘 키워보시게',
      '밥줘!!!',
      '벌써 많이 컷다용🥳',
      '세월이 빠르구먼..홀홀',
      '이제 움직이기 힘들다옹',
      '그동안 고마웠...😇'
    ],
    message: []
  },
  {
    id: 1,
    name: '콩떡',
    gender: gender.male,
    image: require('../assets/image/cat02.jpg'),
    dieImage: require('../assets/image/cat02_die.jpg'),
    age: 1,
    weight: 1,
    state: catStatus.state2,
    history: [],
    messages: [
      '반갑냥',
      '밥이 부족해.....',
      '나도 다 컷당!!🐾👤',
      '아직 팔팔하당🐱',
      '귀찮아...',
      '...😇'
    ],
    message: []
  },
  {
    id: 2,
    name: '쿠로',
    gender: gender.female,
    image: require('../assets/image/cat03.jpg'),
    dieImage: require('../assets/image/cat03_die.jpg'),
    age: 1,
    weight: 1,
    state: catStatus.state2,
    history: [],
    messages: [
      '냥?',
      '냥얀😻',
      '🐱‍👤',
      '이제 말할수 있다😼',
      '이제 그만....',
      '죽여줘...🙀‍'
    ],
    message: []
  }
]