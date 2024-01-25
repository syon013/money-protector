import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '../IconButton/IconButton';
import Input from '../Input/Input';
import Nav from '../Nav/Nav';

const Header = () => {
  /** 로컬스토리지에 토큰값을 token 변수에 담습니다. */
  const token = localStorage.getItem('accessToken');

  /**
   * useNavigate()를 navigate 이름으로 변수로 지정합니다.
   */
  const navigate = useNavigate();

  /** Nav에 대해서 Open/Close 상태를 저장하기 위한 State입니다. */
  const [navOpen, setNavOpen] = useState(false);

  /** useEffect를 이용해서 keyCode 27번 (ESC)를 감지하고, 해당 키가 눌리면 Nav를 닫습니다. */
  useEffect(() => {
    /** esc키가 눌리면 close 함수 실행 */
    const close = e => {
      if (e.keyCode === 27) {
        setNavOpen(false);
      }
    };

    /** key 이벤트를 감지하여 close 함수를 실행함. */
    window.addEventListener('keydown', close);

    /** 메모리 누수 방지를 위하여 함수 실행 후 해당 이벤트 삭제 */
    return () => {
      window.removeEventListener('keydown', close);
    };
  }, []);

  /** Nav를 Open/Close 합니다. */
  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  /**
   * 1.로그아웃 버튼 클릭시 실행되는 함수입니다.
   * 2.로컬스토리지에 accessToken 값을 삭제합니다.
   * 3.메인페이지로 네비게이트를 해줍니다.
   */
  const handleLoginOut = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="mx-auto my-0 flex h-[100px] w-full max-w-[1200px] items-center justify-between px-5 ">
      <div className="flex items-center justify-between gap-5 md:w-[400px] lg:w-[400px] ">
        <h1 className="sm:hidden">
          <Link to="/accountbook" className="h-[80px] w-[140px]">
            <img
              src="../../money-protector/images/mainLogo.png"
              alt="메인로고 이미지"
            />
          </Link>
        </h1>

        <nav>
          <ul className="flex gap-10 text-20px sm:hidden">
            <li>
              <Link to="/accountbook">가계부</Link>
            </li>

            <li>
              <Link to="/calender">캘린더</Link>
            </li>

            <li>
              <Link to="/statistics">차트</Link>
            </li>
          </ul>
        </nav>
      </div>

      <section className="relative w-[300px] sm:hidden md:hidden">
        <Input placeholder="검색어를 입력하세요." />
        <IconButton shape="reading" className="absolute right-0 top-1" />
      </section>

      <div className="flex items-center gap-6">
        {token ? (
          <button type="button" onClick={handleLoginOut}>
            로그아웃
          </button>
        ) : (
          <Link to={'/login'}>로그인</Link>
        )}

        <IconButton shape="nav" onClick={handleNavToggle} />
      </div>

      <Nav
        onClose={handleNavToggle}
        className={`${navOpen ? 'w-[400px] sm:w-full' : 'w-0'}`}
        navOpen={navOpen}
      />
    </header>
  );
};

export default Header;
