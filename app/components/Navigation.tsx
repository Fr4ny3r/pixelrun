import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { AuthButtons } from "./AuthButtons" // Importa el componente que creamos arriba

export default async function Navigation() {
  const session = await getServerSession(authOptions)

  return (
    <nav className="relative md:absolute right-0 m-5 mr-10 rounded-b-xl ">
      {/* Pasamos la sesión al componente de cliente */}
      <AuthButtons session={session} />
      <div className="absolute hidden md:block -z-100 flex flex-col justify-end items-end top-0 h-screen mt-75">
        <div className="italic w-[200px] relative h-[50dvh] flex justify-center items-center">
          *anuncio*
        </div>
      </div>
    </nav>
  )
}