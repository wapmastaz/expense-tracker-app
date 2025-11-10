import {Link} from "@tanstack/react-router";
import {Image} from "@unpic/react";

const menuItems = [
  {
    id: 1,
    name: "Home",
    icon: './mobile-icons/home.png',
    url: "/"
  },
  {
    id: 2,
    name: "Reports",
    icon: './mobile-icons/report.png',
    url: "/"
  },
  {
    id: 3,
    name: "Expenses",
    icon: './mobile-icons/wallet.png',
    url: "/"
  },
  {
    id: 4,
    name: "Profile",
    icon: './mobile-icons/user.png',
    url: "/profile"
  }
];

const MobileBottomNavBar = () => {
  return (
    <nav className="h-20 bg-background
    fixed bottom-0 w-full flex items-center
    justify-between
    ">
      {menuItems.map(({id, url, icon, name}) => (
        <Link
          key={id}
          className="flex
          items-center h-full text-gray-500
        px-4"
          to={url}>
          <Image
            src={icon}
            width={34}
            height={34}
            alt={`${name} icon`}
          />
        </Link>
      ))}


    </nav>
  )
}

export default MobileBottomNavBar