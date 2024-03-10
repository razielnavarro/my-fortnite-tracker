import React, { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import moment from 'moment-timezone';

const CountdownTimer = () => {
  const [targetTime, setTargetTime] = useState(getNextResetTime());

  function getNextResetTime() {
    const now = moment().tz('America/Chicago');
    const resetTime = moment().tz('America/Chicago').set({ hour: 19, minute: 0, second: 0, millisecond: 0 });

    if (now.isAfter(resetTime)) {
      // If the current time is after the reset time, set the reset time for the next day
      return resetTime.add(1, 'days');
    }

    return resetTime;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTargetTime(getNextResetTime());
    }, 60000); // Update every minute to handle timezone changes

    return () => clearInterval(interval);
  }, []);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Reset the countdown when it completes
      setTargetTime(getNextResetTime());
      return <span>Refreshes in 24:00:00</span>;
    } else {
      // Format the time as needed (e.g., add leading zeros)
      const formattedHours = String(hours).padStart(2, '0');
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');

      return (
        <span className='text-base'>
          Refreshes in {formattedHours}:{formattedMinutes}:{formattedSeconds}
        </span>
      );
    }
  };

  return <Countdown date={targetTime} renderer={renderer} />;
};

export default CountdownTimer;