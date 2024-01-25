import { de } from 'date-fns/locale';

// basic_test 함수: API 응답 상태에 따라 resolve 또는 reject를 반환하는 테스트용 함수입니다.
export const basic_test = status => {
  // 가상의 토큰값을 문자열로 선언합니다.
  const token = 'token:가상의 토큰값을 줍니다.';
  // Promise를 반환합니다. Promise는 비동기 작업의 최종 완료(또는 실패) 및 그 결과값을 나타냅니다.
  return new Promise((resolve, reject) => {
    if (status === 200) {
      // resolve 함수를 호출하여 작업 성공을 나타내고, status와 token을 객체로 반환합니다.
      resolve({
        status,
        token,
      });
    } else {
      // status가 200이 아닌 경우, reject 함수를 호출하여 작업 실패를 나타내고, status만 반환합니다.
      reject({
        status,
      });
    }
  });
};

// cert_test 함수: 무작위 인증번호를 생성하는 함수입니다.
export const cert_test = status => {
  // Math.random() 함수를 사용해 0과 1 사이의 랜덤한 실수를 생성합니다.
  // 이 랜덤한 숫자에 1000000을 곱하여 소수점 아래를 6자리 숫자로 만듭니다.
  // 예시: Math.random()이 0.6493526741005418을 반환하면, 곱셈 결과는 649352.6741005418이 됩니다.
  const number = Math.ceil(Math.random() * 1000000);

  // Math.ceil() 함수를 사용하여 생성된 숫자를 올림 처리합니다.
  // 이렇게 하면 소수점 이하의 숫자가 제거되고, 정수인 6자리 랜덤 숫자가 됩니다.
  // 예시: 649352.6741005418은 649353이 됩니다.
  // 이 숫자를 number 변수에 저장합니다.

  // Promise를 반환합니다. Promise는 비동기 작업의 최종 완료(또는 실패) 및 그 결과값을 나타냅니다.
  return new Promise((resolve, reject) => {
    // status 매개변수가 200일 경우

    if (status === 200) {
      // resolve 함수를 호출하여 작업 성공을 나타내고, 생성된 6자리 숫자(number)와 상태(status)를 객체로 반환합니다.
      resolve({
        status: 200,
        number,
      });
    } else {
      // status가 200이 아닌 다른 값일 경우, reject 함수를 호출하여 작업 실패를 나타내고, 상태(status)로 500을 반환합니다.
      reject({
        status: 500,
      });
    }
  });
};

/**
 * 가짜 API 를 위한 가짜 데이터베이스 입니다.
 * 배포를 할 때 서버를 이용할 수 없어서, 임시로 만들어 놓은 데이터 입니다.
 */
