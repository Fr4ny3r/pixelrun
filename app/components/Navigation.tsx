import { getServerSession } from "next-auth"
import AdBanner from './AdBanner';
import { authOptions } from "../api/auth/[...nextauth]/route"
import { AuthButtons } from "./AuthButtons" // Importa el componente que creamos arriba

export default async function Navigation() {
  const session = await getServerSession(authOptions)
  const nivel = [
    {level: 1, progress: 20, comleted: true}, 
    {level: 2, progress: 40, comleted: true},
    {level: 3, progress: 60, comleted: true},
    {level: 4, progress: 80, comleted: false},
    {level: 5, progress: 100, comleted: false},
    {level: 6, progress: 120, comleted: false}
  ];

  return (
    <nav className="relative sm:flex md:block md:absolute right-0 m-5 mr-10 rounded-b-xl ">
      {/* Pasamos la sesión al componente de cliente */}
      <AuthButtons session={session} />
      <div className="w-full h-full px-4 hidden md:hidden sm:flex justify-center items-center">

                      <div className="flex flex-col text-3xl font-black gap-2 items-center w-full h-30">
                        <span>Level {` ${nivel.filter((n: any) => n.comleted).length} `}</span>
                        <div className="flex items-center justify-center gap-2 px-4 w-full h-10">
                          {nivel.map((n: any, index: number) => (
                            <div key={index} className={n.comleted ? "w-full h-5 border-2 border-[var(--foreground)] bg-[var(--foreground)] flex items-center justify-center" : "w-full h-5 border-2 border-[var(--foreground)] bg-[var(--background)] flex items-center justify-center"}>
                              <span></span>
                            </div>
                          ))}
                        </div>
                      </div>

      </div>
      <div className="-z-100 hidden md:flex flex-col justify-start items-center top-0 h-fit">
        <div className=" w-[200px] relative h-6/12 py-8 flex justify-center items-center">
          {/* <AdBanner dataAdSlot="5204881093" /> */}
          <div className="sm:flex flex-col py-4  text-4xl font-black gap-4 hidden items-center w-full h-full">
              <span>Level {` ${nivel.filter((n: any) => n.comleted).length} `}</span>
            <div className="flex flex-col items-center justify-center gap-2 px-8 w-full ">
              {nivel.map((n: any, index: number) => (
                <div key={index} className={n.comleted ? "w-full h-10 border-2 border-[var(--foreground)] bg-[var(--foreground)] flex items-center justify-center" : "w-full h-10 border-2 border-[var(--foreground)] bg-[var(--background)] flex items-center justify-center"}>
                  <span></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </nav>
  )
}