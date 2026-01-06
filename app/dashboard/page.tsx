// app/dashboard/page.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import {Wallet, Play, AddBonus} from '../components/Wallet'
import { WalletProvider } from '../components/WalletContext'

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  return (
    <WalletProvider> {/* Los Server Components pueden renderizar Client Providers */}
      <h1>Dashboard</h1>
      <Wallet />
      <Play />
      <AddBonus />
    </WalletProvider>
  )
}