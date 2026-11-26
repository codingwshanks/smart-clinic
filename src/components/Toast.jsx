
import { useEffect } from "react";
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X
} from "lucide-react";

function Toast({ toast, onClose }) {

  useEffect(() => {

    if (!toast) return;

    const timer = setTimeout(onClose, 5000);

    return () => clearTimeout(timer);

  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info
  };

  const Icon = icons[toast.type] || Info;

  return (

    <div
      key={toast.id}
      className={`toast-notification toast-${toast.type}`}
      role={toast.type === "error" ? "alert" : "status"}
    >

      <div className="toast-content">

        <div className="toast-icon">
          <Icon size={22} />
        </div>

        <div className="toast-text">

          <strong>{toast.title}</strong>

          <p>{toast.message}</p>

        </div>

        <button
          type="button"
          className="toast-close"
          onClick={onClose}
          aria-label="Close notification"
        >
          <X size={17} />
        </button>

      </div>

      <div className="toast-progress" />

    </div>

  );
}

export default Toast;
