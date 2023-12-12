import { useEffect, useRef } from 'react';
/**
 * Debounce hook
 *
 * @param callback: function to be executed after time
 * @param wait: the time after the function should be executed
 * @returns {Function}: the function to accept the value to be passed to the callback
 */
export default function useDebouncedCallback<A extends string>(
  callback: (args: A) => void,
  wait: number
) {
  // track args & timeout handle between calls
  const argsRef = useRef<A>();
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  function cleanup() {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  }

  // make sure our timeout gets cleared if
  // our consuming component gets unmounted
  useEffect(() => cleanup, []);

  return function debouncedCallback(
    args: A
  ) {
    // capture latest args
    argsRef.current = args;

    // clear debounce timer
    cleanup();

    // start waiting again
    timeout.current = setTimeout(() => {
      if (argsRef.current !== undefined) {
        callback(argsRef.current);
      }
    }, wait);
  };
}