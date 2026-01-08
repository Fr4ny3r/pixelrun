import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { AuthButtons } from "./AuthButtons" // Importa el componente que creamos arriba

export default async function Navigation() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="relative md:absolute right-0 m-5 rounded-b-xl ">
      {/* Pasamos la sesión al componente de cliente */}
      <AuthButtons session={session} />
      <div className="absolute hidden md:block -z-100 flex flex-col justify-between top-0 h-screen">
        <div className=""></div>
        <div className="border-3 italic border-white/20 w-[200px] h-[70dvh] mb-10 flex justify-center items-center">
          *anuncio*
        </div>
      </div>
    </nav>
  )
}