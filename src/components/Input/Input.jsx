/** Input 대한 props 리스트 입니다.
 *@property {string} type: text, password , number , email  - 인풋의 타입을 정의합니다.
 *@property {string} placeholder                            - 인풋의 입력될 값에 대한 짧은 힌트를 정의합니다.
 *@property {string} name                                   - 인풋의 이름을 정의합니다.
 *@property {string} value                                  - 인풋의 초깃값을 정의합니다.
 *@property {string} label                                  - 인풋의 라벨이름을 정의합니다.
 *@property {string} errorMsg                               - 인풋의 에러의 대한 메세지를 정의합니다.
 *@property {boolean} disabled                              - 인풋의 disabled 활성화 비활성화를 초기값은 false를 정의합니다.
 *@property {boolean} status                                - 인풋의 status 생태값을 정의합니다.
 *@property {function} onChange                             - 인풋의 값이 변경될시 실행할 함수를 정의합니다.
 */

const Input = ({
  className,
  type = 'text',
  placeholder,
  onChange,
  name,
  value,
  label,
  disabled = false,
  status = 'true',
  errorMsg,
  size,
  ...props
}) => {
  return (
    <div className="w-full">
      {/* 라벨이없다면 라벨 태그는 제외됩니다. */}
      {!label ? null : <label className="text-12px ">{label}</label>}
      <input
        className={`${className ? className : ''} ${InputStatusColor[status]} ${
          SIZE[size] || SIZE.sm
          //모바일 사이즈일땐 sm 사이즈가 적용됩니다.
        } bg-transparent w-full focus:placeholder:opacity-0 sm:px-2 sm:py-2 sm:text-12px`}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        disabled={disabled}
        status={status}
        value={value}
        onWheel={e => e.target.blur()}
        {...props}
      />
      {/* errorMsg 없다면 span 태그는 제외됩니다. */}
      {!errorMsg ? null : (
        <span
          className={`${ErrorStatus[status]} font-RubikRegular text-10px text-[red]`}
        >
          {errorMsg}
        </span>
      )}
    </div>
  );
};

export default Input;

/** Size에 대한 props 입니다.
 * @typedef {('sm'|'md'|'lg')} Size
 * Size에 대한 props를 정의합니다.
 * 1-1. sm일 경우 padding y축을 2, x축을 4, text의 크기를 12px로 정의합니다.
 * 1-2. md일 경우 padding y축을 3, x축을 6, text의 크기를 14px로 정의합니다.
 * 1-3. lg일 경우 padding y축을 4, x축을 8, text의 크기를 16px로 정의합니다.
 */
const SIZE = {
  sm: 'py-2 px-2 text-12px',
  md: 'py-3 px-6 text-14px',
  lg: 'py-4 px-8 text-16px',
};

/** props status 블리언 inputBorder 테두리 색상을 결정해줍니다. */
const InputStatusColor = {
  true: 'border-grayscaleH1 border-[1px] border-solid focus:outline-none  focus:border-primaryColor bg-FourthColor ',
  false:
    'border-[red] border-[1px] border-solid focus:outline-none  focus:border-[red] bg-FourthColor ',
};

/** props status 블리언 상태값에 따라 에러 메세지를 보여주는것을 결정합니다. */
const ErrorStatus = {
  true: 'invisible',
  false: 'visible',
};
