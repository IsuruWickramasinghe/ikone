import React, { useEffect, useState } from 'react';

function TempCountDown({ setEndDate, targetDate }) {
  const [countdown, setCountdown] = useState(getCountdown());

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function getCountdown() {
    if (!(targetDate instanceof Date) || isNaN(targetDate.getTime())) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      // Countdown has ended
      setEndDate(true)
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
    }

    // Calculate remaining time
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
      days,
      hours,
      minutes,
      seconds
    };
  }

  return (
    <div>
      {countdown.days} Day {countdown.hours.toString().padStart(2, '0')}.{countdown.minutes
        .toString()
        .padStart(2, '0')}.{countdown.seconds.toString().padStart(2, '0')}
    </div>
  );
}

export default TempCountDown;
