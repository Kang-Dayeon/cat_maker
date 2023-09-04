import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useRef, useState} from 'react'
// component
import Button from '../../component/Button'
import ContentBox from '../../component/ContentBox'
// data
import {catStatus, gender} from '../../database/catList'
// hook
import useInput from '../../hooks/useInput'
// redux
import {useSelector, useDispatch} from 'react-redux'
import {createCat} from '../../redux/cats'

const NewCat = () => {
  // ** react
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [imageFile, setImageFile] = useState(null)

  // ** redux
  const dispatch = useDispatch()
  const catList = useSelector(state => state.cat.catList)

  // ** hook
  const [text, setText] = useInput({
    name: '',
    gender: gender.male,
  })

  const uploadFile = (e) => {
    const fileList = e.target.files
    if (fileList && fileList[0]) {
      const url = URL.createObjectURL(fileList[0])

      setImageFile({
        file: fileList[0],
        thumbnail: url,
        type: fileList[0].type.slice(0, 5),
      })
    }
  }

  const addCat = () => {
    const newCat = {
      id: (catList.length > 0) ? catList[catList.length - 1].id + 1 : 0,
      name: text.name,
      gender: text.gender,
      image: imageFile.thumbnail,
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
    }
    dispatch(createCat(newCat))
    navigate('/')
  }

  return (
    <ContentBox size={'medium'}>
      <form name="new-cat" className="new-cat">
        <div className="new-cat__info">
          <div className="new-cat__image">
            <div className="img new-cat__box">
              {
                ((!imageFile) && (imageFile === null)) ? <></> :
                  <img src={imageFile.thumbnail}/>
              }
            </div>
            <div className="new-cat__input file-box">
              <label htmlFor="file">Add File</label>
              <input id="file" type="file" accept="image/*" ref={fileInputRef}
                     onChange={uploadFile}/>
            </div>
          </div>

          <div className="new-cat__input new-cat__text">
            <input name="name" type="text" value={text.name} onChange={setText}
                   placeholder="名前を付けてください!" maxLength="5"/>
            <select className="select" name="gender" onChange={setText}
                    value={text.gender}>
              <option value={gender.male} selected="selected">Male</option>
              <option value={gender.female}>Female</option>
            </select>
          </div>
        </div>
        <Button onClick={() => (text.name === '') ? alert('名前を入力お願いします。') :
          (imageFile === null) ? alert('イメージお願いします。') :
            addCat()
        }>Create</Button>
      </form>
    </ContentBox>
  )
}

export default NewCat