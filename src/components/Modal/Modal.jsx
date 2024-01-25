import React, { useEffect, useState } from 'react';
import IconButton from '../IconButton/IconButton';

const Modal = ({
  isCloseBtn,
  title,
  content,
  size,
  isModalOpen,
  setIsModalOpen,
  ...props
}) => {
  /** Modal이 Open 상태면 body의 scroll을 숨깁니다. */
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    /** esc키가 눌리면 close 함수 실행 */
    const close = e => {
      if (e.keyCode === 27) {
        setIsModalOpen(false);
      }
    };

    /** key 이벤트를 감지하여 close 함수를 실행함. */
    window.addEventListener('keydown', close);

    /** 메모리 누수 방지를 위하여 함수 실행 후 해당 이벤트 삭제 */
    return () => {
      window.removeEventListener('keydown', close);
    };
  }, []);

  /** Modal을 Open/Close 합니다. */
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <>
      {isModalOpen && (
        <section className="z-20 h-full w-full" {...props}>
          <div
            className="fixed inset-0 h-full w-full bg-grayscaleH opacity-60"
            onClick={handleModalToggle}
          />
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div
              className={`${
                SIZE[size] || SIZE_DATA.md
              } fixed left-2/4 top-2/4 z-20 -translate-x-2/4 -translate-y-2/4 bg-grayscaleA`}
            >
              {isCloseBtn && (
                <IconButton
                  shape="close"
                  className={`absolute right-5 top-3`}
                  onClick={handleModalToggle}
                />
              )}
              <div className="mt-4 flex h-full w-full flex-col items-center justify-center">
                <h3 className="w-full border-b border-grayscaleC text-center text-24px font-bold text-grayscaleH">
                  {title}
                </h3>
                <div className="h-full w-full p-5">{content}</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Modal;

const SIZE = {
  sm: 'lg:w-[500px] md:w-[400px] sm:w-full h-1/2 text-12px',
  md: 'lg:w-[550px] md:w-[450px] sm:w-full h-3/4 text-14px',
  lg: 'lg:w-[600px] md:w-[500px] sm:w-full h-5/6  text-16px',
};
