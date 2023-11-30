import { useNavigate } from "react-router-dom";

export function ErrorOutside(location, title, message, color, navigate) {
    const error = {
        title,
        message,
        color,
        location
    }
    navigate(location, { state: { error } });
    console.log("ErrorOutside");
  }


