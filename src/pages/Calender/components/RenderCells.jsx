import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isSaturday,
  isSunday,
  isWeekend,
  startOfMonth,
  startOfWeek,
  toDate,
} from 'date-fns';
import React from 'react';

/**
 * 선택된 월에 대한 일자를 렌더링 해주는 컴포넌트 입니다.
 * @param {currentMonth} currentMonth 현재 월을 표시합니다.
 * @param {selectData} selectData 선택된 날짜의 데이터를 표시합니다.
 * @param {onDateClick} onDateClick 날짜를 클릭했을 때, 이벤트를 발생시킵니다.
 * @returns
 */
const RenderCells = ({ currentMonth, selectedDate, onDateClick, data }) => {
  /** 오늘이 속한 달의 시작일을 monthStart라는 변수에 저장합니다.
   * EX) 2023년 6월 1일이 June, 2023일 경우 2023년 6월 1일이 일요일이므로 2023년 6월 1일이 monthStart가 됩니다.
   */
  const monthStart = startOfMonth(currentMonth);
  /** 오늘이 속한 달의 마지막일을 monthEnd라는 변수에 저장합니다.
   * EX) 2023년 6월 1일이 June, 2023일 경우 2023년 6월 30일이 일요일이므로 2023년 6월 30일이 monthEnd가 됩니다.
   */
  const monthEnd = endOfMonth(monthStart);
  /** monthStart가 속한 주의 시작일을 변수에 저장합니다.
   * EX) 2023년 6월 1일이 일요일이므로 2023년 5월 30일이 monthStart가 됩니다.
   */
  const startDate = startOfWeek(monthStart);
  /** monthEnd가 속한 주의 마지막일을 변수에 저장합니다.
   * EX) 2023년 6월 30일이 일요일이므로 2023년 7월 6일이 monthEnd가 됩니다.
   */
  const endDate = endOfWeek(monthEnd);

  const rows = [];
  let days = [];
  let day = startDate;
  let formattedData = '';

  /** startDate가 endDate보다 작거나 같을 경우 반복문을 실행합니다.
   * day가 해당 월의 마지막 날짜인 endDate보다 작거나 같을 경우 반복문을 실행합니다.
   * 루프는 1주일(7일)을 기준으로 실행됩니다.
   */
  while (day <= endDate) {
    /** 1. startDate가 속한 주의 시작일이 일요일인 경우 반복문을 실행합니다.
     * 1-1. days 배열에 startDate의 날짜를 push 합니다.
     * 1-2. startDate의 날짜를 1일 증가시킵니다.
     * 1-3. startDate가 속한 주의 시작일이 일요일이 아닌 경우 반복문을 실행합니다.
     * 2. format 함수를 사용해서 현재 날짜인 'day'를 문자열로 형식화 합니다.
     * 2-1. div 태그에 현재 날짜를 표시합니다.
     * 2-2. isSameMonth 함수를 사용해서 현재 날짜가 선택된 월에 속하는지 확인합니다.
     * 2-3. isSameDay 함수를 사용해서 현재 날짜가 선택된 날짜인지 확인합니다.
     * 3. onDateClick 함수를 사용해서 날짜를 클릭했을 때, 이벤트를 발생시킵니다.
     * 4. format 함수로 변환해둔 날짜를 인자로 넘겨줍니다.
     * 5. for문이 한 바퀴 돌 때마다 addDays 함수를 사용해서 day를 1일 증가시킵니다.
     * 6. rows 배열에 days 배열을 push 합니다.
     */
    for (let i = 0; i < 7; i++) {
      /** format 함수를 사용해서 현재 날짜인 day를 문자열로 형식화 해줍니다. */
      formattedData = format(day, 'd');
      /** startDate가 담긴 day를 cloneDay 변수에 다시 담아줍니다. */
      const cloneDay = day;
      /** format 함수를 사용해서 현재 날짜인 day를 문자열로 형식화 해줍니다.
       * dateKey는 문자열로 형식화된 날짜를 key 값으로 가지는 data 객체의 속성을 찾습니다.
       * props로 넘어온 date 객체에서 해당 날짜의 데이터를 찾는 변수입니다.
       */
      const dateKey = format(day, 'yyyy-MM-dd');
      /** data 객체에서 해당 날짜의 데이터를 찾습니다. */
      const dateDataArray = data?.filter(date => date.date === dateKey);
      /** activeTab이 수입인 데이터 중 incomePrice 값을 모두 더합니다.
       * 1. reduce 함수를 사용해서 배열의 모든 값을 더합니다.
       * 2. cur.activeTab이 수입인 경우 acc에 cur.incomePrice를 더합니다.
       * 3. acc는 누적값, cur는 현재값을 의미합니다.
       * 4. 초기값은 0입니다.
       */
      const totalIncomePrice = dateDataArray?.reduce((acc, cur) => {
        return cur.activeTab === '수입' ? acc + cur.incomePrice : acc;
      }, 0);
      /** activeTab이 지출인 데이터 중 expenditurePrice 값을 모두 더합니다.
       * 1. reduce 함수를 사용해서 배열의 모든 값을 더합니다.
       * 2. cur.activeTab이 지출인 경우 acc에 cur.expenditurePrice를 더합니다.
       */
      const totalExpenditurePrice = dateDataArray?.reduce((acc, cur) => {
        return cur.activeTab === '지출' ? acc + cur.expenditurePrice : acc;
      }, 0);

      /** isWeekend 함수를 사용해서 현재 날짜가 일요일인지 확인합니다. */
      const isSundayDate = isSunday(day);
      /** isSaturday 함수를 사용해서 현재 날짜가 토요일인지 확인 합니다. */
      const isSaturdayDate = isSaturday(day);

      days.push(
        <div
          className={`shadow-calender m-1 flex w-full cursor-pointer flex-col items-center gap-2 pt-7 hover:bg-grayscaleC sm:h-32 sm:text-10px md:h-36 lg:h-40
          ${
            isSaturdayDate && isSameMonth(day, monthStart)
              ? 'text-primaryColor'
              : ''
          }
          ${
            isSundayDate && isSameMonth(day, monthStart)
              ? 'text-secondaryColor'
              : ''
          }
          ${isSameDay(day, selectedDate) ? 'text-tertiaryColor' : ''}
          ${
            isSameMonth(day, monthStart)
              ? 'text-grayscaleH'
              : 'bg-grayscaleC bg-opacity-50 text-grayscaleC'
          }`}
          key={day}
          onClick={() => onDateClick(toDate(cloneDay))}
        >
          <span className="sm:text-14px md:text-20px lg:text-20px">
            {formattedData}
          </span>

          <>
            {totalIncomePrice > 0 && (
              <span className="ellipsis bg-opacity-80 text-center font-RubikRegular font-bold text-primaryColor sm:w-10">
                +{totalIncomePrice.toLocaleString('ko-KR')}원
              </span>
            )}
            {totalExpenditurePrice > 0 && (
              <span className="ellipsis bg-opacity-80 text-center font-RubikRegular font-bold text-secondaryColor sm:w-10">
                -{totalExpenditurePrice.toLocaleString('ko-KR')}원
              </span>
            )}
          </>
        </div>,
      );
      day = addDays(day, 1);
    }
    /** 2. days 배열에 저장된 요일을 rows 배열에 push 합니다. */
    rows.push(
      <div className="flex h-1/5 w-full justify-around " key={day}>
        {days}
      </div>,
    );
    /** 3. days 배열을 초기화 합니다. */
    days = [];
  }

  return <div className="h-full w-full ">{rows}</div>;
};

export default RenderCells;
