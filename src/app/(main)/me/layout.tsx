import '@/app/globals.css'
import Application from '@/components/Application'
import BottomNavBar from '@/components/bottom-nav-bar/BottomNavBar'

export default function MeLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Application
      bottom={<BottomNavBar />}
    >
      {children}
    </Application>
  )
}
