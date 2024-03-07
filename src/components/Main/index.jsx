import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <ul className="flex space-x-4">
        <li>
          <a href="/login" className="text-white">
            Home
          </a>
        </li>
        <li>
          <a href="/" className="text-white">
            About
          </a>
        </li>
        <li>
          <a href="/" className="text-white">
            Contact
          </a>
        </li>
      </ul>{" "}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex justify-right">
              Profile
            </NavigationMenuTrigger>

            <NavigationMenuContent>
              <NavigationMenuLink>
                <Button onClick={handleLogout}>Logout</Button>
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};

export default Main;
