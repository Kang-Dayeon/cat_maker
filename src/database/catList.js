export const gender = {
  male: 'Male',
  female: 'Female'
}
export const catStatus = {
  skinny: 'Skinny',
  normal: 'Normal',
  fatness: 'Fatness',
  death: 'Death'
}
export const catList = [
  {
    id: 0,
    name: 'チーズ',
    gender: gender.female,
    image: require('../assets/image/cat01.jpg'),
    age: 1,
    weight: 1,
    state: catStatus.normal,
    history: [],
    messages: [
      'よろしくお願いニャン！！',
      'お腹ぺこぺこ💭',
      'もう大きくなったニャン🥳',
      '時間早いニャン。。',
      'もう動くの難しい🙀',
      '今までありがとうニャン。。😇'
    ],
    message: [],
    timeDifference: null
  },
  {
    id: 1,
    name: 'モチ',
    gender: gender.male,
    image: require('../assets/image/cat02.jpg'),
    age: 1,
    weight: 1,
    state: catStatus.normal,
    history: [],
    messages: [
      'おう！！',
      'ご飯足りない😾',
      '俺ももう大人だニャン!!🐾👤',
      'まだ動けるよ🐱',
      '面倒臭いな。。',
      '...😇'
    ],
    message: [],
    timeDifference: null
  },
  {
    id: 2,
    name: '쿠로',
    gender: gender.female,
    image: require('../assets/image/cat03.jpg'),
    age: 1,
    weight: 1,
    state: catStatus.normal,
    history: [],
    messages: [
      'ニャン？',
      'ニャニャン😻',
      '🐱‍👤',
      'もういえるんだ！！😼',
      'もう。。だめ。。',
      '...🙀‍'
    ],
    message: [],
    timeDifference: null
  }
]