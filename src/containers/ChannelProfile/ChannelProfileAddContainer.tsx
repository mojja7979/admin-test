import React, { useState, useCallback, useEffect } from 'react';
import { useRootState } from '../../lib/hooks/useRootState';
import { inputRegex } from '../../lib/inputRegex';
import { useAppDispatch } from "../../store";
import {
  changeSnapshotPage,
  changeVideoPage,
  asyncDetailPageGetActiveList,
  setIsActiveActiveKindList,
  changeCustomActiveKindList,
  deleteCustomActiveKindList,
  changeMyMessage,
  changeAboutMe,
  deleteProfileImg,
  changeProfileImg,
  asyncOnEditProfile,
  asyncOnSaveProfileImage,
  changeEmail,
  changeName,
  asyncCheckValidationNickname,
  asyncCheckStatusEmail,
  asyncOnAddProfile,
  changeCheckEmail,
  changeSuccessMessage,
  initCustomActiveKindList,
  initImgPath

} from '../../modules/profile';


import { BoardListItem } from '../../components/Board';
import { Paginations } from '../../components/Pagenation';
import { MenuItem } from '../../components/Menu';
import { isEmpty } from '../../lib/util';
import { validation } from '../../lib/validation';

import {Container,Row,Col,Table,Button,Form,InputGroup, Image,ListGroup } from "react-bootstrap";
import { EditOutlined,CloseSquareOutlined,CloseCircleOutlined } from '@ant-design/icons';

export const ChannelProfileAddContainer = ({ history } : { history: any }) => {

  const {
    email,
    profileImg,
    aboutMe,
    name,
    myMessage,
    videolistPage,
    snapshotlistPage,
    CUSTOM_CATE_CODE,
    activeKindList,
    customActiveKindList,
    imgPath,
    imgThumbnailPath,
    errorMessage,
    statusEmail,
    checkEmail,
    checkName,
    successMessage,

  } = useRootState((state) => state.profileDetail);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeMyMessage(''));
    dispatch(changeAboutMe(''));
    dispatch(changeEmail(''));
    dispatch(changeName(''));
    dispatch(changeSuccessMessage(''));
    dispatch(asyncDetailPageGetActiveList());
    dispatch(initImgPath(''));
    dispatch(initCustomActiveKindList([]));
  }, []);



  const [customTagText, setCustomTagText] = useState<string>('');
  const [profileImgFile, setProfileImgFile] = useState<string>('');



