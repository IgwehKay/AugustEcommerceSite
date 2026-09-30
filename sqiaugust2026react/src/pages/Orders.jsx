import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Orders = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token || !user) {
      navigate("/login", { replace: true });
    }
  }, [navigate, token, user]);

  return (
    <div>View your orders</div>
  )
}

export default Orders