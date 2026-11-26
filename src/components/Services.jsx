
import {
  Activity,
  HeartPulse,
  Footprints,
  Accessibility,
  Stethoscope,
  Bone,
  Brain,
  Hand,
  Users,
  ArrowRight
} from "lucide-react";

import { departments, doctors } from "../data";

const serviceIcons = {
  1: Activity,
  2: HeartPulse,
  3: Footprints,
  4: Accessibility,
  5: Stethoscope,
  6: Bone,
  7: Brain,
  8: Hand,
  9: Users,
  10: Hand
};

function Services({ onViewSpecialists, disabled }) {
  return (
    <section className="services-section" id="services">

      <div className="directory-heading">
        <div>
          <div className="eyebrow">
            SPECIALIZED HEALTHCARE
          </div>

          <h2>Our Services</h2>

          <p>
            Explore our specialized healthcare services
            and find the right care for your needs.
          </p>
        </div>

        <span className="directory-count">
          {departments.length} Departments
        </span>
      </div>

      <div className="services-grid">

        {departments.map(department => {

          const Icon =
            serviceIcons[department.id] || HeartPulse;

          const specialistCount = doctors.filter(
            doctor =>
              doctor.departmentId === department.id
          ).length;

          return (
            <article
              className="service-card"
              key={department.id}
            >

              <div className="service-card-icon">
                <Icon size={25} />
              </div>

              <h3>{department.name}</h3>

              <p>{department.description}</p>

              <div className="service-card-footer">

                <span className="specialist-count">
                  <Users size={15} />

                  {specialistCount}{" "}
                  {specialistCount === 1
                    ? "Specialist"
                    : "Specialists"}
                </span>

                <button
                  type="button"
                  className="view-specialists"
                  disabled={disabled}
                  onClick={() =>
                    onViewSpecialists(department.name)
                  }
                >
                  View Specialists
                  <ArrowRight size={16} />
                </button>

              </div>

            </article>
          );
        })}

      </div>

    </section>
  );
}

export default Services;
