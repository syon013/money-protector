import React from 'react';
import IconButton from '../IconButton/IconButton';

const Footer = () => {
  return (
    <footer className="h-full w-full bg-grayscaleG">
      <section className="relative z-10 h-full w-full border-b border-grayscaleC  sm:block sm:px-10 sm:py-2 md:block md:px-20 md:py-10 lg:flex lg:flex-wrap lg:items-center lg:justify-between lg:px-20 lg:py-10">
        <div className="flex flex-col font-RubikRegular font-bold text-grayscaleA sm:hidden sm:items-center sm:justify-center">
          <span className="text-16px sm:text-center">
            문의전화
            <strong className="whitespace-nowrap pl-3 text-24px">
              1992-2024
            </strong>
          </span>

          <span className="text-16px sm:text-center">
            그냥전화
            <strong className="whitespace-nowrap pl-3 text-24px">
              1987-1995
            </strong>
          </span>
        </div>

        <div className="whitespace-nowrap sm:hidden">
          <ul className="flex flex-wrap items-center justify-center font-RubikRegular text-12px font-bold text-grayscaleA sm:pt-4 md:pt-5">
            <li className="pr-10 sm:pr-0">개인정보처리방침</li>

            <li className="pr-10 sm:pr-0">홈페이지 이용약관</li>

            <li className="pr-10 sm:pr-0">위치정보 이용약관</li>

            <li className="pr-10 sm:pr-0">서비스 이용약관</li>
          </ul>
        </div>

        <div className="flex items-center justify-center sm:pt-0 md:absolute md:right-10 md:top-16">
          <IconButton shape="instagram" className="pr-16" />
          <IconButton shape="facebook" className="pr-16" />
          <IconButton shape="youtube" className="pr-12" />
        </div>
      </section>
      <address className="flex flex-wrap items-center justify-center whitespace-nowrap px-10 pb-10 pt-10 font-RubikRegular text-12px text-grayscaleA sm:hidden">
        <span className="pr-2">상호명</span>
        <span className="pr-5">(주)지갑지켜!</span>

        <span className="pr-2">대표자</span>
        <span className="pr-5">이청원</span>

        <span className="pr-2">사업자 등록번호</span>
        <span className="pr-5">111-11-11111</span>

        <span className="pr-2">소재지</span>
        <span className="pr-5">
          서울특별시 용산구 한강대로 321, 11층(이쿠동, 이쿠타워)
        </span>

        <span className="pr-2">개인정보 책임자</span>
        <span className="pr-5">박요진</span>

        <span className="pr-2">통신판매업신고</span>
        <span className="pr-5">제2022-서울용산-1711호</span>

        <span className="pr-2">
          Copyright ⓒ 2000~2023 9Brandworks korea. All rights Reserved.
        </span>
      </address>
    </footer>
  );
};

export default Footer;
