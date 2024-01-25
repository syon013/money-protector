import React, { useEffect, useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import RenderHeader from './components/RenderHeader';
import RenderDays from './components/RenderDays';
import RenderCells from './components/RenderCells';
import Portal from '../../components/Portal/Portal';
import Modal from '../../components/Modal/Modal';
import CalenderModal from '../../components/Modal/contentModal/CalenderModal';

import { getAllMoneyData } from '../../API/TEST_API';

/**
 * 캘린더 페이지 입니다.
 * 수입/지출 내역을 확인할 수 있습니다.
 * @returns
 */
const Calender = () => {
  /** 현재 실제 날짜의 데이터를 저장합니다.  */
  const [currentMonth, setCurrentMonth] = useState(new Date());
  /** 선택한 날짜의 데이터를 저장합니다. */
  const [selectedDate, setSelectedDate] = useState(new Date());
  /** Modal의 Open/Close 여부를 저장합니다. */
  const [isModalOpen, setIsModalOpen] = useState(false);
  /** db에 저장된 데이터를 저장합니다. */
  const [calenderData, setCalenderData] = useState([]);
  /** 해당 날짜의 요일을 구하기 위해 해당 배열의 숫자를 표시할 변수를 만들어줍니다.
   * getDay() 함수는 해당 날짜의 요일을 숫자로 반환합니다.
   * EX) 일요일 = 0, 월요일 = 1, 화요일 = 2, 수요일 = 3, 목요일 = 4, 금요일 = 5, 토요일 = 6
   */
  const daysOfWeek = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];

  /** Modal Component에 표시할 날짜 데이터를 변수로 저장합니다. */
  const date = {
    year: selectedDate?.getFullYear(),
    month:
      selectedDate?.getMonth() + 1 < 10
        ? `0${selectedDate?.getMonth() + 1}`
        : selectedDate?.getMonth() + 1,
    day:
      selectedDate?.getDate() < 10
        ? `0${selectedDate?.getDate()}`
        : selectedDate?.getDate(),
    ampm: currentMonth.toLocaleTimeString().slice(0, 2),
    hour: currentMonth?.getHours(),
    minute: currentMonth?.getMinutes(),
    daysOfWeek: daysOfWeek[selectedDate?.getDay()],
  };


  useEffect(() => {
    requestCalenderData();
  }, []);

  /** onClick 시 이전 달로 이동 시키기 위한 함수 입니다.
   * subMonths 함수는 date-fns 라이브러리에서 제공하는 함수로 현재 날짜에서 원하는 달 만큼 빼는 함수 입니다.
   */
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  /** onClick 시 다음 달로 이동 시키기 위한 함수 입니다.
   * addMonths 함수는 date-fns 라이브러리에서 제공하는 함수로 현재 날짜에서 원하는 달 만큼 더하는 함수 입니다.
   */
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  /** onClick 시 선택한 날짜의 데이터를 저장하기 위한 함수 입니다. */
  const onDateClick = day => {
    setSelectedDate(day);
    setIsModalOpen(!isModalOpen);
  };

  /**
   * 달력에 표시할 모든 수입/지출 데이터를 가져오기 위한 함수 입니다.
   * 모든 데이터를 가져와서 날짜에 맞게 표시합니다.
   */
  const requestCalenderData = async () => {
    try {
      const request = await getAllMoneyData();
      setCalenderData(request.data);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 데이테에 변동이 있을 때, DB에서 업데이트된 데이터를 가져오기 위한 함수 입니다.
   * 데이터가 다른 화면(모듈 화면)에서 삽입/수정/삭제 되었을 때, 호출됩니다.
   */
  const updateData = () => {
    requestCalenderData();
  }

  return (
    <main className="pb-24">
      <RenderHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <RenderDays />
      <RenderCells
        currentMonth={currentMonth}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        data={calenderData ? calenderData : null}
      />
      <Portal>
        {isModalOpen && (
          <Modal
            title="내역 상세보기"
            content={<CalenderModal selectDate={date} updateData={updateData} />}
            size="lg"
            isCloseBtn={true}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </Portal>
    </main>
  );
};

export default Calender;
