import {createFileRoute, Link} from '@tanstack/react-router'
import {Button} from "@/components/ui/button.tsx";
import {ChevronLeft} from "lucide-react";

export const Route = createFileRoute('/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <header
      className="bg-primary h-60 flex
      items-center
      ">
      <div className="container">
        <div className="flex justify-between items-center">
          <Button
            size="icon-lg"
            className="text-background w-10 h-10"
            asChild
          >
            <Link to="/">
              <ChevronLeft/>
            </Link>
          </Button>

          <h3 className="text-lg text-background font-semibold">Register</h3>

          <span></span>
        </div>
      </div>
    </header>
  )
}