const ALL_DATA = [
  {
    id: 1,
    activeTab: '수입',
    incomePrice: 123,
    expenditurePrice: 0,
    date: '2024-01-04',
    hour: 18,
    minute: 44,
    daysOfWeek: '목',
    amPm: '오후',
    classification: '이자',
    classificationSrc: '../money-protector/images/Chip/side.png',
    asset: '은행',
    assetSrc: '../money-protector/images/Chip/bank.png',
    memo: '은행이자',
  },
  {
    id: 2,
    activeTab: '수입',
    incomePrice: 10000,
    expenditurePrice: 0,
    date: '2024-01-10',
    hour: 18,
    minute: 44,
    daysOfWeek: '수',
    amPm: '오후',
    classification: '금융소득',
    classificationSrc: '../money-protector/images/Chip/finance.png',
    asset: '은행',
    assetSrc: '../money-protector/images/Chip/bank.png',
    memo: '은행가서 입금해요',
  },
  {
    id: 3,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 1500,
    date: '2024-01-10',
    hour: 18,
    minute: 55,
    daysOfWeek: '수',
    amPm: '오후',
    classification: '식비',
    classificationSrc: '../money-protector/images/Chip/food.png',
    asset: '카드',
    assetSrc: '../money-protector/images/Chip/credit_card.png',
    memo: '핫도그',
  },
  {
    id: 4,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 20000,
    date: '2024-01-19',
    hour: 18,
    minute: 55,
    daysOfWeek: '금',
    amPm: '오후',
    classification: '식비',
    classificationSrc: '../money-protector/images/Chip/food.png',
    asset: '카드',
    assetSrc: '../money-protector/images/Chip/credit_card.png',
    memo: '카페왔어요',
  },
  {
    id: 5,
    activeTab: '수입',
    incomePrice: 1500000,
    expenditurePrice: 0,
    date: '2024-01-01',
    hour: 9,
    minute: 0,
    daysOfWeek: '월',
    amPm: '오전',
    classification: '월급',
    classificationSrc: '../money-protector/images/Chip/salary.png',
    asset: '은행',
    assetSrc: '../money-protector/images/Chip/bank.png',
    memo: '알바비',
  },
  {
    id: 6,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 115000,
    date: '2024-01-01',
    hour: 9,
    minute: 0,
    daysOfWeek: '월',
    amPm: '오전',
    classification: '주거통신',
    classificationSrc: '../money-protector/images/Chip/information.png',
    asset: '은행',
    assetSrc: '../money-protector/images/Chip/bank.png',
    memo: '핸드폰비',
  },
  {
    id: 7,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 230000,
    date: '2024-01-06',
    hour: 9,
    minute: 0,
    daysOfWeek: '토',
    amPm: '오전',
    classification: '패션미용',
    classificationSrc: '../money-protector/images/Chip/fashion.png',
    memo: '파마',
    asset: '카드',
    assetSrc: '../money-protector/images/Chip/credit_card.png',
  },
  {
    id: 8,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 38000,
    date: '2024-01-14',
    hour: 9,
    minute: 0,
    daysOfWeek: '일',
    amPm: '오전',
    classification: '식비',
    classificationSrc: '../money-protector/images/Chip/food.png',
    asset: '카드',
    assetSrc: '../money-protector/images/Chip/credit_card.png',
    memo: '아구찜',
  },
  {
    id: 9,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 100000,
    date: '2024-01-13',
    hour: 9,
    minute: 0,
    daysOfWeek: '토',
    amPm: '오전',
    classification: '경조사비',
    classificationSrc: '../money-protector/images/Chip/celebration.png',
    asset: '현금',
    assetSrc: '../money-protector/images/Chip/cash.png',
    memo: '결혼식 축의금',
  },
  {
    id: 10,
    activeTab: '수입',
    incomePrice: 1512,
    expenditurePrice: 0,
    date: '2024-01-05',
    hour: 9,
    minute: 0,
    daysOfWeek: '금',
    amPm: '오전',
    classification: '이자',
    classificationSrc: '../money-protector/images/Chip/side.png',
    asset: '은행',
    assetSrc: '../money-protector/images/Chip/bank.png',
    memo: '채권이자',
  },
  {
    id: 11,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 50000,
    date: '2024-01-05',
    hour: 9,
    minute: 0,
    daysOfWeek: '금',
    amPm: '오전',
    classification: '교통차량',
    classificationSrc: '../money-protector/images/Chip/car.png',
    asset: '카드',
    assetSrc: '../money-protector/images/Chip/credit_card.png',
    memo: '주유비',
  },
  {
    id: 12,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 20000,
    date: '2024-01-14',
    hour: 9,
    minute: 0,
    daysOfWeek: '일',
    amPm: '오전',
    classification: '건강',
    classificationSrc: '../money-protector/images/Chip/health.png',
    asset: '현금',
    assetSrc: '../money-protector/images/Chip/cash.png',
    memo: '헬스장 일일권',
  },
  {
    id: 13,
    activeTab: '수입',
    incomePrice: 200000,
    expenditurePrice: 0,
    date: '2024-01-08',
    hour: 9,
    minute: 0,
    daysOfWeek: '월',
    amPm: '오전',
    classification: '상여',
    classificationSrc: '../money-protector/images/Chip/bonus.png',
    asset: '은행',
    assetSrc: '../money-protector/images/Chip/bank.png',
    memo: '새해상여금',
  },
  {
    id: 14,
    activeTab: '수입',
    incomePrice: 100000,
    expenditurePrice: 0,
    date: '2024-01-18',
    hour: 9,
    minute: 0,
    daysOfWeek: '목',
    amPm: '오전',
    classification: '기타',
    classificationSrc: '../money-protector/images/Chip/etc.png',
    memo: '빌려준돈을 받았다',
    asset: '현금',
    assetSrc: '../money-protector/images/Chip/cash.png',
  },
  {
    id: 15,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 250000,
    date: '2024-01-07',
    hour: 9,
    minute: 0,
    daysOfWeek: '일',
    amPm: '오전',
    classification: '기타',
    classificationSrc: '../money-protector/images/Chip/etc.png',
    memo: '데이트비용',
    asset: '카드',
    assetSrc: '../money-protector/images/Chip/credit_card.png',
  },
  {
    id: 16,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 350000,
    date: '2024-01-16',
    hour: 9,
    minute: 0,
    daysOfWeek: '일',
    amPm: '오전',
    classification: '기타',
    classificationSrc: '../money-protector/images/Chip/etc.png',
    memo: '데이트비용',
    asset: '카드',
    assetSrc: '../money-protector/images/Chip/credit_card.png',
  },
  {
    id: 17,
    activeTab: '수입',
    incomePrice: 10000,
    expenditurePrice: 0,
    date: '2024-02-01',
    hour: 9,
    minute: 0,
    daysOfWeek: '금',
    amPm: '오전',
    classification: '용돈',
    classificationSrc: '../money-protector/images/Chip/pocket.png',
    asset: '현금',
    assetSrc: '../money-protector/images/Chip/cash.png',
    memo: '현금',
  },
  {
    id: 18,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 5000,
    date: '2024-02-04',
    hour: 9,
    minute: 0,
    daysOfWeek: '토',
    amPm: '오전',
    classification: '교통차량',
    classificationSrc: '../money-protector/images/Chip/car.png',
    asset: '현금',
    assetSrc: '../money-protector/images/Chip/cash.png',
    memo: '택시비',
  },
  {
    id: 19,
    activeTab: '지출',
    incomePrice: 0,
    expenditurePrice: 6000,
    date: '2024-02-06',
    hour: 9,
    minute: 0,
    daysOfWeek: '화',
    amPm: '오전',
    classification: '식비',
    classificationSrc: '../money-protector/images/Chip/food.png',
    asset: '카드',
    assetSrc: '../money-protector/images/Chip/credit_card.png',
    memo: '비빔밥',
  },
];

