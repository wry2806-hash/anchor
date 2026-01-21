"use client";

import { useEffect, useState } from "react";

export const useInView = (targetId: string, rootMargin = "0px") => {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin, threshold: 0.1 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId, rootMargin]);

  return inView;
};
