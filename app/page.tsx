import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Wallet } from './components/Wallet'
import { useWallet } from './components/WalletContext'
import AdBanner from "./components/AdBanner";

export default async function App() {
  const session = await getServerSession(authOptions);

  function PixelButton({
    color,
    children,
    onClick
  }: {
    color: string
    children: React.ReactNode
    onClick?: () => void
  }) {
    return (
      <button
        onClick={onClick}
        className="bottom-0 left-0 text-2xl w-full h-full relative cursor-pointer font-bold hover:brightness-130 "
        style={{ color }}
      >
        <div className="relative h-full py-2 sm:py-5 px-4">
          <div className="verticalStick absolute left-0 top-0 w-1 h-full py-2">
            <div className={`w-full h-full bg-[${color}]`}></div>
          </div>
          <div className="verticalStick absolute right-0 top-0 w-1 h-full py-2">
            <div className={`w-full h-full bg-[${color}]`}></div>
          </div>
          <div className="horizontalStick absolute left-0 top-0 w-full h-1 px-2">
            <div className={`w-full h-full rounded-r-full bg-[${color}]`}></div>
            <div className={`absolute w-3 right-0 rotate-45 h-full bg-[${color}]`}></div>
            <div className={`absolute w-1 left-1 h-full bg-[${color}]`}></div>
          </div>
          <div className="horizontalStick absolute left-0 bottom-0 w-full h-1 px-2">
            <div className={`-translate-y-4 w-full h-5 bg-[${color}]`}></div>
            <div className={`absolute w-3 left-0 rotate-45 -translate-y-6 h-1 bg-[${color}]`}></div>
            <div className={`absolute w-2 left-0 rotate-45 -translate-y-10 h-1 bg-[${color}]`}></div>
            <div className={`absolute w-1 right-1 h-5 -translate-y-10 bg-[${color}]`}></div>
            <div className={`absolute w-1 left-1 h-4 -translate-y-9 rounded-b-full bg-[${color}]`}></div>
          </div>
          <span className="block flex gap-2 h-full justify-center items-center -translate-y-2">
          {children}
          </span>
        </div>
      </button>
    )
  }

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
                    <>
                    <div className="flex items-center my-10  gap-2">
                    <span className="uppercase max-w-75 truncate">hola, {session && session?.user?.name?.split(" ")[0]}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><title>mood-happy</title><path fill="currentColor" d="M5 3h14v2H5zm0 16H3V5h2zm14 0v2H5v-2zm0 0h2V5h-2zM10 8H8v2h2zm4 0h2v2h-2zm-5 6v-2H7v2zm6 0v2H9v-2zm0 0h2v-2h-2z"/></svg>
                    </div>
                    <div className="hidden sm:flex justify-center items-center w-full h-1/2">
                      <span className="h-full w-7/8 border-5 border-[var(--foreground)]"></span>
                    </div>
                    </>
                    )
                  :
                  (
                    <span></span>
                    )}
                </div>

              </div>
            </div> 

             <div className=" sm:col-span-2 hidden md:flex justify-center items-center sm:row-span-3 sm:col-start-4 sm:row-start-3 relative">
              a
              {/* <AdBanner dataAdSlot="5204881093" /> */}
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

                {/*  apartado de pc */}
                  <div className=" px-5 my-8 hidden gap-3 sm:flex sm:itmes-start">
                  <a href="https://github.com/Fr4ny3r/pixelrun" target="_blank"  className="flex items-center justify-center w-1/2 h-full gap-2">
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
                  <div className="hidden xl:flex justify-center items-center w-full">
                    <AdBanner dataAdSlot="5204881093" />
                  </div>

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
                  <div className="w-full h-full bg-[var(--foreground)] text-4xl flex gap-2 justify-center items-center text-[var(--background)]">
          
                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><title>coin</title><path fill="currentColor" d="M6 2h12v2H6zM4 6V4h2v2zm0 12V6H2v12zm2 2v-2H4v2zm12 0v2H6v-2zm2-2v2h-2v-2zm0-12h2v12h-2zm0 0V4h-2v2zm-9-1h2v2h3v2h-6v2h6v6h-3v2h-2v-2H8v-2h6v-2H8V7h3z"/></svg>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><title >avatar-circle-sharp</title><path fill="currentColor" d="M6 2h12v2H6zm0 18h12v2H6zM2 6h2v12H2zm18 0h2v12h-2zM6 18h2v2H6zm10 0h2v2h-2zm2-14h2v2h-2zM4 4h2v2H4zm0 14h2v2H4zm14 0h2v2h-2zM6 16h12v2H6zm2-4h8v2H8zm0-4h2v4H8zm0-2h8v2H8zm6 2h2v4h-2z"/></svg> */}
                     
                  </div>
                </div>  
                <div className="px-2 sm:h-9/12 sm:mt-1 flex items-center justify-center">
                  <div className="flex flex-col justify-start items-start gap-5 w-full h-full p-2">
                    <span className="w-full h-fit flex justify-center items-center flex-col gap-2">
                      <PixelButton color="var(--foreground)">
                        Gana Jugando
                      </PixelButton>
                      <PixelButton color="var(--foreground)">
                        Gana viendo
                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><title>play</title><path fill="currentColor" d="M15 11h-2V9h2zm0 4h-2v-2h2zm-2 2h-2v-2h2zm0-8h-2V7h2zm-2-2H9V5h2zM9 21H7V3h2zm6-8h2v-2h-2zm-6 4h2v2H9z"/></svg> */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><title >video</title><path fill="currentColor" d="M20 17V7h2v10zm-2-2V9h2v6zM2 7h2v10H2zm14 0h2v10h-2zM4 5h12v2H4zm0 12h12v2H4z"/></svg>
                      </PixelButton>
                    </span>
                  </div>
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
                    
                  <div className="w-full h-full bg-[var(--foreground)] text-4xl flex gap-2 justify-center items-center text-[var(--background)]">
          
                    <svg xmlns="http://www.w3.org/2000/svg" className="flex  xl:hidden " width="2em" height="2em" viewBox="0 0 24 24"><title>coin</title><path fill="currentColor" d="M6 2h12v2H6zM4 6V4h2v2zm0 12V6H2v12zm2 2v-2H4v2zm12 0v2H6v-2zm2-2v2h-2v-2zm0-12h2v12h-2zm0 0V4h-2v2zm-9-1h2v2h3v2h-6v2h6v6h-3v2h-2v-2H8v-2h6v-2H8V7h3z"/></svg>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><title >avatar-circle-sharp</title><path fill="currentColor" d="M6 2h12v2H6zm0 18h12v2H6zM2 6h2v12H2zm18 0h2v12h-2zM6 18h2v2H6zm10 0h2v2h-2zm2-14h2v2h-2zM4 4h2v2H4zm0 14h2v2H4zm14 0h2v2h-2zM6 16h12v2H6zm2-4h8v2H8zm0-4h2v4H8zm0-2h8v2H8zm6 2h2v4h-2z"/></svg> */}
                     
                  </div>
                  </div>
                </div>  
                <div className="relative px-2 flex items-center">

                  <div className="xl:hidden flex flex-col justify-start items-start gap-5 w-full h-full p-2 py-5 pb-6">
                    <span className="w-full h-fit hidden sm:flex justify-center items-center flex-col gap-2">
                      <PixelButton color="var(--foreground)">
                        Gana Jugando
                      </PixelButton>
                      <PixelButton color="var(--foreground)">
                        Gana viendo
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><title >video</title><path fill="currentColor" d="M20 17V7h2v10zm-2-2V9h2v6zM2 7h2v10H2zm14 0h2v10h-2zM4 5h12v2H4zm0 12h12v2H4z"/></svg>
                      </PixelButton>
                    </span>

                    <span className=" w-full h-50 sm:hidden flex justify-center items-center flex-col gap-2">
                      <PixelButton color="var(--foreground)">
                        Gana Jugando
                      </PixelButton>
                      <PixelButton color="var(--foreground)">
                        Gana viendo
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><title >video</title><path fill="currentColor" d="M20 17V7h2v10zm-2-2V9h2v6zM2 7h2v10H2zm14 0h2v10h-2zM4 5h12v2H4zm0 12h12v2H4z"/></svg>
                      </PixelButton>
                    </span>
                    {/* <span className="w-full h-fit hidden sm:flex justify-center items-center flex-col gap-2">
                      <PixelButton color="var(--foreground)">
                        Gana Jugando
                      </PixelButton>
                      <PixelButton color="var(--foreground)">
                        Gana viendo
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24"><title >video</title><path fill="currentColor" d="M20 17V7h2v10zm-2-2V9h2v6zM2 7h2v10H2zm14 0h2v10h-2zM4 5h12v2H4zm0 12h12v2H4z"/></svg>
                      </PixelButton>
                    </span> */}
                  </div>
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