/**
 * 전체 수입/지출 데이터를 가져옵니다.
 * 이 함수는 날짜(year와 month), 활성 탭(activeTab)으로 데이터를 필터링하고,
 * 페이지네이션(page와 pageSize)을 적용하여 필요한 데이터를 반환합니다.
 *
 * @param {int} page - 페이지 번호
 * @param {int} pageSize - 페이지당 항목 수
 * @param {string} activeTab - 활성 탭 (수입, 지출 또는 통합)
 * @param {int} year - 선택된 연도
 * @param {int} month - 선택된 월
 * @returns {Promise} - 필터링된 데이터와 전체 데이터 개수를 포함한 객체를 반환합니다.
 */
export const getAllMoneyData = (page, pageSize, activeTab, year, month) => {
  // ALL_DATA 배열을 날짜 기준 내림차순으로 정렬합니다.
  // 새로운 Date 객체를 생성하여 날짜를 비교하고, b가 a보다 더 최근이면 양수, 그렇지 않으면 음수를 반환합니다.
  let totalData = ALL_DATA.sort((a, b) => new Date(b.date) - new Date(a.date));
  // 연도와 월이 지정되었는지 확인합니다.

  if (year && month) {
    // 주어진 연도와 월에 해당하는 데이터만 필터링합니다.
    // Date 객체를 생성하여 년도와 월을 확인하고, 이에 부합하는 항목만 남깁니다.
    totalData = totalData.filter(item => {
      const itemDate = new Date(item.date);
      if (
        itemDate.getFullYear() === year &&
        itemDate.getMonth() === month - 1
      ) {
        return item;
      }
    });
  }

  // activeTab에 따라 필터링합니다.
  // '통합'이 아닌 경우, activeTab과 일치하는 항목만 필터링합니다.
  if (activeTab && activeTab !== '통합') {
    totalData = totalData.filter(item => item.activeTab === activeTab);
  }

  // 페이지네이션을 적용합니다.
  let filteredData = totalData;

  if (page && pageSize) {
    // 시작 인덱스와 종료 인덱스를 계산합니다.
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    // 계산된 범위에 따라 데이터를 슬라이스하여 페이지별 데이터를 추출합니다.
    filteredData = filteredData.slice(startIndex, endIndex);
  }

  // 최종적으로 필터링된 데이터와 전체 아이템 수를 포함한 객체를 resolve합니다.
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: filteredData,
      totalItems: totalData.length, // 필터링된 데이터의 총 수
    });
  });
};

