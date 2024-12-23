import { useEffect } from "react";
import { logout } from "../../services/UserApiService";

const Logout = () => {
  useEffect(() => {
    logout();
    window.location.href = "/";
  }, []);

  return null;
};

export default Logout;
