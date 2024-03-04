function Countdown(){
    const [countdown, setCountdown] = useState({ hours: 0, minutes: 0, seconds: 0 });
    useEffect(() => {
        const targetTime = new Date();
        targetTime.setHours(10);  // Replace with your target hour
        targetTime.setMinutes(50);  // Replace with your target minute
        targetTime.setSeconds(0);  // Replace with your target second
    
        const updateCountdown = () => {
          const now = new Date();
          const difference = targetTime.getTime() - now.getTime();
    
          if (difference > 0) {
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
            setCountdown({ hours, minutes, seconds });
          }
        };
    
        const intervalId = setInterval(updateCountdown, 1000);
    
        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
      }, []);
    
      return (
        <div>
          <p>Next item shop in {`${countdown.hours}:${countdown.minutes}:${countdown.seconds}`}</p>
        </div>
      );
    };