import {StrictMode} from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider, createRouter} from '@tanstack/react-router'

// Import the generated route tree
import {routeTree} from './routeTree.gen'

import './styles.css'
import reportWebVitals from './reportWebVitals.ts'

// @ts-ignore
import '@fontsource-variable/inter';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import useAuthStore from "@/store/auth-store.ts";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Create a client
const queryClient = new QueryClient()

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const InnerApp = () => {
  const auth = useAuthStore();
  return  <RouterProvider router={router} context={{auth}}/>
}

// Render the app
const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
       <InnerApp/>
      </QueryClientProvider>
    </StrictMode>,
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
