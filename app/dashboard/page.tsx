// app/dashboard/page.tsx
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Wallet } from '../components/Wallet'
import { WalletProvider } from '../components/WalletContext'

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <>
{/*     <WalletProvider>
       <h1>Dashboard</h1>
       <Wallet />
       <Play />
       <AddBonus />
     </WalletProvider>*/}
    No
    </>
  )
}