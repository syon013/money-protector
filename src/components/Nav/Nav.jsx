import { Link, useNavigate } from 'react-router-dom';
import IconButton from '../IconButton/IconButton';

/** Nav Component 입니다.
 * 1. Nav는 Header에서 사용되며, Nav를 Open/Close 합니다.
 * 2. Nav는 ESC 키를 누르면 Close 됩니다.
 * 3. Nav는 외부를 클릭하면 Close 됩니다.
 * 4. props로 onClose, className, navOpen을 받습니다.
 */
const Nav = ({ onClose, className, navOpen }) => {
  const isLogin = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <div
        className={`${
          navOpen ? 'w-full' : 'w-0'
        } fixed inset-0 z-20 bg-grayscaleH opacity-60`}
        onClick={onClose}
      />

      <section
        className={`${
          className ? className : ''
        } fixed right-0 top-0 z-30 h-screen translate-x-0 transform overflow-y-auto overflow-x-hidden bg-[#FBF5F0] transition-all duration-500 ease-in-out `}
      >
        <nav className={`relative h-full w-full sm:px-20 md:px-28 lg:px-32`}>
          <IconButton
            shape="close"
            className="absolute right-5 top-5"
            onClick={onClose}
          />

          {isLogin ? (
            <>
              <div className="flex items-center justify-center py-16 text-grayscaleH">
                <button
                  to="/"
                  className="relative px-5 text-20px font-bold text-grayscaleH after:absolute after:right-0 after:top-1 after:h-6 after:w-[1px] after:bg-grayscaleD after:opacity-50 after:content-[''] hover:text-primaryColor"
                  onClick={handleLogOut}
                >
                  Logout
                </button>

                <Link
                  to="#"
                  className="px-5 text-20px font-bold text-grayscaleH hover:text-primaryColor"
                  onClick={onClose}
                >
                  MyPage
                </Link>
              </div>

              <div className="flex items-center justify-center text-16px text-primaryColor">
                <span className="border-b pt-0 text-16px">
                  회원님 반갑습니다!
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center py-16 text-grayscaleH">
                <Link
                  to="/login"
                  className="relative px-5 text-20px font-bold text-grayscaleH after:absolute after:right-0 after:top-1 after:h-6 after:w-[1px] after:bg-grayscaleD after:opacity-50 after:content-[''] hover:text-primaryColor"
                  onClick={onClose}
                >
                  Login
                </Link>

                <Link
                  to="/join"
                  className="px-5 text-20px font-bold text-grayscaleH hover:text-primaryColor"
                  onClick={onClose}
                >
                  Join
                </Link>
              </div>

              <div className="flex items-center justify-center text-16px text-secondaryColor">
                <span className="border-b pt-0 text-16px">
                  로그인 해주세요.
                </span>
              </div>
            </>
          )}

          <div className="pt-12">
            <ul className="flex h-full flex-col items-center justify-center ">
              <li className="text-center text-16px text-secondaryColor sm:text-0px">
                링크 이동과 관련된 내용은
                <br /> 모바일 버전에서만 <br />
                확인 가능합니다.
              </li>
              <li className="flex w-full items-center justify-center py-7">
                <Link
                  to="/accountbook"
                  className="text-24px font-bold text-grayscaleH delay-200 hover:animate-bounce hover:text-primaryColor md:hidden lg:hidden"
                  onClick={onClose}
                >
                  가계부
                </Link>
              </li>

              <li className="flex w-full items-center justify-center py-7">
                <Link
                  to="/calender"
                  className="text-24px font-bold text-grayscaleH hover:animate-bounce hover:text-primaryColor md:hidden lg:hidden"
                  onClick={onClose}
                >
                  캘린더
                </Link>
              </li>

              <li className="flex w-full items-center justify-center py-7">
                <Link
                  to="/statistics"
                  className="text-24px font-bold text-grayscaleH hover:animate-bounce hover:text-primaryColor md:hidden lg:hidden"
                  onClick={onClose}
                >
                  차트
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Nav;
