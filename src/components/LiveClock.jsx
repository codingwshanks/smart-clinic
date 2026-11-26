
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

function LiveClock() {

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const indianTime = currentTime.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });

  const indianDate = currentTime.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  return (

    <div className="live-clock">

      <div className="live-clock-icon">
        <Clock size={20} />
      </div>

      <div className="live-clock-details">

        <span className="live-clock-time">
          {indianTime.toUpperCase()}
        </span>

        <span className="live-clock-date">
          {indianDate} · IST
        </span>

      </div>

      <span className="live-clock-dot"></span>

    </div>

  );
}

export default LiveClock;
