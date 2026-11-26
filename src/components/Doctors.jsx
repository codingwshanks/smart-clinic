
import { useState } from "react";
import { doctors, departments } from "../data";

import {
  Stethoscope,
  CalendarDays,
  Search,
  Award,
  ArrowRight,
  Users
} from "lucide-react";

function Doctors({
  selectedService,
  onServiceChange,
  onBookAppointment,
  disabled
}) {

  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter(doctor => {

    const matchesService =
      selectedService === "All Services" ||
      doctor.service === selectedService;

    const matchesSearch =
      doctor.name.toLowerCase().includes(
        search.toLowerCase().trim()
      ) ||
      doctor.service.toLowerCase().includes(
        search.toLowerCase().trim()
      );

    return matchesService && matchesSearch;
  });

  return (
    <section className="doctors-section" id="specialists">

      <div className="directory-heading">
        <div>
          <div className="eyebrow">
            OUR HEALTHCARE TEAM
          </div>

          <h2>Meet Our Specialists</h2>

          <p>
            Find the right specialist for your
            healthcare needs.
          </p>
        </div>

        <span className="directory-count">
          {filteredDoctors.length} Specialists
        </span>
      </div>

      <div className="doctor-filters">

        <div className="doctor-search">
          <Search size={19} />

          <input
            type="text"
            aria-label="Search specialists"
            placeholder="Search doctor or specialization..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select
          aria-label="Filter specialists by service"
          value={selectedService}
          onChange={e =>
            onServiceChange(e.target.value)
          }
        >
          <option>All Services</option>

          {departments.map(department => (
            <option key={department.id}>
              {department.name}
            </option>
          ))}
        </select>

      </div>

      <div className="doctors-grid">

        {filteredDoctors.map(doctor => (

          <article
            className="specialist-card"
            key={doctor.id}
          >

            <div className="specialist-cover">

              <div className="specialist-avatar">
                {doctor.name
                  .replace("Dr. ", "")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>

            </div>

            <div className="specialist-body">

              <h3>{doctor.name}</h3>

              <span className="specialist-department">
                <Stethoscope size={15} />
                {doctor.service}
              </span>

              <div className="specialist-experience">
                <Award size={17} />
                {doctor.experience} years of experience
              </div>

              <p>{doctor.description}</p>

              <button
                type="button"
                className="primary specialist-book"
                disabled={disabled}
                onClick={() =>
                  onBookAppointment(doctor)
                }
              >
                <CalendarDays size={17} />
                Book Appointment
                <ArrowRight size={16} />
              </button>

            </div>

          </article>
        ))}

      </div>

      {filteredDoctors.length === 0 && (

        <div className="no-specialists">
          <Users size={38} />

          <h3>No specialists found</h3>

          <p>Try another name or department.</p>

          <button
            className="secondary"
            onClick={() => {
              setSearch("");
              onServiceChange("All Services");
            }}
          >
            Clear Filters
          </button>
        </div>

      )}

    </section>
  );
}

export default Doctors;
