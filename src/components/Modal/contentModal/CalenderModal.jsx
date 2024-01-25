import React, { useEffect, useState } from 'react';
import ExpenseListTab from '../ExpenseListTab/ExpenseListTab';
import ExpenseBoxTab from '../ExpenseBoxTab/ExpenseBoxTab';

import {
  postMoneyData,
  putMoneyDataById,
  deleteMoneyDataById,
  getMoneyDataListByDate,
} from '../../../API/TEST_API';

const PAGE_TYPE = {
  LIST: 'list',
  BOX: 'box',
};

const MODAL_TYPE = {
  NEW: 'new',
  DETAIL: 'detail',
};

const CalenderModal = ({ selectDate, updateData }) => {
  /**
   * 현재 페이지의 타입을 저장합니다.
   * LIST: 목록 페이지
   * BOX: 추가/수정을 위한 박스 페이지
   */
  const [pageType, setPageType] = useState(PAGE_TYPE.LIST);

  /**
   * 선택한 수입/지출 데이터를 저장합니다.
   */
  const [clickedExpense, setClickedExpense] = useState({});

  /**
   * 수입/지출 데이터를 추가/수정하기 위한 ExpenseBoxTab를 띄웁니다.
   * @param {object} data
   * data가 있으면 수정, 없으면 추가를 의미합니다.
   * data가 있으면 ExpenseBoxTab화면에 데이터를 띄우고, 없으면 빈값으로 뜹니다.
   */
  const showExpenseBoxModal = data => {
    setModalType(data ? MODAL_TYPE.DETAIL : MODAL_TYPE.NEW);
    setClickedExpense(data);
    setPageType(PAGE_TYPE.BOX);
  };

  /**
   * ExpenseBoxTab 컴포넌트를 위한 모달의 타입을 지정합니다.
   * NEW : 새로운 데이터를 추가하는 모달
   * DETAIL : 기존 데이터를 수정하는 모달
   * 타입에 따라서 컴포넌트 내부의 함수나 행위, 텍스트가 달라집니다.
   */
  const [modalType, setModalType] = useState(MODAL_TYPE.NEW);

  /**
   * 현재 날짜에 해당하는 수입/지출 데이터 배열입니다.
   */
  const [expenseList, setExpenseList] = useState([]);
  
  /**
   * 현재 선택된 날짜에 해당하는 데이터를 가져와서
   * expenseList state에 저장합니다.
   */
  const getMoneyDataList = () => {
    getMoneyDataListByDate(
      `${selectDate.year}-${selectDate.month}-${selectDate.day}`,
    ).then(res => {
      setExpenseList(res.data);
    });
  }

  /**
   * 화면이 처음 보여질 때, 선택된 날짜에 해당하는 데이터를 가져옵니다.
   */
  useEffect(() => {
    getMoneyDataList();
  }, []);

  const requestSaveData = data => {
    if (modalType === MODAL_TYPE.NEW) {
      // 새로운 데이터를 업로드합니다.
      postMoneyData(data).then(res => {
        res.status === 200 && alert('저장되었습니다.');
        // 데이터가 업로드면 업로드된 새로운 DB 데이터를 가져옵니다.
        getMoneyDataList();
      });
    } else {
      // 기존 데이터를 업데이트합니다.
      putMoneyDataById(data.id, data).then(res => {
        res.status === 200 && alert('수정되었습니다.');
        // 데이터가 업데이트되면 업데이트된 새로운 DB 데이터를 가져옵니다.
        getMoneyDataList();
      });
    }
    updateData();

  };

  /**
   * 선택한 데이터를 삭제합니다. 
   * 데이터가 삭제되면 새로운 DB 데이터를 가져옵니다.
   */
  const deleteExpenseData = id => {
    deleteMoneyDataById(id).then(data => {
      data.status === 200 && alert('삭제되었습니다.');
      getMoneyDataList();
      updateData();
      //그리고 목록 페이지로 넘어갑니다.
      setPageType(PAGE_TYPE.LIST);
    });
  };



  return (
    <section className="flex flex-col">
      {pageType === PAGE_TYPE.LIST ? (
        <ExpenseListTab
          selectDate={selectDate}
          expenseList={expenseList}
          showExpenseBoxModal={showExpenseBoxModal}
        />
      ) : (
        <ExpenseBoxTab
          expenseData={clickedExpense}
          selectDate={selectDate}
          saveInputExpenseData={requestSaveData}
          closeTab={() => console.log('closeTab')}
          cancel={() => setPageType(PAGE_TYPE.LIST)}
          removeExpenseData={
            modalType === MODAL_TYPE.NEW
              ? null
              : () => {
                  deleteExpenseData(clickedExpense.id);
                }
          }
        />
      )}
    </section>
  );
};

export default CalenderModal;