/**
 * id값으로 수입/지출 데이터의 상세 내용을 가져옵니다.
 * @param {int} id - 데이터의 고유 식별자
 * @returns {Promise} - 해당 id를 가진 데이터의 상세 정보를 반환합니다.
 * 데이터가 없을 경우 undefined를 반환합니다.
 */
export const getMoneyDetailDataById = id => {
  // 주어진 id와 일치하는 ALL_DATA 배열 내의 항목을 찾습니다.
  const detailData = ALL_DATA.find(item => item.id === id);
  // 찾은 데이터를 반환하거나, 데이터가 없으면 undefined를 반환합니다.
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: detailData,
    });
  });
};

/**
 * 수입/지출 데이터를 가짜 데이터베이스에 추가합니다.
 * @param {*} data - 추가할 수입/지출 데이터 객체
 * @returns {Promise} - 데이터 추가 작업의 성공 여부를 반환합니다.
 */
export const postMoneyData = data => {
  // 새 데이터 객체에 고유 id를 할당합니다. id는 현재 ALL_DATA 배열의 길이 + 1로 설정됩니다.
  data.id = ALL_DATA.length + 1;
  // ALL_DATA 배열에 새 데이터 객체를 추가합니다.
  ALL_DATA.push(data);
  // 데이터 추가 작업이 완료되었음을 알리는 상태 코드 200을 반환합니다.
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
    });
  });
};

/**
 * 특정 기간의 총 수입과 지출을 계산하여 반환합니다.
 * - 주어진 연도와 월에 해당하는 데이터를 ALL_DATA 배열에서 필터링합니다.
 * - 필터링된 데이터에서 수입과 지출을 각각 합산합니다.
 * - 최종적으로 수입에서 지출을 뺀 금액을 계산하여 반환합니다.
 *
 * @param {int} year - 계산할 연도
 * @param {int} month - 계산할 월
 * @returns {Promise} - 계산된 총 금액을 반환합니다.
 */
export const getTotalMoney = (year, month) => {
  let totalIncome = 0; // 총 수입을 저장하기 위한 변수 초기화
  let totalExpenditure = 0; // 총 지출을 저장하기 위한 변수 초기화

  // ALL_DATA 배열에서 주어진 연도와 월에 해당하는 데이터를 필터링합니다.
  let filteredData = ALL_DATA;
  if (year && month) {
    filteredData = ALL_DATA.filter(item => {
      const itemDate = new Date(item.date); // 각 항목의 날짜를 Date 객체로 변환
      if (
        itemDate.getFullYear() === year &&
        itemDate.getMonth() === month - 1 // 연도와 월이 일치하는 항목만 필터링
      ) {
        return item;
      }
    });
  }
  // 필터링된 데이터를 순회하며 수입과 지출을 각각 합산합니다.
  filteredData.forEach(item => {
    if (item.activeTab == '수입' && item.incomePrice)
      totalIncome += Number(item.incomePrice); // 수입 항목의 경우, totalIncome에 금액을 더합니다.
    if (item.activeTab == '지출' && item.expenditurePrice)
      totalExpenditure += Number(item.expenditurePrice); // 지출 항목의 경우, totalExpenditure에 금액을 더합니다.
  });

  // 총 수입에서 총 지출을 빼서 순수입/순지출 금액을 계산합니다.
  const totalMoney = totalIncome - totalExpenditure;
  // 계산된 총 금액을 Promise로 감싸서 반환합니다.
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: totalMoney, // 계산된 총 금액을 data 필드에 담아 반환
    });
  });
};

/**
 * 전체 수입 금액을 계산합니다.
 * - 주어진 연도와 월에 해당하는 데이터를 필터링하고 수입을 합산합니다.
 *
 * @param {int} year - 계산할 연도
 * @param {int} month - 계산할 월
 * @returns {Promise} - 계산된 총 수입 금액을 반환합니다.
 */
