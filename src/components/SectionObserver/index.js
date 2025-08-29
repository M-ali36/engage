import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useStore, setIsInLightSection } from '@UseCase/store';

const SectionObserver = ({ id, isLight = false, children, ...props }) => {
  const [store, dispatch] = useStore();
  const [rootMargin, setRootMargin] = useState('0% 0px -50% 0px'); // default fallback

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const margin = `0% 0px -${window.innerHeight - 5}px 0px`;
      setRootMargin(margin);
    }
  }, []);

  const { ref, inView } = useInView({
    rootMargin,
    threshold: 0,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      setIsInLightSection(dispatch, isLight);
    }
  }, [inView, isLight, dispatch]);

  return (
    <section ref={ref} id={id} {...props}>
      {children}
    </section>
  );
};

export default SectionObserver;
