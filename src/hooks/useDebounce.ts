import { useEffect, useRef } from 'react';

export default function useDebouncedCallback<A extends string>(
  callback: (args: A) => void,
  wait: number
) {
 
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  
  useEffect(() => cleanup, []);

  return function debouncedCallback(
    args: A
  ) {
    argsRef.current = args;

    cleanup();

    timeout.current = setTimeout(() => {
      if (argsRef.current !== undefined) {
        callback(argsRef.current);
      }
    }, wait);
  };
}