export const getIncomeTotalMoney = (year, month) => {
  let totalIncome = 0; // 총 수입을 저장하기 위한 변수 초기화
  let filteredData = ALL_DATA; // 필터링된 데이터를 저장할 변수 초기화

  // 만약 주어진 연도와 월이 존재하는 경우, 해당 기간에 해당하는 데이터만 필터링합니다.
  if (year && month) {
    filteredData = ALL_DATA.filter(item => {
      const itemDate = new Date(item.date); // 각 항목의 날짜를 Date 객체로 변환

      // 주어진 연도와 월에 해당하는 항목만 필터링
      if (
        itemDate.getFullYear() === year &&
        itemDate.getMonth() === month - 1
      ) {
        return item;
      }
    });
  }

  // 필터링된 데이터를 순회하며 수입을 합산합니다.
  filteredData.forEach(item => {
    if (item.activeTab == '수입' && item.incomePrice)
      totalIncome += Number(item.incomePrice); // 수입 항목의 경우, totalIncome에 금액을 더합니다.
  });

  // 계산된 총 수입 금액을 Promise로 감싸서 반환합니다.
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: totalIncome, // 계산된 총 수입 금액을 data 필드에 담아 반환
    });
  });
};

/**
 * 전체 지출 금액을 계산합니다.
 * - 주어진 연도와 월에 해당하는 데이터를 필터링하고 지출을 합산합니다.
 *
 * @param {int} year - 계산할 연도
 * @param {int} month - 계산할 월
 * @returns {Promise} - 계산된 총 지출 금액을 반환합니다.
 */
export const getExpenditureTotalMoney = (year, month) => {
  let totalExpenditure = 0; // 총 지출을 저장하기 위한 변수 초기화
  let filteredData = ALL_DATA; // 필터링된 데이터를 저장할 변수 초기화

  // 만약 주어진 연도와 월이 존재하는 경우, 해당 기간에 해당하는 데이터만 필터링합니다.
  if (year && month) {
    filteredData = ALL_DATA.filter(item => {
      const itemDate = new Date(item.date); // 각 항목의 날짜를 Date 객체로 변환

      // 주어진 연도와 월에 해당하는 항목만 필터링
      if (
        itemDate.getFullYear() === year &&
        itemDate.getMonth() === month - 1
      ) {
        return item;
      }
    });
  }

  // 필터링된 데이터를 순회하며 지출을 합산합니다.
  filteredData.forEach(item => {
    if (item.activeTab == '지출' && item.expenditurePrice)
      totalExpenditure += Number(item.expenditurePrice); // 지출 항목의 경우, totalExpenditure에 금액을 더합니다.
  });

  // 계산된 총 지출 금액을 Promise로 감싸서 반환합니다.
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: totalExpenditure, // 계산된 총 지출 금액을 data 필드에 담아 반환
    });
  });
};

/**
 * id값으로 수입/지출 데이터를 삭제합니다.
 * @param {int} id - 삭제할 데이터의 고유 식별자
 * @returns {Promise} - 데이터 삭제 작업의 성공 여부를 반환합니다.
 * 해당 id를 가진 데이터를 찾아서 ALL_DATA 배열에서 제거합니다.
 */
export const deleteMoneyDataById = id => {
  // ALL_DATA 배열에서 해당 id를 가진 데이터의 인덱스를 찾습니다.
  const index = ALL_DATA.findIndex(item => item.id === id);

  //배열에서 해당 요소를 제거합니다.
  ALL_DATA.splice(index, 1);

  // 데이터 삭제 작업이 완료되었음을 알리는 상태 코드 200을 반환합니다.
  // 만약 해당 id를 가진 데이터가 없으면 아무 작업도 수행하지 않습니다.
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
    });
  });
};

/**
 * id값으로 수입/지출 데이터를 찾고, 수정합니다.
 * @param {int} id - 수정할 데이터의 고유 식별자
 * @param {*} inputData - 수정될 데이터
 * @returns {Promise} - 데이터 수정 작업의 성공 여부를 반환합니다.
 * 해당 id를 가진 데이터를 찾아서 주어진 inputData로 업데이트합니다.
 */
