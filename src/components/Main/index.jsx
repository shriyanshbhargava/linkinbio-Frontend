import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useAuth } from "../../hooks/useAuth";

const Main = () => {
  const menu = [
    { label: "Home", link: "/login" },
    { label: "About", link: "/" },
    { label: "Contact", link: "/" },
  ];

  const { logoutUser } = useAuth();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      <ul className="flex space-x-4">
        {menu.map((item, index) => (
          <li key={index}>
            <a href={item.link} className="text-white">
              {item.label}
            </a>
          </li>
        ))}
      </ul>
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
