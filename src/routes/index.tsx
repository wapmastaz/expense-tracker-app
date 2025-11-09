import {createFileRoute, Link} from '@tanstack/react-router'

import {Image} from "@unpic/react";
import {Button} from "@/components/ui/button.tsx";
import {ArrowRight} from "lucide-react";

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <section
      className="flex flex-col justify-center h-screen w-full bg-[url('./onboarding-bg.png')] bg-cover bg-center">
      {/*=== second column ====*/}
      <div className="flex full justify-center">
        <Image src="./o.png" height={286} width={324} className="h-auto" alt="Onboarding avatar image"/>
      </div>

      <div className="flex w-full">
        <div className="container">
          <div className="flex flex-col items-center gap-4">


            <h3 className="text-4xl text-center text-[#509792] font-bold">spend smarter save more</h3>

            {/*  get started button*/}
            <Button
              variant="default"
              size={"xl"}
              className="shadow-lg rounded-3xl w-full font-semibold text-base"
              asChild>
              <Link to="/register">
                Get Started
              </Link>
            </Button>

            {/*  login text */}
            <p className="text-sm text-muted-foreground ">
              Already have account?
              <Link className="text-primary pl-2 font-medium"
                    to="/login">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
