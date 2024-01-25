import { useCallback, useEffect, useState } from 'react';
import { addMonths, subMonths } from 'date-fns';
import RenderHeader from '../../pages/Calender/components/RenderHeader';

import Tap from '../../components/Tab/Tab';
import AccountBookItem from './components/AccountBookItem';
import { TAP_ACCOUNTBOOK_DATA } from '../../data/TapGroup';
import IconButton from '../../components/IconButton/IconButton';
import {
  getExpenditureTotalMoney,
  getIncomeTotalMoney,
  getAllMoneyData,
  getTotalMoney,
  postMoneyData,
  putMoneyDataById,
  deleteMoneyDataById,
} from '../../API/TEST_API';

import Modal from '../../components/Modal/Modal';
import ExpenseBoxTab from '../../components/Modal/ExpenseBoxTab/ExpenseBoxTab';
import Pagination from '../../components/Pagination/Pagination';

/**모달 타입을 정의합니다. */
const MODAL_TYPE = {
  NEW: {
    title: '수입/지출 입력하기',
  },
  DETAIL: {
    title: '내역 상세보기',
  },
};

/**페이지 네이션에 페이지당 항목수를 정의합니다. */
const pageSize = 5;

const AccountBook = () => {
  /**페이지네이션 현재 페이지를 초기값을 1 로 정의합니다.*/
  const [currentPage, setCurrentPage] = useState(1);

  /**페이지네이션 토탈페이지 개수를 담는 useState정의합니다.*/
  const [totalPages, setTotalPages] = useState(0);

  /**모달타입을 결정지어줄 useState 를 정의합니다.*/
  const [modalType, setModalType] = useState(MODAL_TYPE.NEW);

  /** Tab 컴포넌트에 필요한 useState 를 정의합니다.*/
  const [activeTab, setActiveTab] = useState('통합');

  /** 클릭이벤트로 value값을 받는 클릭함수입니다. Tab 컴포넌트에서 사용합니다.
   *  탭 전환시 페이지네이션에 현재페이지는 1로 변경해줍니다.
   * (새로운 데이터를 불러왔을때 현재페이지가 1이 될수있습니다.)
   */
  const handleTapClick = value => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  /**가계부작성 모달을 토글하는 useState정의합니다.*/
  const [editModalPageToggle, setEditModalPageToggle] = useState(false);

  /**가계부에 그려질 데이터 리스트를 useState정의합니다 */
  const [expenseList, setExpenseList] = useState([]);
  /**가계부리스트중 클릭한 항목을 한개를 useState정의합니다 */
  const [clickedExpense, setClickedExpense] = useState({});

  /**모든 수입 합계금액을 담는 useState정의합니다. */
  const [incomeTotal, setIncomeTotal] = useState(0);
  /**모든 지출 합계금액을 담는 useState정의합니다. */
  const [expenditureTotal, setExpenditureTotal] = useState(0);
  /**모든 수입/지출 합계금액을 담는 useState정의합니다. */
  const [total, setTotal] = useState(0);

  /** 현재 날짜를 useState정의합니다.
   * new Date()메서드는 오늘날짜기준을 나타냅니다.
   */
  const [currentDate, setCurrentDate] = useState(new Date());

  /**
   * 필요한 데이터를 가져옵니다.
   * 1. 모든 수입/지출 데이터
   * 2. 모든 수입 총합 금액
   * 3. 모든 지출 총합 금액
   * 4. 모든 수입+지출 총합 금액
   */
  const getExpenseInfo = useCallback(() => {
    getAllMoneyData(
      currentPage,
      pageSize,
      activeTab,
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
    ).then(response => {
      // 가계부 데이터를 useState에 담아줍니다.
      setExpenseList(response.data);

      // (토탈 항목수에 / 페이지에 보여줄 항목수)를 나누어 토탈페이지 개수를 useState 값을 변경 해줍니다.
      setTotalPages(Math.ceil(response.totalItems / pageSize));
    });

    // 모든 수입 총합 금액을 가져옵니다.
    getIncomeTotalMoney(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
    ).then(data => {
      setIncomeTotal(data.data);
    });

    // 모든 지출 총합 금액을 가져옵니다.
    getExpenditureTotalMoney(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
    ).then(data => {
      setExpenditureTotal(data.data);
    });

    // 모든 수입 - 지출 총합 금액을 가져옵니다.
    getTotalMoney(currentDate.getFullYear(), currentDate.getMonth() + 1).then(
      data => {
        setTotal(data.data);
      },
    );

    //1.페이지네이션에 현재페이지가 변경되었을때
    //2.탭버튼으로 탭화면이 전환되었을때
    //3.날짜 데이터가 변경되었을때
    //4.페이지네이션 보여줄 항목에 데이터가 변경되었을때
    //네가지 상황을 바라보고있습니다.
  }, [currentPage, pageSize, activeTab, currentDate]);

  /**필요한 모든 데이터를 불러오는 useEffect 입니다.
   * 또한
   * currentPage,currentDate,getExpenseInfo 변화에따라서도 실행됩니다.
   */
  useEffect(() => {
    // 필요한 모든 데이터를 가져옵니다.
    getExpenseInfo();
  }, [getExpenseInfo, currentPage, currentDate]);

  /**
   * id에 해당하는 데이터를 삭제합니다.
   * @param {*} id
   * 데이터를 삭제하면 DB에서 삭제된 데이터를 제외한 데이터를 가져옵니다.
   */
  const deleteExpenseData = id => {
    deleteMoneyDataById(id).then(data => {
      data.status === 200 && alert('삭제되었습니다.');
      //모달을 토글해서 close 해줍니다.
      setEditModalPageToggle(false);
      //전체 리스트에 대한 함수를 실행시켜 리스트데이터들을 최신화해줍니다.
      getExpenseInfo();
    });
  };

  /**
   * Modal을 열어줍니다.
   * @param {*} data
   * data가 있으면 DETAIL 모달을, (수정을 위함)
   * data가 없으면 NEW 모달을 엽니다. (새로운 데이터를 추가하기 위함)
   */
  const showExpenseModal = data => {
    //모달에 타입을 결정합니다. 데이터가 있으면 수정/삭제 모달을 없으면 추가생성 모달타입을 생성할것입니다.
    setModalType(data ? MODAL_TYPE.DETAIL : MODAL_TYPE.NEW);
    //클릭한 항목 데이터를 setClickedExpense(클릭한 데이터항목)을 useState에 정의합니다.
    setClickedExpense(data);
    //모달을 토글하여 오픈합니다. 모달의 타입은 155라인 에서 결정됩니다.
    setEditModalPageToggle(true);
  };

  /**
   * 데이터를 저장합니다.
   * @param {*} data
   * data가 있으면 기존 데이터를 수정하고,
   * data가 없으면 새로운 데이터를 추가합니다.
   * 데이터가 저장되면 DB에서 업데이트된 데이터를 가져옵니다.
   * 데이터가 저장되면 모달을 닫습니다.
   */
  const requestSaveData = data => {
    //모달 타입을 확인합니다.
    if (modalType === MODAL_TYPE.NEW) {
      // 새로운 데이터를 업로드합니다.
      postMoneyData(data).then(data => {
        data.status === 200 && alert('저장되었습니다.');
        //전체 데이터를 업데이트합니다.
        getExpenseInfo();
      });
    } else {
      // 기존 데이터를 업데이트합니다.
      putMoneyDataById(data.id, data).then(data => {
        data.status === 200 && alert('수정되었습니다.');
        //전체 데이터를 업데이트합니다.
        getExpenseInfo();
      });
    }
  };

  // 날짜 제어
  /** onClick 시 이전 달로 이동 시키기 위한 함수 입니다.
   * subMonths 함수는 date-fns 라이브러리에서 제공하는 함수로 현재 날짜에서 원하는 달 만큼 빼는 함수 입니다.
   */
  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
    //페이지네이션에 현재페이지는 1로 변경합니다.
    setCurrentPage(1);
  };
  /** onClick 시 다음 달로 이동 시키기 위한 함수 입니다.
   * addMonths 함수는 date-fns 라이브러리에서 제공하는 함수로 현재 날짜에서 원하는 달 만큼 더하는 함수 입니다.
   */
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
    //페이지네이션에 현재페이지는 1로 변경합니다.
    setCurrentPage(1);
  };

  return (
    <main className="relative">
      {/* 194.line ~ 205.line 참고  */}
      <RenderHeader
        currentMonth={currentDate}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />

      <section className="mt-16">
        <Tap
          tapListData={TAP_ACCOUNTBOOK_DATA}
          onClick={handleTapClick}
          activeTab={activeTab}
        />
      </section>

      <section className="mt-8 flex w-full text-center">
        <div className="w-full text-[green] sm:text-11px ">
          {`${total?.toLocaleString('ko-KR')}원`}
        </div>

        <div className="w-full text-[blue] sm:text-11px">
          {`${incomeTotal?.toLocaleString('ko-KR')}원`}
        </div>

        <div className="w-full text-[red] sm:text-11px ">
          {`${expenditureTotal?.toLocaleString('ko-KR')}원`}
        </div>
      </section>

      <section className="mb-32 mt-8 border-collapse">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border-b py-2 text-center sm:text-center md:text-center">
                날짜
              </th>

              <th className="border-b py-2 text-center sm:text-center md:text-center">
                카테고리
              </th>

              <th className="border-b py-2  text-center sm:text-center md:text-center">
                금액
              </th>

              <th className="border-b py-2 text-center">분류</th>
            </tr>
          </thead>

          <tbody>
            {expenseList.map(expense => {
              if (
                (activeTab !== '통합' && activeTab === expense.activeTab) ||
                activeTab == '통합'
              ) {
                return (
                  <AccountBookItem
                    key={expense.id}
                    date={expense.date}
                    income={expense.income}
                    activeTab={expense.activeTab}
                    classificationSrc={expense.classificationSrc}
                    classification={expense.classification}
                    daysOfWeek={expense.daysOfWeek}
                    price={
                      expense.incomePrice
                        ? expense.incomePrice
                        : expense.expenditurePrice
                    }
                    onClick={() => showExpenseModal(expense)}
                  />
                );
              }
            })}
          </tbody>
        </table>

        {expenseList.length === 0 ? (
          <div className="mt-10 flex justify-center text-20px text-grayscaleD">
            <h3>등록된 가계부 내역이 없습니다.</h3>
          </div>
        ) : (
          //페이지네이션에는 props 로 넘겨줄 리스트로는
          //1. 현재페이지 값
          //2. 총 필요한 페이지 개수
          //3. 페이지에 Limit=5 예시 {1 2 3 4 5} 다음 6 7 8 ... // Limit=7 { 1 2 3 4 5 6 7 } 다음 8 9 10 ...
          //4. setCurrentPage() 현재페이지를 변경해줄 set함수가 필요합니다.
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPage={totalPages}
            pageLimit={5} // 이 예에서는 페이지네이션 컨트롤에 5개의 페이지 번호를 표시합니다
          />
        )}

        <IconButton
          className="absolute bottom-2 right-0 transition-all duration-300 hover:rotate-90 hover:scale-110"
          shape="add"
          onClick={() => showExpenseModal()}
        />
      </section>

      {editModalPageToggle && (
        <Modal
          title={modalType.title}
          content={
            <ExpenseBoxTab
              expenseData={clickedExpense}
              saveInputExpenseData={requestSaveData}
              closeTab={() => setEditModalPageToggle(false)}
              cancel={() => setEditModalPageToggle(false)}
              removeExpenseData={
                modalType === MODAL_TYPE.NEW
                  ? null
                  : () => {
                      deleteExpenseData(clickedExpense.id);
                    }
              }
            />
          }
          size="lg"
          isCloseBtn={() => setEditModalPageToggle(false)}
          isModalOpen={editModalPageToggle}
          setIsModalOpen={setEditModalPageToggle}
        />
      )}
    </main>
  );
};

export default AccountBook;
