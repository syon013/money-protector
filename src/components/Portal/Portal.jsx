import reactDom from 'react-dom';

const Portal = ({ children }) => {
  /** index.html에 생성한 id 값이 modal인 엘리먼트를 선택자로 지정 */
  const el = document.getElementById('Portal');

  /** createPortal 메서드를 이용하여 DOM의 최상위에 렌더링 될 수 있도록 함. */
  return reactDom.createPortal(children, el);
};

export default Portal;
