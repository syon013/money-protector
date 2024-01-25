import React, { useEffect, useMemo, useState } from 'react';
import Tab from '../../Tab/Tab';
import Button from '../../Button/Button';
import CustomInput from '../contentModal/CustomInput';
import { TAP_DATA } from '../../../data/TapGroup';
import ChipGroup from '../../Chip/ChipGroup';
import INCOME_DATA from '../../../data/IncomeChipData';
import EXPENDITURE_DATA from '../../../data/ExpenditureChipData';
import ASSET_DATA from '../../../data/AssetData';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

/** ExpenseBoxTab 대한 props 리스트 입니다.
 *@property {string} expenseData                      - expenseData 비용(수입,지출)에 대한 데이터를 정의합니다.
 *@property {string} selectDate                       - selectDate 선택된 날짜데이터를 정의합니다.
 *@property {function} saveInputExpenseData           - 수정 / 저장 할수있는 함수를 정의합니다.
 *@property {function} removeExpenseData              - 삭제할수있는 함수를 정의합니다.
 *@property {function} cancel                         - 취소버튼 클릭시 부모에 정의되어있는 useState 값을 변경해주는 set함수를 정의합니다.
 */

/**
 * 현재 이 컴포넌트가
 * 새로운걸 등록하기 위한것인지,
 * 기존 데이터를 수정하기 위한것인지를
 * 구분하기 위한 상수입니다.
 */
const BOX_TYPE = {
  NEW: {
    save: '등록하기',
  },
  DETAIL: {
    save: '수정하기',
  },
};

/**
 * 수입/지출 데이터를 추가/수정하기 위한 ExpenseBoxTab를 띄웁니다.
  expenseData 가 있으면 그 데이터의 필드에 맞게 값이 채워지고,
  아니면 빈값으로 뜹니다.
  하지만 날짜는 expenseData가 없어도 선택한 날짜로 넘어가거나,
  선택한 날짜도 없으면 현재 날짜로 입력됩니다.
 */
