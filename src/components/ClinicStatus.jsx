
import { useState, useEffect } from "react";
import { Building2 } from "lucide-react";

const OPEN_HOUR = 9;
const CLOSE_HOUR = 18;

function ClinicStatus() {

  const [now, setNow] = useState(new Date());

  useEffect(() => {

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  const indianHour = Number(
    now.toLocaleString("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      hourCycle: "h23"
    })
  );

  const indianDay = now.toLocaleDateString("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "long"
  });

  const isSunday = indianDay === "Sunday";

  const isOpen =
    !isSunday &&
    indianHour >= OPEN_HOUR &&
    indianHour < CLOSE_HOUR;

  let statusMessage;

  if (isOpen) {

    statusMessage = "Closes at 6:00 PM";

  } else if (isSunday) {

    statusMessage = "Opens Monday at 9:00 AM";

  } else if (indianHour < OPEN_HOUR) {

    statusMessage = "Opens today at 9:00 AM";

  } else if (indianDay === "Saturday") {

    statusMessage = "Opens Monday at 9:00 AM";

  } else {

    statusMessage = "Opens tomorrow at 9:00 AM";

  }

  return (

    <div className="clinic-status-card">

      <div className="clinic-status-heading">
        <Building2 size={17} />
        <span>Clinic Status</span>
      </div>

      <div
        className={`clinic-status-indicator ${
          isOpen ? "clinic-open" : "clinic-closed"
        }`}
      >

        <div className="clinic-status-label">

          <span className="clinic-status-dot" />

          {isOpen ? "Clinic Open" : "Clinic Closed"}

        </div>

        <small>{statusMessage}</small>

      </div>

      <div className="clinic-working-hours">

        <span>Working hours (IST)</span>

        <strong>9:00 AM – 6:00 PM</strong>

        <small>Monday – Saturday</small>

      </div>

      <div className="clinic-online-booking">
        Online booking available 24/7
      </div>

    </div>

  );
}

export default ClinicStatus;
