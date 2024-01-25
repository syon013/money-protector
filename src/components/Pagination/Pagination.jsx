import React, { useEffect, useState } from 'react';

/** Pagination 대한 props 리스트 입니다.
 *@property {string} pageLimit                             - Pagination의 pageLimit(페이지단위를 결정) 정의합니다.
 *@property {string} totalPage                             - Pagination의 totalPage(총페이지 개수) 정의합니다.
 *@property {string} currentPage                           - Pagination의 currentPage(현재페이지) 정의합니다.
 *@property {function} setCurrentPage                      - Pagination의 setCurrentPage() 함수를 정의합니다.
 */

const Pagination = ({ pageLimit, currentPage, setCurrentPage, totalPage }) => {
  /** 필요한 페이지 번호 담아놓는 useState를 정의합니다. */
  const [pageArray, setPageArray] = useState([]);

  /** 페이지를 구하는 useEffect 입니다. */
  useEffect(() => {
    // 페이지 번호를 저장할 빈 배열을 초기화합니다.
    const arr = [];

    // 현재 페이지 그룹의 시작 페이지 번호를 계산합니다.
    // Math.floor((currentPage - 1) / pageLimit)는 현재 페이지 그룹의 인덱스를 계산합니다.
    // 이를 pageLimit에 곱하고 1을 더해 시작 페이지 번호를 구합니다.
    const startPage = Math.floor((currentPage - 1) / pageLimit) * pageLimit + 1;

    // 현재 페이지 그룹의 마지막 페이지 번호를 계산합니다.
    // startPage + pageLimit - 1은 이론적인 마지막 페이지 번호입니다.
    // Math.min 함수를 사용하여 이론적인 마지막 페이지와 실제 총 페이지 수 중 작은 값을 선택합니다.
    const endPage = Math.min(startPage + pageLimit - 1, totalPage);

    // 시작 페이지부터 끝 페이지까지 순회하며 페이지 번호를 배열에 추가합니다.
    for (let i = startPage; i <= endPage; i++) {
      arr.push(i);
    }

    // 계산된 페이지 번호 배열을 상태에 설정합니다.
    // 이 배열은 UI에서 페이지 번호들을 표시하는데 사용합니다.
    setPageArray(arr);
  }, [totalPage, currentPage, pageLimit]); // totalPage, currentPage, pageLimit 값이 변경될 때마다 이 effect는 재실행됩니다.

  return (
    <div className="mt-10 flex w-full justify-center">
      <button
        className={`text-20px text-grayscaleD hover:text-grayscaleH ${
          currentPage === 1 ? 'invisible' : 'visible'
        }`}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        {'<'}
      </button>

      <ul className="flex gap-3 px-4">
        {pageArray.map(num => {
          return (
            <li key={num}>
              <button
                className={`text-20px hover:text-grayscaleH ${
                  num === currentPage ? 'text-grayscaleH' : 'text-grayscaleD'
                }`}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        className={`text-20px text-grayscaleD hover:text-grayscaleH ${
          currentPage === totalPage ? 'invisible' : 'visible'
        }`}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;
