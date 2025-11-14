import { Outlet } from '@tanstack/react-router'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
