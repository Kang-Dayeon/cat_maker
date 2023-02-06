import React from 'react'
import {useNavigate} from 'react-router-dom'
import {useRef, useState} from 'react'
//component
import Button from '../../component/Button'
import ContentBox from '../../component/ContentBox'
//data
import {catStatus, gender} from '../../database/catList'
//hooks
import useInput from '../../hooks/useInput'
//recoil
import {catListState} from '../../recoil/catAtoms'
import {useRecoilState} from 'recoil'

const NewCat = () => {
  // 기존 catlist에 배열 추가

  // ----------------------------- react ---------------------------//
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [imageFile, setImageFile] = useState(null)

  //------------------------------ atoms ---------------------------//
  const [catList, setCatList] = useRecoilState(catListState)

  // ----------------------------- custom hooks ---------------------------//
  const [text, setText] = useInput({
    name : "",
    gender: ""
  })

  // ----------------------------- function ---------------------------//
  // const handleClickFileInput = () => {
  //   fileInputRef.current?.click();
  // }
  const uploadFile = (e) => {
    const fileList = e.target.files
    // const length = fileList?.length
    if(fileList && fileList[0]){
      const url = URL.createObjectURL(fileList[0])

      setImageFile({
        file: fileList[0],
        thumbnail: url,
        type: fileList[0].type.slice(0, 5),
      })
    }
  }
  const addCat = () => {
    navigate('/')
    const newCat = {
      id: catList.length,
      name: text.name,
      gender: gender.female,
      image: imageFile.thumbnail,
      dieImage: imageFile.thumbnail,
      age: 1,
      weight: 1,
      state: catStatus.state2,
      history: [],
      messageLength: 1,
      messages: [
        '잘 키워보시게',
        '밥줘!!!',
        '벌써 많이 컷다용🥳',
        '세월이 빠르구먼..홀홀',
        '이제 움직이기 힘들다옹',
        '그동안 고마웠...😇'
      ],
      message: []
    }
    setCatList((catList) => {
      return [
        ...catList,
        newCat
      ]
    })
  }

  return (
    <ContentBox size={'big'}>
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

          <div className="new-cat__text">
            <input className="new-cat__input" name="name" type="text" value={text.name} onChange={setText} placeholder="이름을 지어주세요!" />
            <select className="new-cat__input" name='gender' onChange={setText} value={text.gender}>
              <option value={gender.male}>Male</option>
              <option value={gender.female}>Female</option>
            </select>
          </div>
        </div>
        <Button onClick={() => addCat()}>Create</Button>
      </form>
    </ContentBox>
  )
}

export default NewCat