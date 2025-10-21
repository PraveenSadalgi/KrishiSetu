import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSmoothScroll } from "../contexts/SmoothScrollContext";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { scrollToTop } = useSmoothScroll();

  useEffect(() => {
    scrollToTop();
  }, [pathname, scrollToTop]);

  return null;
};

export default ScrollToTop;
