import React, { useState, useCallback, useEffect } from 'react';
import { useRootState } from '../../lib/hooks/useRootState';
import { inputRegex } from '../../lib/inputRegex';
import { useAppDispatch } from "../../store";
import {
  asyncGetUserProfileInfo,
  asyncGetActiveList,
  asyncGetUserProfileSnapshotList,
  asyncGetUserProfileVideoList,
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
  changeSuccessMessage,
  changeEmail,
  changeName,
  initCustomActiveKindList

} from '../../modules/profile';


import { BoardListItem } from '../../components/Board';
import { Paginations } from '../../components/Pagenation';
import { MenuItem } from '../../components/Menu';

import {Container,Row,Col,Table,Button,Form,InputGroup, Image,ListGroup,FloatingLabel } from "react-bootstrap";
import { EditOutlined,CloseSquareOutlined,CloseCircleOutlined } from '@ant-design/icons';
import { Maybe } from '../../components/Maybe';
import { isEmpty } from '../../lib/util';
import { useHistory } from "react-router-dom";
import { lstat } from 'fs';

export const ChannelProfileDetailContainer = ({ match }: any) => {
  const { email } = match.params;
  const {
    profileImg,
    aboutMe,
    name,
    myMessage,
    chUserActiveList,
    items,
    videolist,
    snapshotPageMetadata,
    videolistPageMetadata,
    videolistPage,
    snapshotlistPage,
    CUSTOM_CATE_CODE,
    activeKindList,
    customActiveKindList,
    imgPath,
    imgThumbnailPath,
    errorMessage,
    successMessage,
    createdAt

  } = useRootState((state) => state.profileDetail);

  const dispatch = useAppDispatch();
  const history = useHistory();

  useEffect(() => {
   dispatch(asyncGetUserProfileInfo({ email:email }));
   dispatch(asyncDetailPageGetActiveList());
   dispatch(asyncGetUserProfileSnapshotList({email:email,page:snapshotlistPage,size:snapshotPageMetadata.size}));
   dispatch(asyncGetUserProfileVideoList({email:email,page:videolistPage,size:videolistPageMetadata.size}));
  }, []);


  const boardTitle = ['No', '제목', '사진컷', '작업 분류', '등록일', '상태'];
  const boardVideoTitle = ['No', '제목', '유튜브 URL', '등록일', '상태'];

  const [customTagText, setCustomTagText] = useState<string>('');
  const [profileImgFile, setProfileImgFile] = useState<string>('');

  
  const onCurrentPage = (number: number) => {
    dispatch(changeSnapshotPage(number))
  }
  const prev = () => {
    dispatch(changeSnapshotPage(snapshotlistPage - 1))

  }
  const next = () => {
    dispatch(changeSnapshotPage(snapshotlistPage + 1))

  }

  const onCurrentVideoPage = (number: number) => {
    dispatch(changeVideoPage(number))
  }
  const prevVideoPage = () => {
    dispatch(changeVideoPage(videolistPage - 1))

  }
  const nextVideoPage = () => {
    dispatch(changeVideoPage(videolistPage + 1))

  }

//프로필 수정
  const setActiveKindList = (index: number) => {
    dispatch(setIsActiveActiveKindList(index));
  };

  const onAddCustomActiveKind = (text:string) =>{
    dispatch(changeCustomActiveKindList(text))

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
    }
  }

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
  


  const onEdit = () => {
    if(isEmpty(profileImg) ){
      alert("대표 이미지를 등록 해주세요");

    }else if(isEmpty(myMessage)){
      alert("마이 메세지를 입력 해주세요");
    }else if(isEmpty(getActiveKinds())){
      alert("활동분야 1개 이상 선택해주세요")

    }else{
      try {
         const formData = new FormData();
         formData.append('profileImage', profileImgFile);
         formData.append('email', email);
         asyncOnSaveProfileImage(formData).then((payload: any) => {
           console.log(payload)
          dispatch(asyncOnEditProfile({
            data:{
              profileImg:payload.imgPath,
              profileThumbnailImg:imgThumbnailPath,
              aboutMe:aboutMe,
              myMessage:myMessage,
              channelUserActiveKind:getActiveKinds(),
              channelUserTagList: getChannelUserTagList()
            },
            email
          }));
          alert('회원 프로필 수정 완료했습니다');
          document.location.href = "/main/profile";
          // history.push("/main/profile");

         })

  
      } catch (err) {
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


    return list
  };

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
        smallTitle='상세'
      />
      <Container >
       <Form.Label >◎ 상세 정보</Form.Label>
        <Table variant="white" bordered >
          
          <tbody>
            <tr>
              <td >태거 이름</td>
              <td>
                {name}
              </td>
              <td>등록일</td>
              <td>
                {createdAt}
              </td>
            </tr>
            <tr>
              <td>아이디</td>
              <td>
                {email}
              </td>
              <td></td>
              <td></td>
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
                  <>
                  <ListGroup horizontal>
                    <ListGroup.Item>
                      {e.codeName}
                      <a onClick={() => onDeleteCusotomActiveKind(i)}>
                        <CloseCircleOutlined
                         style={{marginLeft:'10px'}}
                        />
                      </a>
                    </ListGroup.Item>
                  </ListGroup>
                  </>
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
            <Button style={{ marginLeft: '10px' }} variant="outline-primary" onClick={onEdit}>저장</Button>
          </Col>
        </Row>

        <Form.Label >◎ 포트폴리오(스냅샷)</Form.Label>
        <div></div>
        {items.length !== 0?(
          <>
            <BoardListItem
            boardTitle={boardTitle}
            content={items}
            address='profileDetail'
            listType='profileSnapshotList'
            total={snapshotPageMetadata.totalElements}
            size={snapshotPageMetadata.size}
            currentPage={snapshotlistPage}
            />
            <Paginations
              postsPerPage={snapshotPageMetadata.size}
              totalPosts={snapshotPageMetadata.totalElements}
              onCurrentPage={onCurrentPage}
              prev={prev}
              next={next}
              currentPage={snapshotlistPage}
      
            />
            </>
        ):(
          <div style={{height:'300px', border:'1px solid #ddd', textAlign:'center', paddingTop:'100px'}}>
            <Form.Label htmlFor="inputPassword5">포트폴리오 스냅샷이 없습니다</Form.Label>
          </div>
          
        )}
        <div style={{marginTop:'50px'}}></div>
        <Form.Label >◎ 포트폴리오(영상)</Form.Label>
        {videolist.length !== 0 ?(
          <>
            <BoardListItem
            boardTitle={boardVideoTitle}
            content={videolist}
            address='profileDetail'
            listType='profileVideoList'
            total={videolistPageMetadata.totalElements}
            size={videolistPageMetadata.size}
            currentPage={videolistPage}
            />
            <Paginations
              postsPerPage={videolistPageMetadata.size}
              totalPosts={videolistPageMetadata.totalElements}
              onCurrentPage={onCurrentVideoPage}
              prev={prevVideoPage}
              next={nextVideoPage}
              currentPage={videolistPage}
      
            />
            </>
        ):(
          <div style={{height:'300px', border:'1px solid #ddd', textAlign:'center', paddingTop:'100px'}}>
            <Form.Label htmlFor="inputPassword5">포트폴리오 영상 없습니다</Form.Label>
          </div>
          
        )}
      
      </Container>

 </Container>

  )
}