const ExpenseBoxTab = ({
  expenseData,
  selectDate,
  saveInputExpenseData,
  removeExpenseData,
  cancel,
}) => {
  /**
   * 수입 <-> 지출 탭을 변경합니다.
   */
  const handleTapClick = value => {
    // 분류를 삭제합니다.
    setInputExpenseData({
      ...inputExpenseData,
      activeTab: value,
      classification: '',
    });
  };

  /**
   * 입력한 날짜를 저장합니다.
   */
  const [inputDate, setInputDate] = useState(new Date());

  /**
   * 수입/지출 데이터입니다. 초기값으로 수입입니다.
   */
  const [inputExpenseData, setInputExpenseData] = useState({
    activeTab: '수입',
    incomePrice: '',
    expenditurePrice: '',
  });

  /**탭 타입을 정의합니다.  */
  const [tabType, setTabType] = useState(BOX_TYPE.NEW);

  useEffect(() => {
    if (expenseData) {
      const copyData = { ...expenseData };
      // 할당된 수입/지출 데이터가 있으면 빈 값을 그 값으로 할당합니다.
      setInputExpenseData(copyData);
      // 기존 데이터를 수정하기 위한 모달이므로 타입을 DETAIL로 변경합니다.
      setTabType(BOX_TYPE.DETAIL);
    }
  }, [expenseData]);

  /**
   * 입력한 값이 유효한지 검사합니다.
   * 유효하면 true, 아니면 false를 반환합니다.
   * 모든 값이 입력되어야 유효합니다.
   */
  const validation = useMemo(() => {
    return (
      (inputExpenseData.incomePrice || inputExpenseData.expenditurePrice) &&
      inputExpenseData.classification &&
      inputExpenseData.asset &&
      inputExpenseData.memo
    );
  }, [inputExpenseData]);

  const save = () => {
    if (validation) {
      // 지출/수입 금액을 0으로 초기화해서 저장합니다.
      if (inputExpenseData.activeTab === '수입') {
        // 수입일 경우에는 지출금액을 0으로 할당합니다.
        // 나머지는 입력한 값으로 할당합니다.
        saveInputExpenseData({
          ...inputExpenseData,
          expenditurePrice: 0,
          incomePrice: Number(inputExpenseData.incomePrice),
          activeTab: inputExpenseData.activeTab,
        });
      } else {
        // 지출일 경우에는 수입금액을 0으로 할당합니다.
        // 나머지는 입력한 값으로 할당합니다.
        saveInputExpenseData({
          ...inputExpenseData,
          incomePrice: 0,
          expenditurePrice: Number(inputExpenseData.expenditurePrice),
          activeTab: inputExpenseData.activeTab,
        });
      }
      cancel();
    } else {
      alert('모든 항목을 입력해주세요.');
    }
  };

  /**
   * 날짜를 입력합니다.
   * expenseData가 있으면 그 데이터의 날짜를,
   * 없으면 선택한 날짜를,
   * 선택한 날짜도 없으면 현재 날짜를 입력합니다.
   */
  useEffect(() => {
    if (expenseData && expenseData.date) {
      const { date, hour, minute } = expenseData;
      const dateStr = `${date} ${hour}:${minute}`;
      setInputDate(new Date(dateStr));
    } else if (selectDate && selectDate.year) {
      setInputDate(
        new Date(`${selectDate.year}-${selectDate.month}-${selectDate.day}`),
      );
    }
  }, []);

  /**
   * 입력한 값을 저장합니다.
   * 입력한 날짜가 바뀌면 그 날짜를 저장합니다.
   */
  useEffect(() => {
    let dateStr = '';
    let [year, month, day] = [
      inputDate.getFullYear(),
      inputDate.getMonth() + 1,
      inputDate.getDate(),
    ];
    if (month < 10) month = `0${month}`;
    if (day < 10) day = `0${day}`;
    dateStr = `${year}-${month}-${day}`;
    setInputExpenseData(prev => ({
      ...prev,
      date: dateStr,
      hour: inputDate.getHours(),
      minute: inputDate.getMinutes(),
      daysOfWeek: inputDate.toLocaleDateString('ko-KR', {
        weekday: 'short',
        timeZone: 'Asia/Seoul',
      }),
      amPm: inputDate.toLocaleTimeString().slice(0, 2),
    }));
  }, [inputDate]);

  const [chipGroupOpenStatus, setChipGroupOpenStatus] = useState('');

  return (
    <>
      <div>
        <Tab
          tapListData={TAP_DATA}
          onClick={handleTapClick}
          activeTab={inputExpenseData.activeTab}
        />
      </div>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <fieldset onClick={() => setChipGroupOpenStatus('')}>
          <legend className="text-0px">수입</legend>

          <table className="mt-5 h-full w-full">
            <colgroup>
              <col width="20%" />
              <col width="80%" />
            </colgroup>

            <tbody className="font-R h-full w-full">
              <tr className="sm:text-14px md:text-16px lg:text-20px">
                <th>날짜</th>

                <td className="td-border-b py-1 pl-2">
                  <DatePicker
                    className="cursor-pointer"
                    selected={inputDate}
                    onChange={setInputDate}
                    dateFormat="yy/MM/dd (E) a hh:mm"
                    showTimeSelect
                    locale={ko}
                  />
                </td>
              </tr>

              <tr
                className="h-5
              "
              />
              <tr className="sm:text-14px md:text-16px lg:text-20px">
                <th>금액</th>

                <td className="td-border-b">
                  <CustomInput
                    className="pl-2 font-bold sm:text-14px md:text-16px lg:text-20px"
                    placeholder="금액을 입력해주세요."
                    type="number"
                    onChange={e => {
                      const value = e.target.value;
                      if (inputExpenseData.activeTab == '수입') {
                        setInputExpenseData({
                          ...inputExpenseData,
                          incomePrice: value,
                        });
                      } else {
                        setInputExpenseData({
                          ...inputExpenseData,
                          expenditurePrice: value,
                        });
                      }
                    }}
                    value={
                      inputExpenseData
                        ? inputExpenseData.activeTab == '수입'
                          ? inputExpenseData.incomePrice
                          : inputExpenseData.expenditurePrice
                        : ''
                    }
                  />
                </td>
              </tr>

              <tr className="h-5" />

              <tr
                className="cursor-pointer sm:text-14px md:text-16px lg:text-20px"
                onClick={event => {
                  event.stopPropagation();
                  setChipGroupOpenStatus('classification');
                }}
              >
                <th>분류</th>

                {inputExpenseData.classification ? (
                  <td className="td-border-b py-1 pl-2 font-bold">
                    {inputExpenseData.classification}
                  </td>
                ) : (
                  <td className="td-border-b py-1 pl-2 text-grayscaleD text-opacity-60">
                    선택
                  </td>
                )}
              </tr>

              <tr className="h-5" />

              <tr
                className="cursor-pointer sm:text-14px md:text-16px lg:text-20px "
                onClick={event => {
                  event.stopPropagation();
                  setChipGroupOpenStatus('asset');
                }}
              >
                <th>자산</th>

                {inputExpenseData.asset ? (
                  <td className="td-border-b py-1 pl-2">
                    {inputExpenseData.asset}
                  </td>
                ) : (
                  <td className="td-border-b py-1 pl-2 text-grayscaleD text-opacity-60">
                    선택
                  </td>
                )}
              </tr>

              <tr className="h-5" />
              <tr className="sm:text-14px md:text-16px lg:text-20px">
                <th>내용</th>
                <td className="td-border-b">
                  <CustomInput
                    className="pl-2 font-bold sm:text-14px md:text-16px lg:text-20px"
                    placeholder="내용을 입력해주세요."
                    onChange={e => {
                      setInputExpenseData({
                        ...inputExpenseData,
                        memo: e.target.value,
                      });
                    }}
                    value={inputExpenseData?.memo || ''}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <div className="flex w-full items-center justify-center gap-3 pt-5">
            <Button type="submit" text={tabType.save} onClick={save} />

            {tabType == BOX_TYPE.NEW ? (
              <Button text="취소" color="white" onClick={cancel} />
            ) : (
              <>
                <Button
                  text="삭제"
                  color="secondary"
                  onClick={removeExpenseData}
                />
                <Button text="취소" color="white" onClick={cancel} />
              </>
            )}
          </div>
        </fieldset>
      </form>

      {chipGroupOpenStatus == 'classification' && (
        <div className="mt-4">
          <ChipGroup
            size="sm"
            ChipData={
              inputExpenseData.activeTab == '수입'
                ? INCOME_DATA
                : EXPENDITURE_DATA
            }
            currentValue={inputExpenseData?.classification}
            changeValue={(classification, classificationSrc) =>
              setInputExpenseData({
                ...inputExpenseData,
                classification,
                classificationSrc,
              })
            }
          />
        </div>
      )}
      {chipGroupOpenStatus == 'asset' && (
        <div className="mt-4">
          <ChipGroup
            size="sm"
            ChipData={ASSET_DATA}
            currentValue={inputExpenseData?.asset}
            changeValue={(asset, assetSrc) =>
              setInputExpenseData({
                ...inputExpenseData,
                asset,
                assetSrc,
              })
            }
          />
        </div>
      )}
    </>
  );
};

export default ExpenseBoxTab;
