/**
 *@property {string} tapListData:                                 - 탭의 필요한 데이터를 정의합니다.
 *@property {Hook} activeTab                                      - 부모컴포넌트에서 정의한 value값과 동일한 useState 값을 정의합니다.
 *@property {function} onClick                                    - 탭의 클릭 이벤트를 정의합니다.
 * 필독 : tapListData props로 넘겨줄때 데이터 구조는 id, name, value, text 로 되어야합니다.
 *       src페이지에서 하위폴더 data에서 TapGroup을 참고하세요.
 *       activeTab 넘어오는 훅에 초기값은 상수데이터에있는 값들중 value값을 지정해야합니다.
 */

const Tab = ({ tapListData, onClick, activeTab }) => {
  return (
    <div className="flex w-full">
      {tapListData.map(({ id, name, value, text }) => {
        //activeTab값과 데이터안에있는 클릭이벤트에 감지된 value값이 같아야합니다.
        const isActive = activeTab === value;

        return (
          <button
            key={id}
            id={id}
            name={name}
            value={value}
            //클릭이벤트 인자로 value 값을 받아야합니다.
            onClick={() => onClick(value)}
            className={`w-[100%] py-2 text-20px sm:text-14px ${
              isActive
                ? '  border-b-2  text-grayscaleH '
                : 'border-b-2  text-grayscaleC '
            }`}
          >
            {text}
          </button>
        );
      })}
    </div>
  );
};

export default Tab;
