"use client"
import { signIn } from "next-auth/react"

export default function login() {
  return(
    <section className="fixed top-0 left-0 z-10000 w-full h-full flex flex-col gap-8 justify-center items-center bg-[var(--background)]">
          
          <div className="relative w-2/3">
                      <div className="col-span-3 row-span-3 xl:col-span-2 xl:row-span-3 relative">
                 <div className="relative w-full h-full flex flex-col justify-center items-center sm:items-start top-0 left-0 z-100">
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
                      
                      <div className="w-full h-full bg-[var(--foreground)] text-[var(--background)] uppercase py-8 md:py-10 px-5 md:px-8 flex md:flex-row-reverse justify-center md:justify-between items-center text-3xl md:text-4xl">
                         
                          <div className="hidden md:block md:relative w-40 scale-90">
                                <button className="relative text-[var(--background)] hover:brightness-170 rounded-lg h-full w-full flex justify-center items-center gap-2 cursor-pointer font-bold " onClick={()=>{signIn("google",{callbackUrl:"/"})}}>
                                <div className="relative w-full h-full py-5 px-4 text-2xl">
                                  <div className="verticalStick absolute left-0 top-0 w-1 h-full py-2">
                                    <div className="w-full h-full bg-[var(--background)]"></div>
                                  </div>
                                  <div className="verticalStick absolute right-0 top-0 w-1 h-full py-2">
                                    <div className="w-full h-full bg-[var(--background)]"></div>
                                  </div>
                                  <div className="horizontalStick absolute left-0 top-0 w-full h-1 px-2">
                                    <div className="w-full h-full rounded-r-full bg-[var(--background)]"></div>
                                    <div className="absolute w-3 right-0 rotate-45 h-full bg-[var(--background)]"></div>
                                    <div className="absolute w-1 left-1 h-full bg-[var(--background)]"></div>
                                  </div>
                                  <div className="horizontalStick absolute left-0 bottom-0 w-full h-1 px-2">
                                    <div className="-translate-y-4 w-full h-5 bg-[var(--background)]"></div>
                                    <div className="absolute w-3 left-0 rotate-45 -translate-y-6 h-1 bg-[var(--background)]"></div>
                                    <div className="absolute w-2 left-0 rotate-45 -translate-y-10 h-1 bg-[var(--background)]"></div>
                                    <div className="absolute w-1 right-1 h-5 -translate-y-10 bg-[var(--background)]"></div>
                                    <div className="absolute w-1 left-1 h-4 -translate-y-9 rounded-b-full bg-[var(--background)]"></div>
                                  </div>
                                  <p className="relative flex flex-row-reverse justify-center items-center gap-3 font-extrabold -translate-y-2">
                                    Iniciar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><title>google</title><path fill="currentColor" d="M23 10v5h-1v2h-1v2h-1v1h-1v1h-2v1h-2v1H9v-1H7v-1H5v-1H4v-1H3v-2H2v-2H1V9h1V7h1V5h1V4h1V3h2V2h2V1h6v1h2v1h2v2h-1v1h-1v1h-2V6H9v1H7v2H6v6h1v2h2v1h6v-1h2v-2h1v-1h-6v-4z"/></svg>
                                  </p>
                                </div>
                                </button>
                           
                          </div> 
                     
                        Pixelrun
                      </div>
                    </div>  
                    <div className=" px-5 md:px-7 py-12 flex flex-col text-2xl md:text-3xl">
                    Bienvenido a Pixelrun
                    <div className="text-lg md:text-xl mt-5">
                    Inicia sesión con tu cuenta de Google para comenzar a jugar y ganar recompensas.
                    </div>
                    </div>
                      <span className="relative block translate-y-7 text-xl text-muted-foreground hover:underline cursor-pointer">
                        Terminos y condiciones
                      </span>
                  </div>
                </div>
          </div>
                          <div className="md:hidden block relative w-2/3">
                                <button className="relative text-[var(--foreground)] hover:brightness-170 rounded-lg h-full w-full flex justify-center items-center gap-2 cursor-pointer font-bold " onClick={()=>{signIn("google",{callbackUrl:"/"})}}>
                                <div className="relative w-full h-full py-5 px-4 text-3xl">
                                  <div className="verticalStick absolute left-0 top-0 w-1 h-full py-2">
                                    <div className="w-full h-full bg-[var(--foreground)]"></div>
                                  </div>
                                  <div className="verticalStick absolute right-0 top-0 w-1 h-full py-2">
                                    <div className="w-full h-full bg-[var(--foreground)]"></div>
                                  </div>
                                  <div className="horizontalStick absolute left-0 top-0 w-full h-1 px-2">
                                    <div className="w-full h-full rounded-r-full bg-[var(--foreground)]"></div>
                                    <div className="absolute w-3 right-0 rotate-45 h-full bg-[var(--foreground)]"></div>
                                    <div className="absolute w-1 left-1 h-full bg-[var(--foreground)]"></div>
                                  </div>
                                  <div className="horizontalStick absolute left-0 bottom-0 w-full h-1 px-2">
                                    <div className="-translate-y-4 w-full h-5 bg-[var(--foreground)]"></div>
                                    <div className="absolute w-3 left-0 rotate-45 -translate-y-6 h-1 bg-[var(--foreground)]"></div>
                                    <div className="absolute w-2 left-0 rotate-45 -translate-y-10 h-1 bg-[var(--foreground)]"></div>
                                    <div className="absolute w-1 right-1 h-5 -translate-y-10 bg-[var(--foreground)]"></div>
                                    <div className="absolute w-1 left-1 h-4 -translate-y-9 rounded-b-full bg-[var(--foreground)]"></div>
                                  </div>
                                  <p className="relative flex flex-row-reverse justify-center items-center gap-3 font-extrabold -translate-y-2">
                                    Iniciar
                                    <svg xmlns="http://www.w3.org/2000/svg" width="0.9em" height="0.9em" viewBox="0 0 24 24"><title>google</title><path fill="currentColor" d="M23 10v5h-1v2h-1v2h-1v1h-1v1h-2v1h-2v1H9v-1H7v-1H5v-1H4v-1H3v-2H2v-2H1V9h1V7h1V5h1V4h1V3h2V2h2V1h6v1h2v1h2v2h-1v1h-1v1h-2V6H9v1H7v2H6v6h1v2h2v1h6v-1h2v-2h1v-1h-6v-4z"/></svg>
                                  </p>
                                </div>
                                </button>
                           
                          </div>
            </section>  
  )
}