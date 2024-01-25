/**
 * Chip Component 입니다.
 * @property {string} className - 커스텀 클래스
 * className이 props로 전달되면 해당 클래스를 추가하고, 없으면 빈 스트링을 반환합니다.
 * @property {string} id - id 입니다.
 * @property {string} check - checked 상태를 반환합니다. 해당 props를 이용하여 checked 상태를 관리합니다.
 * @property {string} text - text 입니다. chip 컴포넌트 내부에 적용될 텍스트를 전달합니다.
 * @property {string} size - size 입니다. chip 컴포넌트의 크기를 결정합니다. sm, md, lg 중 선택할 수 있습니다.
 * @property {string} src - src 입니다. chip 컴포넌트 내부에 적용될 이미지 URL을 전달합니다.
 * @property {function} onChange - onChange 이벤트를 전달합니다.
 * @returns
 */
const Chip = ({
  className,
  id,
  check,
  text,
  onChange,
  size,
  src,
  name,
  ...props
}) => {
  return (
    <div {...props} className="px-2">
      <div
        className={`${className ? className : ''} ${SIZE[size] || SIZE.md} 
        ${
          check === 'true'
            ? 'border-primaryColor bg-primaryColor text-grayscaleA'
            : 'border-grayscaleH bg-grayscaleA text-grayscaleH'
        } cursor-pointer rounded-full border`}
        size={size}
        check={check}
        onChange={onChange}
        name={name}
      >
        <div className="flex h-full w-full items-center justify-center gap-1">
          <img src={src} alt={text} className="h-4 w-4" />
          <span className={`h-4`} size={size}>
            {text}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chip;

/** SIZE에 대한 상수데이터 입니다.
 * sm, md, lg 중 선택할 수 있으며 각각 w-24 h-8 text-12px, w-28 h-10 text-14px, w-32 h-12 text-16px의 스타일을 가집니다.
 */
const SIZE = {
  sm: 'w-24 h-8 text-12px',
  md: 'w-28 h-10 text-14px',
  lg: 'w-32 h-12 text-16px',
};
