import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { cert_test, basic_test } from '../../API/TEST_API';

//아이디는 특수문자 미포함 영문+숫자 조합 최소 6자리이상 15자리이하인지를 확인하는 정규식입니다.
const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6,15}$/;
//패스워드 영문+숫자+특수문자 포함되어야하고 최소 10자리이상 20자리미만을 체크하는 정규식입니다.
const passwordRegex =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{10,20}$/;
//이메일 형식을 확인하는 정규식입니다.
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//닉네임을 확인하는 정규식입니다. 2글자이상 10글자미만 특수문자는 안됩니다.
const nicknameRegex = /^[a-zA-Z0-9가-힣]{4,10}$/;

const Join = () => {
  /**유저의 가입에 필요한 값들을 useState를 정의합니다.*/
  const [userJoinInfo, setUserJoinInfo] = useState({
    email: '',
    CertificationNum: null,
    CertificationCheck: false,
    id: '',
    nickname: '',
    password: '',
    verifyPassword: '',
  });

  //userJoinInfo 구조분해 할당
  const { email, id, password, nickname } = userJoinInfo;
  //유효성검사를 각 변수의 정의합니다.
  const isValidEmail = emailRegex.test(email);
  const isValidPassWord = passwordRegex.test(password);
  const isValidId = idRegex.test(id);
  const isValidNickname = nicknameRegex.test(nickname);

  /** 아이디 에러케이스를 저장하는 useState를 정의합니다.*/
  const [errorCase, setErrorCase] = useState('');

  /**
   * 이메일에 보낸 인증번호를 저장하는 useState를 정의합니다.
   * 서버에서 보내주었다 가정하고 테스트를 하기위해 서버에서 보내준 인증번호와 같은지 비교하기위해
   * testCertificationNum(서버에서보내는 인증번호라고 가정한다.) 값에 정의합니다.
   */
  const [testCertificationNum, setTestCertificationNum] = useState(null);
  //이메일을 보낼수없어 콘솔창에 인증번호를 대체합니다.
  console.log(testCertificationNum);

  /**
   * useNavigate()를 navigate 변수에 담습니다.
   */
  const navigate = useNavigate();

  /**
   * 0.인풋에 대한 포커스 및 변경 이벤트를 처리합니다.
   *   인풋이 포커스를 얻을 때 상태를 setErrorCase를 초기화로 재설정합니다.
   * //onClick 이벤트 핸들러 에서는 else 조건만 실행됩니다.
   * 1.input에 onChange 이벤트가 발생할때마다 실행되는 함수입니다.
   * 2.input onChange event를 인자로 받습니다.
   * 3.name , value 구조분해 할당을 합니다.
   * 4.setUserJoinInfo( userJoinInfo 값을 스프레드 오퍼레이터(연산자)로 복사하여)
   * 이벤트에 발생한 input name과 일치하는 키에 input에서 발생한 이벤트에 value 값을
   * setUserJoinInfo() 실행시켜 값을 변경해줍니다.
   */
  const saveUserJoinInfo = event => {
    const { name, value } = event.target;
    // 인풋이 포커스를 얻을 때 상태를 true로 재설정합니다.
    if (event.type === 'focus') {
      setErrorCase('');
    } else {
      setUserJoinInfo({ ...userJoinInfo, [name]: value });
    }
  };

  /** 인증번호발송 버튼클릭시 실행되는 함수입니다.
   * 1.이메일형식을 유효성검사를 합니다.
   * 2.통과가 된다면 setTestCertificationNum(인증번호)를 정의합니다.
   * 3.CertificationCheck(false)로 변경합니다. 3번로직은 인증절차가 끝났는데
   * 한번더 발송버튼을 클릭했을때 다시 인증절차를 하기만들기위해 추가한 로직입니다.
   */
  const CertificationNumRequest = () => {
    const { email } = userJoinInfo;
    if (!email.length || !isValidEmail) {
      alert('Email 형식이 올바르지 않습니다.');
    } else {
      cert_test(200) //프로미스를 활용한  api입니다. 인자로 원하는 상태값을 넘겨주면됩니다.
        .then(res => {
          alert('Email로 인증번호가 발송되었습니다.');
          setTestCertificationNum(res.number);
          //인증을 하고 인증번호발송 버튼을 또누르게되면 인증번호 체크유무를 유(true)에서 무(false)로 만들기 위해 추가한 로직입니다.
          setUserJoinInfo({ ...userJoinInfo, CertificationCheck: false });
        })
        .catch(error => {
          setErrorCase(error);
        });
    }
  };

  /**
   * 인증번호확인 버튼클릭시 실행되는 함수입니다.
   * 1.테스트로 보내온 인증번호랑 사용자가 입력한 인증번호를 비교합니다.
   * 2.동일하다면 성공 알림창을 띄우고 CertificationCheck 값을 (유)true로 변경해줍니다.
   * 3.인증번호가 5자리 또는 6자리가 아니거나,테스트 api에서 보내온 인증번호랑 사용자가 입력한 인증번호가 다르면
   * 상황에 맞는 경고알림창을 실행합니다.
   */
  const certificationCheckBtn = () => {
    const { CertificationNum, email } = userJoinInfo;
    if (Number(CertificationNum) === testCertificationNum) {
      setUserJoinInfo({ ...userJoinInfo, CertificationCheck: true });
      alert('인증이 확인되었습니다.');
    } else if (!email.length || !isValidEmail) {
      alert('이메일을 입력하고 인증번호 발송을 하세요.');
    } else if (CertificationNum.length < 5 || CertificationNum.length > 6) {
      alert('인증번호는 5자리 또는 6자리 입니다.');
    } else {
      alert('인증번호가 틀립니다.');
    }
  };

  /**회원가입 버튼 클릭시 실행되는 함수입니다.
   * 1.조건에 맞는지 벨리데이션을 확인합니다.
   * 2.조건에 통과한다면 회원가입완료후 로그인페이지로 이동합니다.
   * 3.프로미스객체를 활용한 테스트 api를 사용했습니다.
   */
  const singUpRequest = event => {
    const { CertificationCheck, verifyPassword, password } = userJoinInfo;
    event.preventDefault();
    if (!isValidEmail) {
      alert('Email을 확인해주세요.');
    } else if (!CertificationCheck) {
      alert('Email 인증을 해주세요.');
    } else if (!isValidId) {
      alert('ID는 영문+숫자 6자리이상 15자리미만 이어야합니다.');
    } else if (!isValidNickname) {
      alert('닉네임은 4글자이상 10글자미만 특수문자는 포함하면 안됩니다.');
    } else if (password !== verifyPassword) {
      alert('비밀번호가 서로 다릅니다.');
    } else if (!isValidPassWord) {
      alert(
        '비밀번호는 영문+숫자+특수문자 10자리이상 20자리미만 이어야합니다.',
      );
    } else {
      basic_test(200)
        .then(res => {
          if (res.status === 200) {
            alert('회원가입이 완료되었습니다.');
            navigate('/login');
          }
        })
        .catch(error => {
          setErrorCase(error);
        });
    }
  };

  /** 실제 통신 axios request를 정의합니다.*/
  // const requestJoinPost = async event => {
  //   event.preventDefault();
  //   const params = userJoinInfo;
  //   try {
  //     const response = await customAxios.post(API.JOIN, params);
  //     if (response.status === 200) {
  //       alert('회원가입이 완료되었습니다.');
  //       navigate('/login');
  //     } else {
  //       setErrorCase(error);
  //     }
  //   } catch (error) {
  //     setErrorCase(error);
  //   }
  // };

  return (
    <main className="w-2xl flex min-w-80 max-w-2xl flex-col items-center sm:mb-8 sm:mt-8 md:mb-24 md:mt-12 lg:mb-24 lg:mt-24">
      <h2 className="text-30px sm:text-24px">회원가입</h2>

      <section className="flex w-full flex-col justify-center sm:w-80 md:w-96 lg:w-9/12">
        <form className="mt-14">
          <fieldset>
            <legend className="text-0px">회원가입</legend>

            <div className="flex items-center gap-1">
              <Input
                label="이메일"
                size="md"
                placeholder="이메일을 입력해주세요."
                name="email"
                type="email"
                errorMsg="이메일형식을 확인해주세요."
                onChange={saveUserJoinInfo}
                //포커스가 잡히면 실행됩니다.
                onFocus={saveUserJoinInfo}
                status={errorCase.status === 401 ? 'false' : 'true'}
              />

              <div className="h-[44px] w-52 sm:h-[35px] sm:w-40 ">
                <Button
                  size="md"
                  text="인증번호발송"
                  className="h-full"
                  type="button"
                  onClick={CertificationNumRequest}
                  //포커스가 잡히면 실행됩니다.
                  onFocus={saveUserJoinInfo}
                ></Button>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Input
                label="인증번호"
                size="md"
                placeholder="인증번호을 입력해주세요."
                name="CertificationNum"
                type="Number"
                status={errorCase.status === 402 ? 'false' : 'true'}
                errorMsg="인증번호를 확인해주세요."
                //포커스가 잡히면 실행됩니다.
                onFocus={saveUserJoinInfo}
                onChange={saveUserJoinInfo}
              />

              <div className="h-[44px] w-52 sm:h-[35px] sm:w-40 ">
                <Button
                  size="md"
                  text="인증확인"
                  className="h-full"
                  type="button"
                  onClick={certificationCheckBtn}
                ></Button>
              </div>
            </div>

            <Input
              label="아이디"
              size="md"
              placeholder="아이디를 입력해주세요."
              name="id"
              type="text"
              status={errorCase.status === 403 ? 'false' : 'true'}
              errorMsg="아이디를 확인해주세요."
              //포커스가 잡히면 실행됩니다.
              onFocus={saveUserJoinInfo}
              onChange={saveUserJoinInfo}
            />

            <Input
              label="닉네임"
              size="md"
              placeholder="닉네임을 입력해주세요."
              name="nickname"
              type="text"
              status={errorCase.status === 404 ? 'false' : 'true'}
              errorMsg="닉네임을 확인해주세요."
              //포커스가 잡히면 실행됩니다.
              onFocus={saveUserJoinInfo}
              onChange={saveUserJoinInfo}
            />

            <Input
              label="비밀번호"
              size="md"
              placeholder="비밀번호를 입력해주세요."
              name="password"
              type="password"
              status={errorCase.status === 405 ? 'false' : 'true'}
              errorMsg="비밀번호를 확인해주세요."
              //포커스가 잡히면 실행됩니다.
              onFocus={saveUserJoinInfo}
              onChange={saveUserJoinInfo}
            />

            <Input
              label="비밀번호 확인"
              size="md"
              placeholder="비밀번호 확인을 입력해주세요."
              name="verifyPassword"
              type="password"
              status={errorCase.status === 405 ? 'false' : 'true'}
              errorMsg="비밀번호를 확인해주세요."
              //포커스가 잡히면 실행됩니다.
              onFocus={saveUserJoinInfo}
              onChange={saveUserJoinInfo}
            />

            <Button
              text="가입하기"
              size="md"
              type="submit"
              className="mt-6"
              onClick={singUpRequest}
            />
          </fieldset>
        </form>
      </section>

      <Link
        to="/login"
        className="mt-16 animate-bounce text-grayscaleD hover:text-grayscaleH"
      >
        지갑지켜 계정이 있으신가요?
      </Link>
    </main>
  );
};

export default Join;
