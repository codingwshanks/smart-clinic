
import {
  Sparkles,
  Bot,
  Activity,
  HeartPulse,
  Footprints,
  Bone,
  Accessibility,
  Stethoscope,
  CalendarDays,
  CalendarCheck,
  MessageSquare,
  ScanSearch,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  Send
} from "lucide-react";

import { doctors, departments } from "../data";

const concerns = [
  { name: "Back pain", Icon: Accessibility },
  { name: "Muscle stiffness", Icon: Activity },
  { name: "Sports injury", Icon: Footprints },
  { name: "Knee pain", Icon: Bone },
  { name: "Chronic pain", Icon: HeartPulse },
  { name: "Post surgery recovery", Icon: Stethoscope }
];

const steps = [
  {
    title: "Describe your concern",
    description: "Tell us about your symptoms or healthcare requirements.",
    Icon: MessageSquare
  },
  {
    title: "Find a specialist",
    description: "Explore a relevant healthcare department.",
    Icon: ScanSearch
  },
  {
    title: "Book your appointment",
    description: "Choose an available appointment and confirm your visit.",
    Icon: CalendarCheck
  }
];

function BookingAssistant({
  search,
  setSearch,
  message,
  setMessage,
  onRecommend,
  blocked
}) {

  function selectConcern(concern) {
    setSearch(concern);
    setMessage("");
  }

  function resetAssistant() {
    setSearch("");
    setMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!search.trim() || blocked) return;

    onRecommend();
  }

  return (
    <section className="ba-page" id="assistant">

      {/* HERO SECTION */}

      <div className="ba-hero">

        <div className="ba-hero-content">

          <div className="ba-eyebrow">
            <Sparkles size={17} />
            SMART HEALTHCARE ASSISTANT
          </div>

          <h1>
            Your journey to better
            <br />
            health starts here.
          </h1>

          <p>
            Describe your healthcare concerns and
            discover relevant specialists and
            available appointments.
          </p>

          <div className="ba-hero-stats">

            <span>
              <Stethoscope size={18} />
              {doctors.length} Specialists
            </span>

            <span>
              <HeartPulse size={18} />
              {departments.length} Departments
            </span>

            <span>
              <CalendarDays size={18} />
              Easy Scheduling
            </span>

          </div>

        </div>

        <div className="ba-hero-art" aria-hidden="true">

          <div className="ba-orbit ba-orbit-one"></div>
          <div className="ba-orbit ba-orbit-two"></div>

          <div className="ba-hero-icon">
            <HeartPulse size={95} strokeWidth={1.3} />
          </div>

          <div className="ba-floating-icon ba-float-one">
            <Stethoscope size={24} />
          </div>

          <div className="ba-floating-icon ba-float-two">
            <CalendarCheck size={24} />
          </div>

          <div className="ba-floating-icon ba-float-three">
            <Sparkles size={23} />
          </div>

        </div>

      </div>

      {/* ASSISTANT PANEL */}

      <div className="ba-panel">

        <div className="ba-panel-header">

          <div className="ba-profile">

            <div className="ba-avatar">
              <Bot size={27} />
            </div>

            <div>
              <h3>SmartClinic Assistant</h3>

              <span className="ba-status">
                <i></i>
                Ready to assist you
              </span>
            </div>

          </div>

          <button
            type="button"
            className="ba-reset"
            onClick={resetAssistant}
            disabled={blocked}
          >
            <RefreshCw size={16} />
            Reset
          </button>

        </div>

        <div className="ba-conversation">

          <div className="ba-chat-row">

            <div className="ba-small-avatar">
              <Bot size={20} />
            </div>

            <div className="ba-chat-bubble">

              <h3>Hello! How can I help you today?</h3>

              <p>
                Tell me about your discomfort,
                injury or healthcare requirement.
                I'll help you explore a relevant
                specialist for your appointment.
              </p>

            </div>

          </div>

          {/* QUICK SELECT CONCERNS */}

          <div className="ba-concerns">

            <h4>COMMON HEALTHCARE CONCERNS</h4>

            <div className="ba-concerns-grid">

              {concerns.map(({ name, Icon }) => (

                <button
                  type="button"
                  key={name}
                  disabled={blocked}
                  className={
                    search === name
                      ? "ba-concern selected"
                      : "ba-concern"
                  }
                  onClick={() => selectConcern(name)}
                >

                  <div className="ba-concern-icon">
                    <Icon size={24} />
                  </div>

                  <span>{name}</span>

                  <ArrowRight
                    size={15}
                    className="ba-concern-arrow"
                  />

                </button>

              ))}

            </div>

          </div>

          {/* ASSISTANT RESPONSE */}

          {message && (

            <div className="ba-chat-row" role="status">

              <div className="ba-small-avatar">
                <Bot size={20} />
              </div>

              <div className="ba-chat-bubble">
                <p>{message}</p>
              </div>

            </div>

          )}

          {/* INPUT FORM */}

          <form
            className="ba-input-form"
            onSubmit={handleSubmit}
          >

            <label htmlFor="ba-description">
              Describe your concern
            </label>

            <textarea
              id="ba-description"
              placeholder="e.g. I have been experiencing lower back pain for the past two weeks..."
              value={search}
              disabled={blocked}
              maxLength={500}
              onChange={e => {
                setSearch(e.target.value);
                setMessage("");
              }}
            />

            <div className="ba-input-footer">

              <span>{search.length}/500 characters</span>

              <button
                type="submit"
                className="ba-submit"
                disabled={blocked || !search.trim()}
              >
                Find my specialist
                <Send size={17} />
              </button>

            </div>

          </form>

          <div className="ba-disclaimer">
            <ShieldCheck size={17} />

            <span>
              For appointment guidance only.
              This assistant does not provide
              medical diagnoses. For urgent or
              severe symptoms, seek medical care.
            </span>
          </div>

        </div>

      </div>

      {/* HOW IT WORKS */}

      <div className="ba-how">

        <div className="ba-how-heading">
          <div className="eyebrow">
            SIMPLE AND CONVENIENT
          </div>

          <h2>How does it work?</h2>

          <p>
            Find your specialist in three simple steps.
          </p>
        </div>

        <div className="ba-steps-grid">

          {steps.map(({ title, description, Icon }, i) => (

            <article className="ba-step" key={title}>

              <div className="ba-step-top">

                <div className="ba-step-icon">
                  <Icon size={25} />
                </div>

                <span>0{i + 1}</span>

              </div>

              <h3>{title}</h3>

              <p>{description}</p>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}

export default BookingAssistant;
