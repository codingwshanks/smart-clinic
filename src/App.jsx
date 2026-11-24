
import { useState, useEffect } from "react";
import { doctors, timeSlots } from "./data";
import "./App.css";
import { HeartPulse, CalendarDays, Stethoscope, LayoutDashboard, Sparkles, ChevronLeft, ChevronRight, Clock, CheckCircle, Lock, RefreshCw } from "lucide-react";
const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:5000"
}/api/appointments`;
function getLocalDate(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function App() {
  const [search, setSearch] = useState("");
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState(getLocalDate());
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("All Services");
  const [bookings, setBookings] = useState([]);

const [loading, setLoading] = useState(true);
const [saving, setSaving] = useState(false);
const [apiError, setApiError] = useState("");

async function fetchBookings() {
  try {
    setLoading(true);
    setApiError("");

    const response = await fetch(
      `${API_URL}/availability`
    );

    if (!response.ok) {
      throw new Error("Unable to fetch appointments");
    }

    const data = await response.json();

    setBookings(data);
    return true;

  } catch (error) {
    setApiError(error.message);
    return false;

  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  fetchBookings();
}, []);


  const services = [
    "All Services",
    ...new Set(doctors.map(d => d.service))
  ];

  const filteredDoctors = doctors.filter(
    d => service === "All Services" || d.service === service
  );

  function isBooked(doctorId, bookingDate, slot) {
    return bookings.some(
      b =>
        b.doctorId === doctorId &&
        b.date === bookingDate &&
        b.time === slot
    );
  }

  function isPastSlot(bookingDate, slot) {
    const [clock, period] = slot.split(" ");
    const [hours, minutes] = clock.split(":").map(Number);
    const hour = (hours % 12) + (period === "PM" ? 12 : 0);

    const slotDate = new Date(`${bookingDate}T${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00+05:30`);

    return slotDate <= new Date();
  }

  function recommendDoctor() {
    if (loading || saving || apiError) {
      setMessage("Appointment availability is currently unavailable.");
      return;
    }

    const input = search.toLowerCase().trim();

    if (!input) {
      setMessage("Please describe your requirement.");
      return;
    }

    const result = doctors.find(d =>
      d.keywords.some(k => input.includes(k))
    );

    if (!result) {
      setMessage("Please select a service manually.");
      return;
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    setDoctor(result);
    setService(result.service);
    setTime("");

    // Find the first available slot within 30 days.
    for (let i = 0; i < 30; i++) {
      const nextDate = new Date(tomorrow);
      nextDate.setDate(tomorrow.getDate() + i);

      const bookingDate = getLocalDate(nextDate);

      const availableSlot = timeSlots.find(
        slot => !isBooked(result.id, bookingDate, slot)
      );

      if (availableSlot) {
        setDate(bookingDate);
        setTime(availableSlot);
        setMessage(
          `Suggested service: ${result.service}. ` +
          `Your appointment has been prepared.`
        );
        return;
      }
    }

    setMessage("No available slots found in the next 30 days.");
  }

  function selectSlot(selectedDoctor, slot) {
    setDoctor(selectedDoctor);
    setTime(slot);
    setMessage("");
  }

  
async function bookAppointment(e) {
  e.preventDefault();

  if (saving || loading || apiError) {
    return;
  }

  if (!doctor || !date || !time || !name.trim()) {
    setMessage("Please complete all appointment details.");
    return;
  }

  if (
    isBooked(doctor.id, date, time) ||
    isPastSlot(date, time)
  ) {
    setMessage("This time slot is unavailable.");
    return;
  }

  try {
    setSaving(true);

    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        patientName: name.trim(),
        doctorId: doctor.id,
        date: date,
        time: time
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || "Booking failed.");

      if (response.status === 409) {
        await fetchBookings();
        setTime("");
      }

      return;
    }

    setMessage(
      `Appointment confirmed with ${doctor.name} on ${date} at ${time}.`
    );

    setBookings(previous => [
      ...previous,
      {
        doctorId: doctor.id,
        date,
        time
      }
    ]);

    setDoctor(null);
    setName("");
    setTime("");

    await fetchBookings();

  } catch (error) {
    setMessage("Unable to connect to the server. Please try again.");

  } finally {
    setSaving(false);
  }
}

  const today = getLocalDate();
  const anchor = new Date(`${date}T12:00:00`);
  anchor.setDate(anchor.getDate() - (anchor.getDay() + 6) % 7);
  const week = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(anchor);
    day.setDate(day.getDate() + i);
    return day;
  });
  const total = doctors.length * timeSlots.length;
  const bookedCount = doctors.reduce((n, d) => n + timeSlots.filter(t => isBooked(d.id, date, t)).length, 0);
  const availableCount = doctors.reduce((n, d) => n + timeSlots.filter(t => !isBooked(d.id, date, t) && !isPastSlot(date, t)).length, 0);
  const blocked = loading || saving || !!apiError;
  function changeDate(value) {
    if (value && value >= today && !saving) {
      setDate(value); setTime(""); setDoctor(null);
    }
  }
  function moveWeek(direction) {
    const next = new Date(`${date}T12:00:00`);
    next.setDate(next.getDate() + direction * 7);
    const value = getLocalDate(next);
    changeDate(value < today ? today : value);
  }
  const stats = [
    { label: "Specialists", value: doctors.length, Icon: Stethoscope },
    { label: "Daily slots", value: total, Icon: CalendarDays },
    { label: "Available slots", value: loading || apiError ? "—" : availableCount, Icon: CheckCircle },
    { label: "Booked slots", value: loading || apiError ? "—" : bookedCount, Icon: Clock }
  ];
  return (
    <div className="shell">
      <aside className="sidebar">
        <a className="brand" href="#dashboard"><span className="brand-icon"><HeartPulse /></span><span>My Pain Clinic<small>HEALTH & WELLNESS</small></span></a>
        <div className="nav-label">WORKSPACE</div>
        <nav>
          <a href="#dashboard"><LayoutDashboard size={19}/> Overview</a>
          <a href="#schedule"><CalendarDays size={19}/> Appointments</a>
          <a href="#specialists"><Stethoscope size={19}/> Specialists</a>
          <a href="#assistant"><Sparkles size={19}/> Booking assistant</a>
        </nav>
        <div className="side-note">PATIENT PORTAL<p>Find a specialist and schedule your next visit.</p></div>
      </aside>
      <main id="dashboard" className="workspace">
        <header className="topbar"><span>Patient portal / Appointments</span><span className="clinic-time"><Clock size={15}/> Clinic time · IST</span></header>
        <div className="intro"><div><div className="eyebrow">YOUR HEALTH, OUR PRIORITY</div><h1>Appointment dashboard</h1><p>Find the right specialist and book a convenient time.</p></div><a className="primary" href="#schedule">View schedule <CalendarDays size={18}/></a></div>
        <section className="stats">{stats.map(({label,value,Icon}) => <article className="stat" key={label}><span className="stat-icon"><Icon size={21}/></span><span>{label}</span><strong>{value}</strong></article>)}</section>
        <section className="assistant" id="assistant"><div className="eyebrow"><Sparkles size={17}/> SMART BOOKING ASSISTANT</div><h2>Not sure which specialist to choose?</h2><p>Describe your requirement for a keyword-based service suggestion.</p><div className="search-row"><input aria-label="Describe your requirement" placeholder="e.g. I have knee pain..." value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>{if(e.key === 'Enter') recommendDoctor();}}/><button disabled={blocked} onClick={recommendDoctor}>Find my specialist <Sparkles size={16}/></button></div><p className="feedback" aria-live="polite">{message}</p></section>
        <section className="schedule-section" id="schedule">
          <div className="section-head"><div><h2>Doctor schedule</h2><p>Select a date and an available appointment slot.</p></div><button className="secondary" disabled={loading || saving} onClick={fetchBookings}><RefreshCw size={16}/> Refresh</button></div>
          <div className="calendar-head"><strong>{anchor.toLocaleDateString('en-IN',{month:'long',year:'numeric'})}</strong><div className="calendar-actions"><button className="secondary" aria-label="Previous week" disabled={saving || getLocalDate(week[6]) <= today} onClick={()=>moveWeek(-1)}><ChevronLeft size={18}/></button><button className="secondary" disabled={saving} onClick={()=>changeDate(today)}>Today</button><button className="secondary" aria-label="Next week" disabled={saving} onClick={()=>moveWeek(1)}><ChevronRight size={18}/></button></div></div>
          <div className="week">{week.map(day=>{const value=getLocalDate(day);return <button key={value} disabled={value<today || saving} className={value===date?'day chosen':'day'} onClick={()=>changeDate(value)}><span>{day.toLocaleDateString('en-IN',{weekday:'short'})}</span><strong>{day.getDate()}</strong><small>{day.toLocaleDateString('en-IN',{month:'short'})}</small></button>})}</div>
          <div className="filters"><label>Service<select disabled={saving} value={service} onChange={e=>{setService(e.target.value);setDoctor(null);setTime('');}}>{services.map(s=><option key={s}>{s}</option>)}</select></label><label>Jump to date<input type="date" min={today} value={date} disabled={saving} onChange={e=>changeDate(e.target.value)}/></label></div>
          <div className="legend">{['Available','Booked','Unavailable','Selected'].map(s=><span key={s}><i className={s.toLowerCase()}/>{s}</span>)}</div>
          {loading && <p role="status">Loading appointment availability…</p>}{apiError && <p role="alert" className="error">{apiError}. Use Refresh to retry.</p>}
          <div className="table-wrapper" id="specialists"><table><thead><tr><th>Service</th><th>Specialist</th>{timeSlots.map(t=><th key={t}>{t}</th>)}</tr></thead><tbody>{filteredDoctors.map(d=><tr key={d.id}><td><span className="service-tag">{d.service}</span></td><td><div className="doctor"><span className="avatar">{d.name.replace('Dr. ','').slice(0,2).toUpperCase()}</span><div><strong>{d.name}</strong><small>{d.experience} years experience</small></div></div></td>{timeSlots.map(t=>{const booked=isBooked(d.id,date,t);const past=isPastSlot(date,t);const selected=doctor?.id===d.id&&time===t;const status=loading||apiError?'Unknown':booked?'Booked':past?'Unavailable':selected?'Selected':'Available';return <td key={t}><button className={`slot ${status.toLowerCase()}`} disabled={blocked||booked||past} onClick={()=>selectSlot(d,t)}>{booked?<Lock size={13}/>:selected?<CheckCircle size={13}/>:null}{status}</button></td>})}</tr>)}</tbody></table></div>
        </section>
        {doctor && time && <form className="booking-form" onSubmit={bookAppointment}><div><div className="eyebrow">YOUR APPOINTMENT</div><h2>Confirm your visit</h2><p>{doctor.name} · {doctor.service}</p><p>{date} · {time} IST</p></div><label>Patient name<input required maxLength={100} value={name} disabled={saving} onChange={e=>setName(e.target.value)} placeholder="Enter full name"/></label><button className="primary" disabled={blocked} type="submit">{saving?'Booking…':'Confirm appointment'} <CheckCircle size={18}/></button></form>}
        <footer>My Pain Clinic · Appointment scheduling portal</footer>
      </main>
    </div>
  );
}
export default App;
