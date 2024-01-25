import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

const Gateway = ({ isLogin }) => {
  /** useNavigate를  navigate변수에 정읩합니다.*/
  const navigate = useNavigate();

  /**로그인 상태라면 가계부 페이지로 이동합니다. */
  useEffect(() => {
    if (isLogin) {
      navigate('/accountbook');
    }
  }, []);

  return (
    <section className="flex h-screen w-screen items-center justify-center bg-[#fbf5f0]">
      <div
        className={`${
          isLogin ? 'mt-[100px]' : 'mt-0'
        } absolute inset-0 aspect-video h-full w-full bg-cover bg-no-repeat sm:bg-[url("../money-protector/images/gateway/gate_main_sm.jpg")] md:bg-[url("../money-protector/images/gateway/gate_main_md.jpg")] lg:bg-[url("../money-protector/images/gateway/gate_main_lg.jpg")] lg:bg-right`}
      />

      <main className="relative flex h-full w-full flex-col items-center">
        <div className="absolute left-1/2 top-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-lg bg-opacity-50 ">
          <div className="flex flex-col">
            <h2 className="flex h-full w-full justify-center">
              <img
                src="../money-protector/images/mainLogo.png"
                alt="logo"
                className="aspect-auto h-auto w-3/5"
              />
            </h2>

            <span className="align-center pt-10 text-center sm:text-16px md:text-20px  lg:text-30px">
              당신의 지갑은 안녕하신가요? 👋
            </span>

            <span className="text-gray-800 align-center w-full text-center sm:pt-2 sm:text-14px md:pt-3 md:text-16px  lg:pt-5 lg:text-20px">
              저희 『지갑지켜!』 에서 당신의 지갑을 지켜드립니다.
            </span>
          </div>

          <div className="shadow-drop mt-20 flex w-52 items-center justify-center rounded shadow-grayscaleD hover:shadow-primaryColor">
            <Button
              className="hover:bg-grayscaleD"
              size="lg"
              text="바로가기"
              onClick={() => {
                navigate('/login');
              }}
            />
          </div>
        </div>
      </main>
    </section>
  );
};

export default Gateway;
