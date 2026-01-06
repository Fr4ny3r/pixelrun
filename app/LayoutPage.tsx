import Navigation from './components/Navigation'
import { Suspense } from 'react'



export function LayoutPage({children}:{children: React.ReactNode}) {
  return(
    <>
      <Navigation />
      {children}
    </>
  )
} 