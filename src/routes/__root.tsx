import {Outlet, createRootRouteWithContext} from '@tanstack/react-router'
import {Toaster} from "sonner";
import type {AuthContext} from "@/store/auth-store.ts";
import MobileBottomNavBar from "@/components/layouts/MobileBottomNavBar.tsx";

type RouterContext = {
  auth: AuthContext;
};
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors={true} position={"top-right"} />
      <MobileBottomNavBar/>
    </>
  ),
})