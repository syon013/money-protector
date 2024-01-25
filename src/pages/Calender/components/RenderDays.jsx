import React from 'react';

/**
 * 달력의 요일을 렌더링 해주는 컴포넌트 입니다.
 * @returns
 */
const RenderDays = () => {
  const days = [];
  /** 일주일 간의 요일을 표시하는 데이터를 배열에 넣어줍니다. */
  const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  /** 배열의 길이만큼 for문을 돌리고, days의 빈 배열에 date[i] 값을 push해줍니다. */
  for (let i = 0; i < date.length; i++) {
    days.push(
      <div
        className="flex h-full w-full items-center justify-center sm:text-16px md:text-20px lg:text-24px"
        key={i}
      >
        {date[i]}
      </div>,
    );
  }
  return (
    <div className="flex justify-around sm:py-5 md:py-8 lg:py-10 ">{days}</div>
  );
};

export default RenderDays;
