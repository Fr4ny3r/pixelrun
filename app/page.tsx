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
                <div className=" px-7 sm:h-9/12 sm:mt-1 flex flex-col text-3xl">
                  {session ? 
                  (
                    <div className="flex items-center my-10  gap-2">
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
                  <div className="w-full h-full bg-[var(--foreground)] text-[var(--background)] gap-2 flex flex-row-reverse text-2xl justify-between items-center px-2 pr-8">
                    Social Red
                    <div className="flex flex-row-reverse gap-2">
                    <span className="bg-[var(--background)] block w-8 h-8"></span>
                    <span className="bg-[var(--background)] block w-8 h-8"></span>
                    <span className="bg-[var(--background)] block w-8 h-8"></span>
                    </div>

                  </div>
                </div>  
                  <div className=" px-2 my-8 hidden sm:flex sm:itmes-start">
                    contenidoasdasdad
                  </div>
                {/*  apartado de telefono */}
                <div className="px-5 sm:hidden flex flex-row-reverse justify-between items-center py-4 pb-7">
                  <a href="https://github.com/Fr4ny3r/pixelrun" target="_blank"  className="flex items-center justify-center w-full h-full gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="5em" height="5em" viewBox="0 0 12 12"><title >github</title><path fill="currentColor" d="M2 12h2v-1H3v-1H2V9H1V8h1v1h1v1h1V9h1V8H3V7H2V4h1V2h1v1h3V2h1v2h1v3H8v1H6v1h1v3h2v-1h1v-1h1V3h-1V2H9V1H2v1H1v1H0v7h1v1h1Zm0 0"/></svg>
                  </a>

                  <div className="flex flex-col gap-2 py-5">
                    <a href="https://www.instagram.com/pixelrun10/" target="_blank" className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><title >instagram</title><path fill="currentColor" d="M18 22H6v-2h12zM6 20H4v-2h2zm14 0h-2v-2h2zM4 18H2V6h2zm18 0h-2V6h2zm-8-2h-4v-2h4zm-4-2H8v-4h2zm6 0h-2v-4h2zm-2-4h-4V8h4zm4-2h-2V6h2zM6 6H4V4h2zm14 0h-2V4h2zm-2-2H6V2h12z"/></svg>
                      <span className="text-2xl">Pixelrun10</span>
                    </a>
                    
                    <a href="https://www.instagram.com/pixelrun10/" target="_blank" className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><title >facebook</title><path fill="currentColor" d="M11 12H8v2h3v6h2v-6h4v-2h-4V6h4V4h-4V2h6v6h-4v2h4v6h-4v6H9v-6H6v-6h3V6h2zm2-6h-2V4h2z"/></svg>
                      <span className="text-2xl">Pixelrun10</span>
                    </a>
                  </div>
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