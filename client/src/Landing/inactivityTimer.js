import { useEffect, useRef } from 'react';

const useInactivityTimer = (window_obj, callback, delay) => {
  const inactivityTimeoutRef = useRef();

  useEffect(() => {
    if(!window_obj) return;
    const resetInactivityTimeout = () => {
      clearTimeout(inactivityTimeoutRef.current);
      inactivityTimeoutRef.current = setTimeout(callback, delay);
    };

    const handleUserActivity = () => {
      resetInactivityTimeout();
    };

    // Attach event listeners for user activity
    window_obj.contentDocument.addEventListener('mousemove', handleUserActivity);
    window_obj.contentDocument.addEventListener('keydown', handleUserActivity);

    // Start the inactivity timer initially
    resetInactivityTimeout();

    // Clean up event listeners on unmount
    return () => {
      clearTimeout(inactivityTimeoutRef.current);
      try{

        window_obj.contentDocument.removeEventListener('mousemove', handleUserActivity);
        window_obj.contentDocument.removeEventListener('keydown', handleUserActivity);
      }catch(e){
        
      }
    };
  }, [callback, delay]);
};

export default useInactivityTimer;
