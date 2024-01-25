import { format } from 'date-fns';
import React, { useEffect } from 'react';
import IconButton from '../../../components/IconButton/IconButton';

/**
 * 달력의 헤더를 렌더링 해주는 컴포넌트 입니다.
 * 오늘 날의 월과 년도를 표시하고, 이전 달, 다음 달로 이동할 수 있습니다.
 * @param {currentMonth} currentMonth 현재 월을 표시합니다.
 * @param {prevMonth} prevMonth 이전 달로 이동합니다.
 * @param {nextMonth} nextMonth 다음 달로 이동합니다.
 * @returns
 */
const RenderHeader = ({ currentMonth, prevMonth, nextMonth }) => {
  return (
    <section className="flex items-center justify-center">
      <div className="flex w-full items-center justify-center">
        <IconButton shape="left" onClick={prevMonth} />

        <h2 className="pl-10 text-center sm:text-20px md:text-24px lg:text-30px">
          {format(currentMonth, 'M')}월
        </h2>

        <span className="pr-10 align-bottom sm:text-12px md:text-14px lg:text-16px">
          {format(currentMonth, 'yyyy')}
        </span>

        <IconButton shape="right" onClick={nextMonth} />
      </div>
    </section>
  );
};

export default RenderHeader;
