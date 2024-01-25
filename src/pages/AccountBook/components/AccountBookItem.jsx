/**
 * AccountBookItem props list
 * @property {function} onClick       - AccountBookItem의 클릭이벤트 함수
 * @property {string} src             - AccountBookItem의 라벨을 정의합니다.
 * @property {string} date            - AccountBookItem의 년/월/일 date를 정의합니다.
 * @property {string} daysOfWeek      - AccountBookItem의 요일 date를 정의합니다.
 * @property {string} income          - AccountBookItem의 수입 data를 정의합니다.
 * @property {string} expenditure     - AccountBookItem의 지출 data를 정의합니다.
 * @property {string} type            - AccountBookItem의 수입/지출인지 type 정의합니다.
 */

const AccountBookItem = ({
  classificationSrc,
  date,
  daysOfWeek,
  income,
  activeTab,
  price,
  classification,
  onClick,
}) => {
  return (
    <tr
      className="cursor-pointer border-b hover:bg-grayscaleC hover:opacity-80"
      onClick={onClick}
    >
      <td className="py-2 text-center md:text-center">
        {date}
        <br />
        {daysOfWeek}요일
      </td>

      <td className="flex flex-col items-center justify-center gap-1 py-2 text-center lg:flex lg:flex-col">
        <div className="h-6 w-6">
          <img src={classificationSrc} alt="지출이미지" />
        </div>
        <label>{classification}</label>
      </td>

      {income ? (
        <td
          className={`py-2 text-center sm:text-center md:text-center ${
            activeTab === '지출' ? 'text-[red]' : 'text-[blue]'
          }`}
        >
          {`${income?.toLocaleString('ko-KR')}원`}
        </td>
      ) : (
        <td
          className={`py-2 text-center sm:text-center md:text-center ${
            activeTab === '지출' ? 'text-[red]' : 'text-[blue]'
          }`}
        >
          {`${price?.toLocaleString('ko-KR')}원`}
        </td>
      )}

      <td
        className={`py-2 ${
          activeTab === '지출' ? 'text-[red]' : 'text-[blue]'
        } text-center`}
      >
        {activeTab}
      </td>
    </tr>
  );
};

export default AccountBookItem;