//프로필 수정
  const setActiveKindList = (index: number) => {
    dispatch(setIsActiveActiveKindList(index));
  };

  const onAddCustomActiveKind = (text:string) =>{
    dispatch(changeCustomActiveKindList(text));
    setCustomTagText('');

  }
  const onDeleteCusotomActiveKind = (index:number) =>{
    dispatch(deleteCustomActiveKindList(index))
  }
  const onDeleteProfileImg = () => {
    dispatch(deleteProfileImg(''));
  }

  const onChange = (e:any) =>{
    const {id, value} = e.target
    switch (id) {
      case '메세지':
        dispatch(changeMyMessage(value));
      break;
      case '자기소개':
        dispatch(changeAboutMe(value));
      break;
      case '직접태그':
        setCustomTagText(value);
      break;
      case '이메일':
        dispatch(changeEmail(value));
      break;
      case '이름':
        dispatch(changeName(value));
      break;
    }
  }

  // const handleCheckTextChange = (inputText:string) => {
  //   if(!inputText) return ''
  //   const words = inputText.split(/(\s+)/);
  //   const formattedText:any = [];
  //   words.forEach((word, index) => {
  //     const isLastWord = index === words.length - 1;
  //     if (word.startsWith('#')) {
  //       const mention = (
  //           <p key={word + index} style={{color: '#71c6cb'}}>
  //             {word}
  //           </p>
  //       );
  //       isLastWord ? formattedText.push(mention) : formattedText.push(mention);
  //     } else if (word.startsWith('http')) {
  //       const mention = (
  //           <p key={word + index} style={{color: '#8eb4e3'}}>
  //             {word}
  //           </p>
  //       );
  //       isLastWord ? formattedText.push(mention) : formattedText.push(mention);
  //     } else {
  //       return isLastWord ? formattedText.push(word) : formattedText.push(word);
  //     }

  //   });
  //   return formattedText;
  // }

  const handleChangeFile = (event:any) => {


    setProfileImgFile(event.target.files[0]);

    const reader: any = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    return new Promise((resolve: any) => {
      reader.onload = () => {
        dispatch(changeProfileImg(reader.result))
        resolve();
      };
    });

  }
  
  // useEffect(()=>{

  //   dispatch(changeProfileImg(`https://d3l56je3t3n6gf.cloudfront.net/${imgPath}`));

  // },[imgPath])


  const onAdd = () => {

    if(!profileImg){
        alert("대표 이미지를 넣어주세요")
    }else if(!myMessage){
       
        alert("마이 메세지를 입력해주세요")

    }else if(isEmpty(getActiveKinds())){
      alert("활동분야 1개 이상 선택해주세요");

    }else if(checkName){
        alert("닉네임 중복 확인해주세요")
    }else if(!checkEmail){
       alert("아이디를 확인 해 주세요")
    }
    else {
      try{
        const formData = new FormData();
         formData.append('profileImage', profileImgFile);
         formData.append('email', email);
         asyncOnSaveProfileImage(formData).then((payload: any) => {

          dispatch(asyncOnAddProfile({
            email:email,
            profileImg:payload.imgPath,
            profileThumbnailImg:payload.imgThumbnailPath,
            aboutMe:aboutMe,
            name:name,
            myMessage:myMessage,
            channelUserActiveKind:getActiveKinds(),
            channelUserTagList: getChannelUserTagList()
        }));
  
        alert("프로필 등록에 성공 했습니다");
        document.location.href = "/main/profile";
        //history.push("/main/profile");

         })
       

      }catch(err){
        alert(errorMessage)
      }
       
    }
  }




  const getChannelUserTagList = () => {

    const formattedText:any = [];
    const words = aboutMe.split(/(\s+)/);
    words.forEach((word, index) => {
      if(word.startsWith('#')){
        formattedText.push(word.replace('#',''))
      }
    })

    return formattedText;
  }

    const getActiveKinds = () => {
    let list:any = [];
    activeKindList.map((e: any, i: number) => {
      if(e.isActive)
        list.push(e)
    })
    list = list.concat(customActiveKindList)
    console.log("list",list)
    return list
  };

  const onCheckValidationNickname = () => {
    if(isEmpty(name)){
      alert("태거이름을 입력 해 주세요")
    }else if(!validation.nickname(name)) {
      dispatch(asyncCheckValidationNickname(name)); 

    }else {
      alert("태거이름 형식에 맞지 않습니다")

    }

  }



  const onCheckStatusEmail = () => {
    if(isEmpty(email)){
      alert("회원 이메일을 입력 해 주세요")

    }else {

      dispatch(asyncCheckStatusEmail({email})); 

    }
   
  }


  const goBack = () =>{

    dispatch(changeMyMessage(''));
      dispatch(changeAboutMe(''));
      setCustomTagText('');
      dispatch(changeEmail(''));
      dispatch(changeName(''));
      dispatch(changeSuccessMessage(''));
      dispatch(changeProfileImg(''));
      dispatch(initCustomActiveKindList([]));
      history.push("/main/profile");

  }


  return (
    <Container style={{height:'5000px'}}>
      <MenuItem
        title='프로필'
        largeTitle='채널 관리'
        middleTitle='프로필'
        smallTitle='등록'
      />
      <Container >
       <Form.Label >◎ 상세 정보</Form.Label>
        <Table variant="white" bordered >
          
          <tbody>
            <tr>
              <td >아이디</td>
              <td colSpan={3}>
              <InputGroup className="mb-3" >
                      <Form.Control
                       type='text'
                        placeholder="직접 입력"
                        value={email}
                        id="이메일"
                        onChange={onChange}
                      />
                      <Button 
                      variant="outline-secondary" 
                      id="button-addon2"
                      onClick={onCheckStatusEmail}
                      >
                        아이디 확인
                      </Button>
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td>태거 이름</td>
              <td colSpan={3}>
              <InputGroup className="mb-3" >
                      <Form.Control
                       type='text'
                        placeholder="직접 입력"
                        value={name}
                        id="이름"
                        onChange={onChange}
                      />
                      <Button 
                      variant="outline-secondary" 
                      id="button-addon2"
                      onClick={onCheckValidationNickname}
                      >
                        중복 확인
                      </Button>
                </InputGroup>
              </td>
            </tr>
            <tr>
              <td>대표 이미지</td>
              <td colSpan={3}>
                <div style={{width: '400px', height:'400px',position:'relative'}}>
                  {profileImg && profileImg ? (
                    <img 
                    src={profileImg}
                    className='img-thumbnail'
                    style={{ width: '100%', height:'100%' }}
                    />

                  ):(
                    <div style={{ width: '100%',height:'100%' , backgroundColor:'#fff', border:'1px solid #ddd', textAlign:'center' }}>
                      <p style={{marginTop:'100px'}}>이미지 없음</p>
                    </div>

                  )}
                  
                  <div style={{position:'absolute', background:'rgba(0, 0, 0, 0.5)', width:'100%',height:'90px', bottom:5}}>
                  <div style={{ textAlign:'center', marginTop:'30px'}}>
                    <a>
                    <label htmlFor="fileInput">
                      <EditOutlined style={{color:'#fff', fontSize:'25px'}}/>
                    </label>
                    <input type="file" id="fileInput" accept='image/*' onChange={handleChangeFile} style={{display:'none'}} />
                    </a>
                    <a onClick={onDeleteProfileImg} style={{marginLeft:8}}><CloseSquareOutlined style={{color:'#fff',fontSize:'25px'}} /></a>

                  </div>
                  
                  </div>
                  
                </div>
                
              </td>
            </tr>
            <tr>
              <td>메세지</td>
              <td colSpan={3}>
                <Form.Control
                   type='text'
                    placeholder="직접 입력"
                    value={myMessage}
                    id='메세지'
                    onChange={onChange}
                />
              </td>
            </tr>
            <tr>
              <td>활동 분야</td>
              <td colSpan={3}>
                {activeKindList?.filter((e: any) => e.cateCode !== CUSTOM_CATE_CODE && e.codeName).map((item:any, index:number)=>{
                  return(
                    <Form.Check
                      key={`activeList-${index}`}
                      type='checkbox'
                      inline
                      id={`${item.mainGubun}/${item.subGubun}/${item.cateCode}`}
                      label={item.codeName}
                      checked={item.isActive?true:false}
                      onChange={() => setActiveKindList(index)}
                    />
                  )
                })}
                <InputGroup className="mb-3" >
                      <Form.Control
                       type='text'
                        placeholder="직접 입력"
                        value={customTagText}
                        id="직접태그"
                        onChange={onChange}
                      />
                      <Button 
                      variant="outline-secondary" 
                      id="button-addon2"
                      onClick={()=>onAddCustomActiveKind(customTagText)}
                      >
                        추가
                      </Button>
                </InputGroup>
                {customActiveKindList.map((e: any, i: number) => {
                if(!e.codeName) return null
                return (
                 
                  <ListGroup 
                    horizontal
                    key = {`customActiveKindList-${i}`}
                >
                    <ListGroup.Item>
                      {e.codeName}
                      <a onClick={() => onDeleteCusotomActiveKind(i)}>
                        <CloseCircleOutlined
                         style={{marginLeft:'10px'}}
                        />
                      </a>
                    </ListGroup.Item>
                  </ListGroup>
                
                )
              })}
              </td>
            </tr>
            <tr>
              <td>자기 소개</td>
              <td colSpan={3}>
              <textarea
               placeholder="자기소개"
               id='자기소개'
               value={aboutMe}
               onChange={onChange}
               style={{width:'100%', height:'300px', border:'1px solid #ddd'}}
              
              />
              </td>
            </tr>
          </tbody>
        </Table>
        <Row className="justify-content-md-center" style={{ margin: '20px 0' }}>
          <Col md={{ span: 7, offset: 5 }}>
            <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={goBack}>취소</Button>
            <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={onAdd}>저장</Button>
          </Col>
        </Row>

       
      
      </Container>

 </Container>

  )
}