export const putMoneyDataById = (id, inputData) => {
  // ALL_DATA 배열에서 해당 id를 가진 데이터의 인덱스를 찾습니다.
  const index = ALL_DATA.findIndex(item => item.id === id);

  // 해당 위치의 데이터를 inputData로 교체합니다.
  ALL_DATA[index] = inputData;

  // 데이터 수정 작업이 완료되었음을 알리는 상태 코드 200을 반환합니다.
  // 만약 해당 id를 가진 데이터가 없으면 아무 작업도 수행하지 않습니다.
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
    });
  });
};

/**
 * 특정 날짜에 해당하는 모든 수입/지출 데이터를 검색합니다.
 * - 주어진 날짜와 일치하는 모든 데이터를 ALL_DATA 배열에서 찾아 반환합니다.
 *
 * @param {string} dateStr - 검색할 날짜 ('YYYY-MM-DD' 형식)
 * @returns {Promise} - 해당 날짜에 해당하는 모든 데이터를 배열로 반환합니다.
 */
export const getMoneyDataListByDate = dateStr => {
  // 주어진 날짜에 해당하는 ALL_DATA 배열 내의 데이터를 필터링합니다.
  const allData = ALL_DATA.filter(item => {
    const itemDate = new Date(item.date); // 각 항목의 날짜를 Date 객체로 변환
    const date = new Date(dateStr); // 검색할 날짜를 Date 객체로 변환
    if (
      itemDate.getFullYear() === date.getFullYear() && // 연도가 일치하는지 확인
      itemDate.getMonth() === date.getMonth() && // 월이 일치하는지 확인
      itemDate.getDate() === date.getDate() // 일이 일치하는지 확인
    ) {
      return item;
    }
  });

  // 필터링된 데이터를 반환합니다.
  // 만약 일치하는 데이터가 없다면 빈 배열을 반환합니다.
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: allData,
    });
  });
};

/**
 * 지출을 분류별로 집계합니다.
 * - 주어진 연도와 월에 해당하는 데이터만 필터링하여, 각 분류별 지출 금액을 계산합니다.
 *
 * @param {int} year - 계산할 연도
 * @param {int} month - 계산할 월
 * @returns {Promise} - 분류별 총 지출 금액을 객체로 반환합니다.
 */
export const getAllExpenditureByClassification = (year, month) => {
  const classificationList = []; // 각 분류별 지출을 저장할 빈 배열을 생성
  let filteredData = ALL_DATA; // 모든 데이터로 시작

  // 주어진 연도와 월에 해당하는 데이터만 필터링합니다.
  if (year && month) {
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.date); // 각 항목의 날짜를 Date 객체로 변환
      // 연도와 월이 일치하는지 확인
      if (
        itemDate.getFullYear() === year &&
        itemDate.getMonth() === month - 1
      ) {
        return item;
      }
    });
  }

  // 필터링된 데이터를 순회하면서 각 분류별 지출을 합산합니다.
  filteredData.forEach(item => {
    if (item.activeTab === '지출') {
      const index = classificationList.findIndex(
        classificationItem =>
          classificationItem.classification === item.classification,
      );
      if (index === -1) {
        // 새로운 분류인 경우, 배열에 추가
        classificationList.push({
          classification: item.classification, // 분류 정보 저장
          price: item.expenditurePrice, // 해당 지출 금액 저장
        });
      } else {
        // 이미 존재하는 분류인 경우, 해당 분류의 금액을 누적
        classificationList[index].price += item.expenditurePrice;
      }
    }
  });

  // 계산된 분류별 지출 금액을 객체로 반환합니다.
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: classificationList, // 분류별 지출 정보를 반환
    });
  });
};

/**
 * 수입을 분류별로 집계합니다.
 * - 주어진 연도와 월에 해당하는 데이터만 필터링하여, 각 분류별 수입 금액을 계산합니다.
 *
 * @param {int} year - 계산할 연도
 * @param {int} month - 계산할 월
 * @returns {Promise} - 분류별 총 수입 금액을 객체로 반환합니다.
 */
