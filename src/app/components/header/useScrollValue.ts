import { useEffect, useState } from 'react';

/**
 * Custom hook to interpolate a value between max and min based on scroll position.
 * @param max The value at the top of the page (e.g., 2rem for font size)
 * @param min The value at 1/4 page scroll (e.g., 1.2rem for font size)
 * @returns The interpolated value as a string with the same unit as max/min
 */
export function useScrollValue(max: string, min: string): string {
  const [value, setValue] = useState<string>(max);

  useEffect(() => {
    // Extract numeric and unit parts
    const maxMatch = max.match(/([\d.]+)(\w+)/);
    const minMatch = min.match(/([\d.]+)(\w+)/);
    if (!maxMatch || !minMatch || maxMatch[2] !== minMatch[2]) {
      setValue(max);
      return;
    }
    const maxNum = parseFloat(maxMatch[1]);
    const minNum = parseFloat(minMatch[1]);
    const unit = maxMatch[2];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const quarterPage = window.innerHeight / 4;
      if (scrollY <= 0) {
        setValue(max);
      } else if (scrollY >= quarterPage) {
        setValue(min);
      } else {
        const interpolated = maxNum - (maxNum - minNum) * (scrollY / quarterPage);
        setValue(`${interpolated}${unit}`);
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Set initial value
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [max, min]);

  return value;
}
