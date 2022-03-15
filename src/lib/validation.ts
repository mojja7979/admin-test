const email = /^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,5}$/i;
const phoneNumber = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})?[0-9]{3,4}?[0-9]{4}$/;
// const phoneNumber = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
const password =  /^(?=.*[0-9])(?=.*[!@#$%^&*()-_=+])[a-zA-Z0-9!@#$%^&*()-_=+]{8,20}$/;
const nickname = /^(?=.*[|가-힣|a-z|A-Z])[|가-힣|a-z|A-Z|0-9|._]{2,15}$/;
const number = /^[0-9]$/g;
const tel = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
const link = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?$/;
const regExp = /[\{\}\[\]\/?,;:|\)*~`!^\-+<>@\#$%&\\\=\(\'\"]/g;

export const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;


export const validation = {
  phoneNumber: (text: string) => {
    if (text === '') {
      return '휴대폰 번호를 정확히 입력해 주세요.';
    }
    if (text?.trim().length < 10) {
      return '휴대폰 번호를 정확히 입력해 주세요.';
    }
    if (!phoneNumber.test(text)) {
      return '휴대폰 번호를 정확히 입력해 주세요.';
      // return '하이픈(-)을 제외한 숫자만 입력해 주세요.';
    }
  },
  password: (text: string) => {
    if (!password.test(text?.trim())) {
      return '영문, 숫자, 특수문자 조합으로 8~16자를 입력해 주세요.';
    }
  },
  email: (text: string) => {
    if (text === '') {
      return '이메일을 정확히 입력해 주세요.';
    }
    if (
      !/^[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[@]{1}[-A-Za-z0-9_]+[-A-Za-z0-9_.]*[.]{1}[A-Za-z]{2,5}$/i.test(
        text?.trim(),
      )
    ) {
      return '이메일을 정확히 입력해 주세요.';
    }
  },
  nickname: (text: string) => {
    if (text === '') {
      return '닉네임을 정확히 입력해 주세요.';
    }
    if(!nickname.test(text)){
      if(text.match(regExp)){
        return '닉네임에는 문자, 숫자, 밑줄, 마침표만 입력해주세요.';
      }else {
        return '닉네임을 정확히 입력해 주세요.';
      }
    }else if(text.substring(0,1)==='.' || text.substring(0,1)==='_'){
      return '닉네임의 처음에는 밑줄, 마침표를 입력할 수 없어요.';
    }else if(text.slice(-1)==='.' || text.slice(-1)==='_'){
      return '닉네임의 처음에는 밑줄, 마침표를 입력할 수 없어요.';
    }
   
  },
  number: (text: string) => {
    if (!number.test(text)) {
      return '숫자만 입력해 주세요.';
    }
  },
  tel: (text: string) => {
    if (!tel.test(text)) {
      return '전화번호 형식이 일치하지 않습니다.';
    }
  },
  link: (text: string) => {
    if (!link.test(text)) {
      return '올바른 URL 형식이 아닙니다.';
    }
  },
  passwordCheck: (text: string, check: string) => {
    if (text !== check) {
      return '입력하신 비밀번호와 일치하지 않아요.';
    }
  },
};