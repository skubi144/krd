import { useEffect, useState } from "react";

const MOBILE_MAX = 767;

const getIsMobile = () => window.innerWidth <= MOBILE_MAX;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(getIsMobile());

  useEffect(() => {
    const handleResize = () => setIsMobile(getIsMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}