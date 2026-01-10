// app/components/AuthButtons.tsx
'use client'
import { useEffect, useState } from "react"
import { WalletProvider } from '../components/WalletContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signIn } from "next-auth/react"
import Image from 'next/image'
import { useWallet } from './WalletContext'
import {Wallet, Play, AddBonus} from './Wallet'
import { gsap } from "gsap"

export function AuthButtons({ session }: { session: any }) {
      const pathname = usePathname();
  // const [balance, setBalance] = useState(0);

  // const fetchBalance = async () => {
  //     try {
  //       await fetch("/api/wallet")
  //       .then(res => res.json())
  //       .then(data => setBalance(data.balance));
  //     }
  //     catch {
  //     }
  // };  

  useEffect(() => {
    window.scroll(0,0)
    // fetchBalance();
    const tl = gsap.timeline();
    const tlPila = gsap.timeline();

    tl.to(".boton1",
      { 
        y: 0,
        duration: 0.4,
        ease: "elastic.out(0.7, 0.75)"
      });
    tl.to(".boton2",
      { 
        y: 0,
        duration: 0.4,
        ease: "elastic.out(0.7, 0.75)"
      });
    tl.to(".boton3",
      { 
        y: 0,
        duration: 0.4,
        ease: "elastic.out(0.7, 0.75)"
      });


    tlPila.to(".pila1",
      { 
        opacity: 1,
        duration: 0.3,
        ease: "elastic.out"
      });
    tlPila.to(".pila2",
      { 
        opacity: 1,
        duration: 0.2,
        ease: "elastic.out"
      });
    tlPila.to(".pila3",
      { 
        opacity: 1,
        duration: 0.2,
        ease: "elastic.out"
      });
    tlPila.to(".pila4",
      { 
        opacity: 1,
        duration: 0.1,
        ease: "elastic.out"
      });


    gsap.to(".balance",
      { 
        opacity: 1,
        duration: 2,
        ease: "elastic.out(0.7, 0.75)"
      });
    gsap.to(".name",
      { 
        delay: 0.7,
        opacity: 1,
        duration: 2,
        ease: "elastic.out(0.7, 0.75)"
      });
  }, [pathname]);

  return (
    <div className="relative w-screen sm:-translate-x-0 -translate-x-5 z-4000 flex flex-col items-center sm:max-w-50 sm:w-50">
      {session ?
      (
      <>
      <WalletProvider>
      <div className="w-full hidden sm:flex max-w-52 w-52  justify-between">
        <Link href={"/"} className="w-fit boton1 -translate-y-100">
        <div className="relative cursor-pointer hover:brightness-110 flex justify-center gap-2 items-center text-center py-2 text-sm font-bold truncate transition">
          <button className="relative text-[var(--foreground)] hover:brightness-170 rounded-lg h-14 flex justify-center items-center gap-2 cursor-pointer font-bold ">
          <div className="relative py-5 px-4 text-2xl">
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
            <p className="relative font-extrabold -translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><title xmlns="">home</title><path fill="currentColor" d="M14 2h-4v2H8v2H6v2H4v2H2v2h2v10h7v-6h2v6h7V12h2v-2h-2V8h-2V6h-2V4h-2zm0 2v2h2v2h2v2h2v2h-2v8h-3v-6H9v6H6v-8H4v-2h2V8h2V6h2V4z"/></svg>
            </p>
          </div>
          </button>
        </div>
      </Link>
        <Link href={"/profile"} className="w-fit boton2 -translate-y-100">
        <div className="relative cursor-pointer hover:brightness-110 flex justify-center gap-2 items-center text-center py-2 text-sm font-bold truncate transition">
          <button className="relative text-[var(--foreground)] hover:brightness-170 rounded-lg h-14 flex justify-center items-center gap-2 cursor-pointer font-bold ">
          <div className="relative py-5 px-4 text-2xl">
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
            <p className="relative font-extrabold -translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><title xmlns="">user</title><path fill="currentColor" d="M15 2H9v2H7v6h2V4h6zm0 8H9v2h6zm0-6h2v6h-2zM4 16h2v-2h12v2H6v4h12v-4h2v6H4z"/></svg>
            </p>
          </div>
          </button>
        </div>
      </Link>
        <Link href={"/games"} className="w-fit boton3 -translate-y-100">
        <div className="relative cursor-pointer hover:brightness-110 flex justify-center gap-2 items-center text-center py-2 text-sm font-bold truncate transition">
          <button className="relative text-[var(--foreground)] hover:brightness-170 rounded-lg h-14 flex justify-center items-center gap-2 cursor-pointer font-bold ">
          <div className="relative py-5 px-4 text-2xl">
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
            <p className="relative font-extrabold -translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="scale-120" width="32" height="32" viewBox="0 0 24 24"><title xmlns="">gamepad</title><path fill="currentColor" d="M2 5h20v14H2zm18 12V7H4v10zM8 9h2v2h2v2h-2v2H8v-2H6v-2h2zm6 0h2v2h-2zm4 4h-2v2h2z"/></svg>
            </p>
          </div>
          </button>
        </div>
      </Link>
      </div>     

        <p className="balance opacity-0 text-3xl mt-5 py-2 w-full py-1 text-center bg-[var(--foreground)] text-[var(--background)] font-bold scale-101 flex justify-center items-center gap-2">
          <Wallet/>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><title xmlns="">coin</title><path fill="currentColor" d="M6 2h12v2H6zM4 6V4h2v2zm0 12V6H2v12zm2 2v-2H4v2zm12 0v2H6v-2zm2-2v2h-2v-2zm0-12h2v12h-2zm0 0V4h-2v2zm-9-1h2v2h3v2h-6v2h6v6h-3v2h-2v-2H8v-2h6v-2H8V7h3z"/></svg>

        </p>

        <div className="flex flex-col relative left-0 items-center gap-7 justify-around">


        <div className="relative mt-5 h-35 w-50">
              <div className="absolute w-full h-full top-0 left-0 z-100">
                <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick flex flex-col justify-between absolute right-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-5 bg-[var(--foreground)]"></div>
                  <div className="w-full h-5 bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute -right-5 top-0 -z-500 w-9 h-20 top-1/2 -translate-y-1/2">
                <div className="horizontalStick absolute top-0 top-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)] "></div>
                </div>
                <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                  <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
                    <div className="w-full h-full bg-[var(--foreground)]"></div>
                  </div>
                </div>
                <div className="horizontalStick absolute top-0 top-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)] "></div>
                </div>
                <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick relative flex gap-2 py-2 translate-y-2 mx-2 left-0 top-0 w-46 h-29 mt-1 px-2">
                  <div className="pila1 opacity-0 verticalStick right-0 top-0 w-1/4 h-full">
                    <div className="w-full h-full bg-[var(--foreground)]"></div>
                  </div>
                  <div className="pila2 opacity-0 verticalStick right-0 top-0 w-1/4 h-full">
                    <div className="w-full h-full bg-[var(--foreground)]"></div>
                  </div>
                  <div className="pila3 opacity-0 verticalStick right-0 top-0 w-1/4 h-full">
                    <div className="w-full h-full bg-[var(--foreground)]"></div>
                  </div>
                  <div className="pila4 opacity-0 verticalStick right-0 top-0 w-1/4 h-full">
                    <div className="w-full h-full bg-[var(--foreground)]"></div>
                  </div>

                <div className="horizontalStick overflow-hidden absolute flex justify-center items-center gap-2 left-0 top-0 w-46 h-29 px-2">

          <div className="btnPerfil name opacity-0 relative flex gap-4 w-fit h-fit justify-around items-center p-3 py-4">
            <div className="shadowBateria absolute top-1/2  left-1/2 -translate-1/2 w-1 h-1"></div>
            <span className="uppercase truncate text-left text-xl z-500 text-[var(--foreground)] max-w-25 font-bold flex flex-col w-fit">
              {session.user?.name?.split(" ")[0]}<br/>
              {session.user?.name?.split(" ")[1]}
            </span>
            {session.user?.image && (
              <Image src={session.user.image} alt="User" width={45} height={45} className="z-500 max-h-18 max-w-18 outline-2 outline-[var(--foreground)] " />
            )}          
          </div> 
          </div>
          </div>
          </div>
        </div>

      <div className="w-full sm:hidden block max-w-52 w-52 pt-4 gap-6 flex justify-center">
        <Link href={"/"} className="w-fit boton1 -translate-y-100">
        <div className="relative cursor-pointer hover:brightness-110 flex scale-120 justify-center gap-2 items-center text-center py-2 text-sm font-bold truncate transition">
          <button className="relative text-[var(--foreground)] hover:brightness-170 rounded-lg h-14 flex justify-center items-center gap-2 cursor-pointer font-bold ">
          <div className="relative py-5 px-4 text-2xl">
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
            <p className="relative font-extrabold -translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><title xmlns="">home</title><path fill="currentColor" d="M14 2h-4v2H8v2H6v2H4v2H2v2h2v10h7v-6h2v6h7V12h2v-2h-2V8h-2V6h-2V4h-2zm0 2v2h2v2h2v2h2v2h-2v8h-3v-6H9v6H6v-8H4v-2h2V8h2V6h2V4z"/></svg>
            </p>
          </div>
          </button>
        </div>
      </Link>
        <Link href={"/profile"} className="w-fit boton2 -translate-y-100">
        <div className="relative cursor-pointer hover:brightness-110 flex scale-120 justify-center gap-2 items-center text-center py-2 text-sm font-bold truncate transition">
          <button className="relative text-[var(--foreground)] hover:brightness-170 rounded-lg h-14 flex justify-center items-center gap-2 cursor-pointer font-bold ">
          <div className="relative py-5 px-4 text-2xl">
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
            <p className="relative font-extrabold -translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><title xmlns="">user</title><path fill="currentColor" d="M15 2H9v2H7v6h2V4h6zm0 8H9v2h6zm0-6h2v6h-2zM4 16h2v-2h12v2H6v4h12v-4h2v6H4z"/></svg>
            </p>
          </div>
          </button>
        </div>
      </Link>
        <Link href={"/games"} className="w-fit boton3 -translate-y-100">
        <div className="relative cursor-pointer hover:brightness-110 flex scale-120 justify-center gap-2 items-center text-center py-2 text-sm font-bold truncate transition">
          <button className="relative text-[var(--foreground)] hover:brightness-170 rounded-lg h-14 flex justify-center items-center gap-2 cursor-pointer font-bold ">
          <div className="relative py-5 px-4 text-2xl">
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
            <p className="relative font-extrabold -translate-y-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="scale-120" width="32" height="32" viewBox="0 0 24 24"><title xmlns="">gamepad</title><path fill="currentColor" d="M2 5h20v14H2zm18 12V7H4v10zM8 9h2v2h2v2h-2v2H8v-2H6v-2h2zm6 0h2v2h-2zm4 4h-2v2h2z"/></svg>
            </p>
          </div>
          </button>
        </div>
      </Link>
      </div> 

      </div>

      </WalletProvider>
      </>
        ):
      (
      <div className="relative w-52">
          <button className="relative text-[var(--foreground)] hover:brightness-170 rounded-lg h-full w-full flex justify-center items-center gap-2 cursor-pointer font-bold " onClick={signIn("google",{callbackUrl:"/"})}>
          <div className="relative w-full h-full py-5 px-4 text-2xl">
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
            <p className="relative font-extrabold py-3 -translate-y-2">
              Logueate
            </p>
          </div>
          </button>

      </div> 
        )} 
    </div>
  )
}