export const getAllIncomeByClassification = (year, month) => {
  const classificationList = []; // 각 분류별 수입을 저장할 빈 배열을 생성
  let filteredData = ALL_DATA; // 모든 데이터로 시작

  // 주어진 연도와 월에 해당하는 데이터만 필터링합니다.
  if (year && month) {
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.date); // 각 항목의 날짜를 Date 객체로 변환
      // 연도와 월이 일치하는지 확인
      if (
        itemDate.getFullYear() === year &&
        itemDate.getMonth() === month - 1
      ) {
        return item;
      }
    });
  }

  // 필터링된 데이터를 순회하면서 각 분류별 수입을 합산합니다.
  filteredData.forEach(item => {
    if (item.activeTab === '수입') {
      const index = classificationList.findIndex(
        classificationItem =>
          classificationItem.classification === item.classification,
      );
      if (index === -1) {
        // 새로운 분류인 경우, 배열에 추가
        classificationList.push({
          classification: item.classification, // 분류 정보 저장
          price: item.incomePrice, // 해당 수입 금액 저장
        });
      } else {
        // 이미 존재하는 분류인 경우, 해당 분류의 금액을 누적
        classificationList[index].price += item.incomePrice;
      }
    }
  });

  // 계산된 분류별 수입 금액을 객체로 반환합니다.
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: classificationList, // 분류별 수입 정보를 반환
    });
  });
};

/**
 * 모든 월별 지출을 계산합니다.
 * - 각 월별로 지출 항목들을 집계하여 해당 월의 총 지출 금액을 계산합니다.
 * - 이 함수는 전체 데이터(ALL_DATA)를 월별로 구분하고, 각 월에 해당하는 지출을 합산하여 결과를 제공합니다.
 *
 * @returns {Promise} - 월별 총 지출 금액을 객체로 반환합니다.
 * 예를 들어, {"1월": 10000, "2월": 20000, ...}와 같은 형태입니다.
 */
export const getAllExpenditureByMonth = () => {
  const monthList = []; // 각 월별 지출을 저장하기 위한 객체를 초기화합니다.

  // 1월부터 12월까지 각 월별 지출 금액을 0으로 초기화합니다.
  Array(12)
    .fill()
    .map((_, i) => i + 1)
    .forEach(month => {
      monthList[month + '월'] = 0;
    });

  // ALL_DATA를 순회하면서 각 월별 지출을 합산합니다.
  ALL_DATA.forEach(item => {
    if (item.activeTab === '지출') {
      const month = new Date(item.date).getMonth() + 1; // 항목의 날짜로부터 월을 추출합니다.
      monthList[month + '월'] += item.expenditurePrice; // 해당 월에 항목의 지출 금액을 더합니다.
    }
  });

  // 계산된 월별 지출 금액을 담은 객체를 Promise를 통해 반환합니다.
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: monthList,
    });
  });
};

/**
 * 모든 월별 수입을 계산합니다.
 * - 각 월별로 수입 항목들을 집계하여 해당 월의 총 수입 금액을 계산합니다.
 * - 이 함수는 전체 데이터(ALL_DATA)를 월별로 구분하고, 각 월에 해당하는 수입을 합산하여 결과를 제공합니다.
 * @returns {Promise} - 월별 총 수입 금액을 객체로 반환합니다.
 * 예를 들어, {"1월": 10000, "2월": 20000, ...}와 같은 형태입니다.
 */
export const getAllIncomeByMonth = () => {
  // 각 월의 수입을 저장하기 위한 객체를 초기화합니다.
  const monthList = [];

  // 1월부터 12월까지 각 월별 수입 금액을 0으로 초기화합니다.
  Array(12)
    .fill()
    .map((_, i) => i + 1)
    .forEach(month => {
      monthList[month + '월'] = 0;
    });

  // 전체 데이터(ALL_DATA)를 순회하며 각 항목의 수입을 해당 월에 합산합니다.
  ALL_DATA.forEach(item => {
    // 해당 항목이 수입인 경우에만 처리합니다.
    if (item.activeTab === '수입') {
      // 해당 항목의 날짜로부터 월을 추출합니다.
      const month = new Date(item.date).getMonth() + 1;
      // 해당 월에 항목의 수입 금액을 더합니다.
      monthList[month + '월'] += item.incomePrice;
    }
  });

  // 계산된 월별 수입 금액을 담은 객체를 Promise를 통해 반환합니다.
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: monthList,
    });
  });
};
