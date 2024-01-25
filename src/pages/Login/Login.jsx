import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Button from '../../components/Button/Button';
import Checkbox from '../../components/Checkbox/Checkbox';
import Input from '../../components/Input/Input';
import IconButton from '../../components/IconButton/IconButton';
import { basic_test } from '../../API/TEST_API';

/** input에 있는 눈모양 아이콘버튼 이미지반전을 위한 useState값을 정의합니다. */
const Login = () => {
  const [eyeToggle, setEyeToggle] = useState(false);

  /**아이디 저장 유무를 상태를 저장하는 useState를 정의합니다.*/
  const [isRemember, setIsRemember] = useState(false);

  /**아이디 에러케이스를 저장하는 useState를 정의합니다.*/
  const [errorCase, setErrorCase] = useState('');

  /** input에 있는 눈모양 아이콘버튼 이미지반전을 위한 토글함수를 정의합니다. */
  const eyeClickToggle = () => {
    setEyeToggle(!eyeToggle);
  };

  /**
   * 1.유저의 로그인에 필요한 정보를 저장하는 useState를 정의합니다.
   * 2.여러개의 값을 저장하기위해 객체형태로 초기값을 정의했습니다.
   */
  const [userLoginInfo, setUserLoginInfo] = useState({
    id: 'AdminId123',
    password: 'AdminId123!',
  });

  /**
   * 1.useCookies구성은?
   * cookies= 객체형태입니다. cookies={key ,value} 구성됩니다.
   * setCookie=cookies의 객체값에 접근해 변경하는 세터함수입니다. setCookie(key , 수정할 value) 형태로 필요합니다.
   * removeCookie내로컬 쿠키에 값을 지우는 세터함수입니다. removeCookie(key) 형태로 사용합니다.
   * 위 3가지로 useCookies 구성되어있습니다.
   * 2.내 쿠키에 cookies객체에 접근할 key 값은 rememberUserId 로 정의합니다.
   */
  const [cookies, setCookie, removeCookie] = useCookies(['rememberUserId']);

  /**
   * useNavigate()를 navigate 변수에 담습니다.
   */
  const navigate = useNavigate();

  /**
   * 1.useEffect 실행됩니다.
   * 2.cookies 객체 rememberUserId키값으로 접근해 쿠키에 값이 있는지 없는지를 확인합니다.
   * 3.값이 있다면 setUserLoginInfo(스프레드 오퍼레이터(연산자)로 복사하여) id:cookies.rememberUserId 값을 저장합니다.
   * 4.setIsRemember() 실행해 isRemember값을 true 변경합니다.
   * 5.메인 페이지로 네비게이트 해줍니다.
   * 값이 없다면
   *.1.cookies 객체 rememberUserId키값으로 접근해 쿠키에 값이 undefined 종료입니다.
   */
  useEffect(() => {
    if (cookies.rememberUserId !== undefined) {
      setUserLoginInfo({ ...userLoginInfo, id: cookies.rememberUserId });
      setIsRemember(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 0.인풋에 대한 포커스 및 변경 이벤트를 처리합니다.
   *   인풋이 포커스를 얻을 때 상태를 setErrorCase를 초기화로 재설정합니다.
   * //onClick 이벤트 핸들러 에서는 else 조건만 실행됩니다.
   * 1.input에 onChange 이벤트가 발생할때마다 실행되는 함수입니다.
   * 2.input onChange event를 인자로 받습니다.
   * 3.name , value 구조분해 할당을 합니다.
   * 4.setUserLoginInfo( userLoginInfo 값을 스프레드 오퍼레이터(연산자)로 복사하여)
   * 이벤트에 발생한 input name과 일치하는 키에 input에서 발생한 이벤트에 value 값을
   * setUserLoginInfo() 실행시켜 값을 변경해줍니다.
   */
  const saveUserLoginInfo = event => {
    const { name, value } = event.target;
    // 인풋이 포커스를 얻을 때 상태를 true로 재설정합니다.
    if (event.type === 'focus') {
      setErrorCase('');
    } else {
      setUserLoginInfo({ ...userLoginInfo, [name]: value });
    }
  };

  /** 회원가입 페이지로 네비게이트 해주는 함수입니다. */
  const goJoinPage = () => {
    navigate('/join');
  };

  /**
     로그인버튼 클릭시 실행되는 함수입니다.
   1.버튼 submit 기본속성을 제한합니다.
   2.requestLoginPost 함수를 실행합니다. 
   */
  const handleSubmitBtnClick = event => {
    event.preventDefault();
    requestLoginPost();
  };

  /** 테스트 통신 axios request를 정의합니다.
   * 1.input에 값이 없다면 경고창을 띄웁니다.
   * 2.isRemember 값이 true(아이디저장유무)이면 setCookie에 rememberUserId(키) userLoginInfo.id(값)을 저장합니다.
   *   만약 isRemember(아이디저장유무) false라면 setCookie 저장된값을 삭제해줍니다.
   * 3.accessToken을 로컬스토리지에 저장한다음/네비게이트를 해줍니다./그후 리로딩해줍니다.
   * 그외 에러케이스를 처리합니다.(에러케이스를 useState 저장후 에러케스르상태에따라 input 스타일이 변화됩니다.)
   */
  const requestLoginPost = () => {
    if (!userLoginInfo.password.length && !userLoginInfo.id.length) {
      alert('아이디 비밀번호를 입력해주세요.');
    } else {
      basic_test(200) //테스트용 api입니다. 인자로 원하는 상태값을 넘겨주면됩니다.
        .then(res => {
          if (isRemember) {
            setCookie('rememberUserId', userLoginInfo.id);
          } else {
            removeCookie('rememberUserId');
          }
          localStorage.setItem('accessToken', res.token);
          navigate('/accountbook');
          window.location.reload();
        })
        .catch(error => {
          alert('아이디 또는 비밀번호가 틀립니다.');
          setErrorCase(error);
        });
    }
  };

  /** 실제 통신 axios request를 정의합니다.*/
  // const requestLoginPost = async () => {
  // const params = userLoginInfo
  //   try {
  //     const response = await customAxios.post(API.LOGIN , params);
  //     if (isRemember) {
  //       setCookie('rememberUserId', userLoginInfo.id);
  //     } else {
  //       removeCookie('rememberUserId');
  //     }
  //     localStorage.setItem('accessToken', response.token);
  //     navigate('/');
  //     window.location.reload();
  //   } catch (error) {
  //     alert('아이디 또는 비밀번호가 틀립니다.');
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //     setErrorCase(error);
  //   }
  // };

  return (
    <main className="w-2xl flex min-w-80 max-w-2xl flex-col items-center sm:mt-28  md:mt-32 lg:mt-44">
      <h2 className="text-30px sm:text-24px">로그인</h2>

      <section className="flex w-full flex-col justify-center sm:w-80 md:w-96 lg:w-9/12">
        <form className="mt-14" onSubmit={handleSubmitBtnClick}>
          <fieldset>
            <legend className="text-0px">회원로그인</legend>

            <Input
              label="아이디"
              size="md"
              placeholder="아이디를 입력해주세요."
              name="id"
              value={userLoginInfo.id}
              type="text"
              errorMsg="아이디를 확인해주세요."
              onChange={saveUserLoginInfo}
              //포커스가 잡히면 실행됩니다.
              onFocus={saveUserLoginInfo}
              status={errorCase.status === 400 ? 'false' : 'true'}
            />

            <div className="relative">
              <Input
                label="비밀번호"
                size="md"
                placeholder="비밀번호를 입력해주세요."
                name="password"
                value={userLoginInfo.password}
                //패스워드를 보여줄지말지 토글합니다.
                type={eyeToggle === false ? 'password' : 'text'}
                errorMsg="비밀번호를 확인해주세요."
                onChange={saveUserLoginInfo}
                //포커스가 잡히면 실행됩니다.
                onFocus={saveUserLoginInfo}
                status={errorCase.status === 401 ? 'false' : 'true'}
              />
              <IconButton
                //패스워드 이미지를 보여줄지 결정하는 반전 아이콘 버튼입니다.
                shape={eyeToggle === false ? 'eye' : 'eyeSlash'}
                position="absolute right-3 top-8 sm:right-2 sm:top-7"
                onClick={eyeClickToggle}
              />
            </div>

            <div className="mb-6 flex gap-2 sm:w-80 md:w-96 lg:w-9/12">
              <Checkbox
                label="아이디 저장"
                onChange={e => {
                  setIsRemember(e.target.checked);
                }}
                checked={isRemember}
              />
            </div>

            <Button
              text="로그인"
              size="md"
              type="submit"
              onClick={handleSubmitBtnClick}
            />
          </fieldset>
        </form>
      </section>

      <section className="mt-10 flex items-center justify-center sm:w-80 md:w-96 lg:w-9/12">
        <Link className="relative px-5 font-bold text-grayscaleH after:absolute after:right-0 after:top-1 after:h-3 after:w-[1px] after:bg-grayscaleD after:opacity-50 after:content-[''] hover:text-primaryColor sm:text-12px">
          아이디 찾기
        </Link>

        <Link className="px-5 hover:text-primaryColor sm:text-12px">
          비밀번호 찾기
        </Link>
      </section>

      <section className="mt-14 flex flex-col items-center justify-center gap-5 sm:w-80 md:mb-24 md:w-96 lg:mb-20 lg:w-9/12">
        <span className="animate-bounce">아직 지갑지켜 회원이 아니신가요?</span>

        <Button
          text="회원가입 바로가기"
          size="md"
          type="button"
          color="black"
          onClick={goJoinPage}
        />
      </section>
    </main>
  );
};

export default Login;
