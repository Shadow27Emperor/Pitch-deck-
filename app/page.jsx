  // Intersection Observer to trigger the 3-second sweep animation
  useEffect(() => {
    // SAFETY CHECK: Prevent crashes on SSR or older mobile webviews
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setRingsVisible(true); // Fallback: just show the rings immediately
      return;
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRingsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    
    if (ringsRef.current) {
      observer.observe(ringsRef.current);
    }
    return () => observer.disconnect();
  }, []);
