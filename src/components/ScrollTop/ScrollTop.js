import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//새페이지 랜더링시 스크롤을 맨위로 올려주는 기본 컴포넌트입니다.
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
}
