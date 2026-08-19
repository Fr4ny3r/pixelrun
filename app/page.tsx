import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AdBanner from "./components/AdBanner";

export default async function App() {
  const session = await getServerSession(authOptions);
    return (
      <main className="h-[100dvh] w-[100%] text-lg md:text-2xl flex md:grid md:grid-cols-[1fr_250px]">
        <div className="parent  h-fit sm:h-full sm:grid flex flex-col gap-4 px-3 py-5 w-full">

          <div className="col-span-3 row-span-3 xl:col-span-2 xl:row-span-3 relative">
             <div className="relative w-full h-full top-0 left-0 z-100">
                <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick relative left-0 top-0 w-full h-25 mt-1 px-2">
                  <div className="w-full h-full bg-[var(--foreground)] text-[var(--background)] uppercase px-2 flex justify-center items-center text-5xl">
                    Pixelrun
                  </div>
                </div>  
                <div className=" px-7 sm:h-9/12 sm:mt-1 flex flex-col text-3xl pt-5">
                  {session ? 
                  (
                    <div className="flex items-center gap-2">
                    <span className="uppercase max-w-75 truncate">hola, {session && session?.user?.name?.split(" ")[0]}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><title>mood-happy</title><path fill="currentColor" d="M5 3h14v2H5zm0 16H3V5h2zm14 0v2H5v-2zm0 0h2V5h-2zM10 8H8v2h2zm4 0h2v2h-2zm-5 6v-2H7v2zm6 0v2H9v-2zm0 0h2v-2h-2z"/></svg>
                    </div>
                    )
                  :
                  (
                    <span></span>
                    )}
                </div>

              </div>
            </div> 

             <div className=" sm:col-span-2  flex justify-center items-center sm:row-span-3 sm:col-start-4 sm:row-start-3 relative">
              <AdBanner dataAdSlot="5204881093" />
            {/* <div className="relative w-full h-full top-0 left-0 z-100">

                <div className="horizontalStick absolute left-0 top-1/2 mt-2 translate-y-1/2 w-full h-10 px-2">
                  <div className="w-full h-full absolute flex justify-between">
                    <div className="w-8 h-8 relative -translate-y-1/1 bg-[var(--foreground)]"></div>
                    <div className="w-8 h-8 relative -translate-y-1/1 -translate-x-1/2 bg-[var(--foreground)]"></div>
                  </div>
                  <div className="w-full h-6 px-6 relative flex justify-between">
                    <div className="w-13 h-full bg-[var(--foreground)]"></div>
                    <div className="w-13 h-full bg-[var(--foreground)]"></div>
                  </div>
                  <div className="w-full h-6 px-19 relative flex justify-between">
                    <div className="w-13 h-full bg-[var(--foreground)]"></div>
                    <div className="w-13 h-full bg-[var(--foreground)]"></div>
                  </div>
                  <div className="w-full h-6 px-32 relative flex justify-between">
                    <div className="w-13 h-full bg-[var(--foreground)]"></div>
                    <div className="w-13 h-full bg-[var(--foreground)]"></div>
                  </div>
                  <div className="w-full h-6 px-45 relative flex justify-center">
                    <div className="w-full h-full bg-[var(--foreground)]"></div>
                  </div>
                </div>

                <div className="horizontalStick flex flex-col justify-end absolute left-0 top-1/2 mt-2 -translate-y-38 w-full h-fit px-6">
                  <div className="w-full h-9 px-40 relative flex justify-between">
                    <div className="w-full h-full bg-[var(--foreground)]"></div>
                  </div>
                  <div className="w-full h-9 px-28 relative flex justify-between">
                    <div className="w-full h-full bg-[var(--foreground)]"></div>
                  </div>
                  <div className="w-full h-9 px-14 relative flex justify-between">
                    <div className="w-full h-full bg-[var(--foreground)]"></div>
                  </div>
                  <div className="w-full h-9 relative flex justify-between">
                    <div className="w-full h-full bg-[var(--foreground)]"></div>
                  </div>
                </div>
                <div className="verticalStick absolute left-0 bottom-0 w-2 h-1/2 py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 bottom-0 w-2 h-1/2 py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick relative left-0 top-0 w-full h-3 mt-1 px-2">
                  <div className="w-full h-full bg-[var(--foreground)] text-[var(--background)]">
                    cabeza
                  </div>
                </div>  
                <div className=" px-2 sm:h-9/12 sm:mt-1 flex items-center">
                  contenidoa
                </div>
              </div>*/}
            </div> 

            <div className=" sm:col-span-3 sm:row-span-2 sm:col-start-1 sm:row-start-4 relative">
             <div className="relative w-full h-full top-0 left-0 z-100">
                <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick relative left-0 top-0 w-full h-15 mt-1 px-2">
                  <div className="w-full h-full bg-[var(--foreground)] text-[var(--background)] gap-2 flex items-center px-2">
                    <span className="bg-[var(--background)] block w-8 h-8"></span>
                    <span className="bg-[var(--background)] block w-8 h-8"></span>
                    <span className="bg-[var(--background)] block w-8 h-8"></span>
                  </div>
                </div>  
                <div className=" px-2 sm:h-8/12 sm:mt-1 flex items-center">
                  contenido
                </div>
              </div>
            </div>

            <div className=" sm:row-span-3 sm:col-start-3 sm:row-start-1 absolute xl:relative hidden xl:block">
             <div className="relative w-full h-full top-0 left-0 z-100">
                <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick relative left-0 top-0 w-full h-25 mt-1 px-2">
                  <div className="w-full h-full bg-[var(--foreground)] text-[var(--background)]">
                    cabeza
                  </div>
                </div>  
                <div className=" px-2 sm:h-9/12 sm:mt-1 flex items-center">
                  contenido
                </div>
              </div>
            </div>

            <div className=" col-span-2 row-span-2 col-start-4 row-start-1 relative">
             <div className="relative w-full h-full top-0 left-0 z-100">
                <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick relative left-0 top-0 w-full h-25 mt-1 px-2">
                  <div className="w-full h-full bg-[var(--foreground)] text-[var(--background)]">
                    cabeza
                  </div>
                </div>  
                <div className=" px-2 sm:h-8/12 sm:mt-1 flex items-center">
                  contenido
                </div>
              </div>
            </div>
        </div>
{/*        <div className="absolute w-full h-full top-0 left-0 z-100">
          <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
            <div className="w-full h-full bg-[var(--foreground)]"></div>
          </div>
          <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
            <div className="w-full h-full bg-[var(--foreground)]"></div>
          </div>
          <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
            <div className="w-full h-full bg-[var(--foreground)]"></div>
          </div>
          <div className="horizontalStick absolute left-0 top-0 w-full h-25 mt-1 px-2">
            <div className="w-full h-full bg-[var(--foreground)]">
              cabeza
            </div>
          </div>
        </div>*/}
      </main>
    )

}