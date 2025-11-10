import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import {Toaster} from "sonner";
import MobileBottomNavBar from "@/components/layouts/MobileBottomNavBar.tsx";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors />
      <MobileBottomNavBar/>
      {/*<TanStackDevtools*/}
      {/*  config={{*/}
      {/*    position: 'bottom-right',*/}
      {/*  }}*/}
      {/*  plugins={[*/}
      {/*    {*/}
      {/*      name: 'Tanstack Router',*/}
      {/*      render: <TanStackRouterDevtoolsPanel />,*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*/>*/}
    </>
  ),
})
