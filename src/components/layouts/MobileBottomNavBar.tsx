import {Link} from "@tanstack/react-router";
import {Button} from "../ui/button";
import {HomeIcon} from "lucide-react";

const MobileBottomNavBar = () => {
  return (
    <nav className="h-20 bg-background
    fixed bottom-0 w-full flex items-center
    justify-between
    ">
      <Button
        asChild
        variant="link"
        className="text-primary"
      >
        <Link to="/">
          <HomeIcon/>
        </Link>
      </Button>
    </nav>
  )
}

export default MobileBottomNavBar