/**
 * Checkbox props list
 * @property {function} onChange   - 체크박스의 상태 변경을 위한 함수
 * @property {boolean} checked     - 체크박스가 체크 된 상태
 * @property {string} label        - 체크박스의 라벨
 * @property {string} id           - 체크박스별 고유의 id
 * @property {string} className    - 체크박스의 클래스 이름을 정의합니다. 기존의 속성이 아닌 다른 속성을 적용시켜야 할 때 사용합니다.
 */

const Checkbox = ({
  onChange,
  checked,
  label,
  id,
  name,
  className,
  ...props
}) => {
  return (
    <div className="flex items-center gap-2">
      <input
        className={`${className} cursor-pointer `}
        type="checkbox"
        onChange={onChange}
        checked={checked}
        id={id}
        name={name}
      />
      <label {...props} className="font-RubikRegular font-black sm:text-12px">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
