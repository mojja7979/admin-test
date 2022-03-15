export const isEmpty = (value: string) => {
  if (
    value === "" ||
    value === null ||
    value === undefined ||
    (value !== null && typeof value === "object" && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};

export const emailMasking = (value: string) => {
  var preMaskingData = isEmpty(value) ? "" : value;
  var MaskingData = "";
  var len = "";

  let emailMatchValue: any = preMaskingData.match(
    /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi
  );

  if (isEmpty(emailMatchValue) === true) {
    MaskingData = preMaskingData;
  } else {
    var str = emailMatchValue.toString().split("@");
    var strLen = str[0].length;
    var len = strLen < 6 ? "1" : "2";
    MaskingData = preMaskingData
      .toString()
      .replace(new RegExp(".(?=.{0," + len + "}@)", "gi"), "*");
  }
  return MaskingData;
};

//비밀번호 8~20자 숫자, 영문, 특수기호
export const passwordChecking = (value: string) => {
  var passwordRole =
    /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
  if (!passwordRole.test(value)) {
    return false; //비밀번호 규칙에 부합하지 않음
  }
  return true;
};
