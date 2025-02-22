import { LogOut } from "lucide-react";
import { ModeToggle } from "../toggle";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div className="flex justify-between p-5 md:p-6">
      <h2 className="fn  text-3xl md:text-4xl">LessonPlanner</h2>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <button onClick={handleLogout}>
          <LogOut />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
