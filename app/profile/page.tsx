"use client";
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signOut } from "next-auth/react"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useWallet } from '@/app/components/WalletContext'



export default function App() {
  const [dataProfile, setDataProfile] = useState<any>(null);
  const [balance, setBalance] = useState<any>(null);
  const [transaction, setTransaction] = useState<any>(null);
  const { updateBalance, refresh } = useWallet();

  const nivel = [
    {level: 1, progress: 20, comleted: true}, 
    {level: 2, progress: 40, comleted: true},
    {level: 3, progress: 60, comleted: true},
    {level: 4, progress: 80, comleted: false},
    {level: 5, progress: 100, comleted: false},
    {level: 6, progress: 120, comleted: false}
  ];

  function PixelFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full">
      <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
        <div className="w-full h-full bg-[var(--foreground)]" />
      </div>
      <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
        <div className="w-full h-full bg-[var(--foreground)]" />
      </div>
      {children}
    </div>
  )
  }


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
        className="bottom-0 left-0 text-2xl w-fit sm:w-fit sm:relative font-bold hover:brightness-130 transition"
        style={{ color }}
      >
        <div className="relative py-2 py-5 px-4">
          <div className="verticalStick absolute left-0 top-0 w-1 h-full py-2">
            <div className={`w-full h-full bg-[${color}]`} ></div>
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
          <span className="block flex gap-2 justify-center items-center -translate-y-2">
          {children}
          </span>
        </div>
      </button>
    )
  }


  const getProfile = async () => {
    try {
      const profile = await fetch('/api/profile');
      const userProfile = await profile.json();
      setBalance(userProfile.wallet);
      setDataProfile(userProfile.user);
      setTransaction(userProfile.transactions);
      await updateBalance(balance);
      await refresh();
    }
    catch {

    }
  }  

 


  useEffect(()=>{
    getProfile()
  }, [])
  


    return (
      <main className="h-[120vh] sm:h-[100dvh] w-[100%] text-lg md:text-xl lg:text-2xl flex md:grid md:grid-cols-[1fr_280px]"> 
        <div className="relative h-[115vh] sm:h-[95dvh] w-full md:w overflow-hidden mx-4 my-5 flex flex-col">
        {dataProfile ?
          (
          <>
              {/*DecoVentana*/}
              <div className="relative w-full h-full top-0 left-0 z-100">
                <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--background)] md:bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--background)] md:bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--background)] md:bg-[var(--foreground)]"></div>
                </div>
                
                <div className="horizontalStick z-100 lg:px-7 absolute left-0 top-0 w-full sm:h-30 px-2">
                  <div className="lg:-mx-5 flex flex-col-reverse sm:flex-row justify-between items-center md:px-6 h-full bg-[var(--background)] md:bg-[var(--foreground)]">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-[var(--foreground)] -mt-4 sm:mt-0 sm:mb-0 flex sm:hidden items-center justify-center gap-8 w-full sm:w-30 h-30 md:mr-4 md:text-[var(--background)]">
                        <Image
                          src={dataProfile?.image}
                          alt="Profile Image"
                          width={80}
                          height={80}
                          className="scale-110 md:scale-100 "
                        />
                        <p className="sm:hidden flex text-[var(--foreground)] w-3/5 md:text-[var(--background)] text-lg font-semibold">
                          {dataProfile?.name}
                        </p>
                        
                      </span>
                      <div className="flex flex-col text-3xl font-black gap-2 sm:hidden items-center w-full h-30">
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
                    <p className="text-[var(--foreground)] md:text-[var(--background)] w-full h-30 text-3xl py-1 justify-center md:justify-start font-bold scale-101 flex items-center gap-2 -ml-5 md:ml-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><title>coin</title><path fill="currentColor" d="M6 2h12v2H6zM4 6V4h2v2zm0 12V6H2v12zm2 2v-2H4v2zm12 0v2H6v-2zm2-2v2h-2v-2zm0-12h2v12h-2zm0 0V4h-2v2zm-9-1h2v2h3v2h-6v2h6v6h-3v2h-2v-2H8v-2h6v-2H8V7h3z"/></svg>
                      Balance:

                      <div className="relative py-5 px-4 ml-5 text-4xl">
                        <div className="verticalStick absolute left-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--foreground)] md:bg-[var(--background)]"></div>
                        </div>
                        <div className="verticalStick absolute right-0 top-0 w-1 h-full py-2">
                          <div className="w-full h-full bg-[var(--foreground)] md:bg-[var(--background)]"></div>
                        </div>
                        <div className="horizontalStick absolute left-0 top-0 w-full h-1 px-2">
                          <div className="w-full h-full rounded-r-full bg-[var(--foreground)] md:bg-[var(--background)]"></div>
                          <div className="absolute w-3 right-0 rotate-45 h-full bg-[var(--foreground)] md:bg-[var(--background)]"></div>
                          <div className="absolute w-1 left-1 h-full bg-[var(--foreground)] md:bg-[var(--background)]"></div>
                        </div> 
                        <div className="horizontalStick absolute left-0 bottom-0 w-full h-1 px-2">
                          <div className="-translate-y-4 w-full h-5 bg-[var(--foreground)] md:bg-[var(--background)]"></div>
                          <div className="absolute w-3 left-0 rotate-45 -translate-y-6 h-1 bg-[var(--foreground)] md:bg-[var(--background)]"></div>
                          <div className="absolute w-2 left-0 rotate-45 -translate-y-10 h-1 bg-[var(--foreground)] md:bg-[var(--background)]"></div>
                          <div className="absolute w-1 right-1 h-5 -translate-y-10 bg-[var(--foreground)] md:bg-[var(--background)]"></div>
                          <div className="absolute w-1 left-1 h-4 -translate-y-9 rounded-b-full bg-[var(--foreground)] md:bg-[var(--background)]"></div>
                        </div>
                        <span className="block font-family-[var(--font-tiny)] -translate-y-2">{balance.balance}</span>
                      </div>
                    </p> 
                    <div className="hidden md:flex gap-4">
                  <PixelButton color="var(--background)" onClick={() => signOut({ callbackUrl: "/" })}>
                    Salir <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><title>arrow-bar-right</title><path fill="currentColor" d="M18 4v16h2V4zM4 11v2h8v2h-2v2h2v-2h2v-2h2v-2h-2V9h-2V7h-2v2h2v2z"/></svg>
                  </PixelButton>
                  <PixelButton color="var(--background)" onClick={() => signOut({ callbackUrl: "/" })}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><title>settings-cog</title><path fill="currentColor" d="M4 20h3v-2h4v4h2v-4h4v2h-2v4H9v-4H7v2H2v-5h2zm18 2h-5v-2h3v-3h2zM6 11H2v2h4v4H4v-2H0V9h4V7h2zm14-2h4v6h-4v2h-2v-4h4v-2h-4V7h2zm-6 7h-4v-2h4zm-4-2H8v-4h2zm6 0h-2v-4h2zm-2-4h-4V8h4zM7 4H4v3H2V2h5zm8 0h2V2h5v5h-2V4h-3v2h-4V2h-2v4H7V4h2V0h6z"/></svg>
                  </PixelButton>
                  <PixelButton color="var(--background)" onClick={() => signOut({ callbackUrl: "/" })}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><title>coffee</title><path fill="currentColor" d="M4 4h16v2H4zm0 2h2v8H4zm2 8h10v2H6zm14-8h2v4h-2zm-2 4h2v2h-2zm-2-4h2v8h-2zM2 18h18v2H2z"/></svg>
                  </PixelButton>
                    </div>

                  <div className="md:hidden flex gap-4">
                  <PixelButton color="var(--foreground)" onClick={() => signOut({ callbackUrl: "/" })}>
                    Salir <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><title>arrow-bar-right</title><path fill="currentColor" d="M18 4v16h2V4zM4 11v2h8v2h-2v2h2v-2h2v-2h2v-2h-2V9h-2V7h-2v2h2v2z"/></svg>
                  </PixelButton>
                  <PixelButton color="var(--foreground)" onClick={() => signOut({ callbackUrl: "/" })}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><title>settings-cog</title><path fill="currentColor" d="M4 20h3v-2h4v4h2v-4h4v2h-2v4H9v-4H7v2H2v-5h2zm18 2h-5v-2h3v-3h2zM6 11H2v2h4v4H4v-2H0V9h4V7h2zm14-2h4v6h-4v2h-2v-4h4v-2h-4V7h2zm-6 7h-4v-2h4zm-4-2H8v-4h2zm6 0h-2v-4h2zm-2-4h-4V8h4zM7 4H4v3H2V2h5zm8 0h2V2h5v5h-2V4h-3v2h-4V2h-2v4H7V4h2V0h6z"/></svg>
                  </PixelButton>
                  <PixelButton color="var(--foreground)" onClick={() => signOut({ callbackUrl: "/" })}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.3em" height="1.3em" viewBox="0 0 24 24"><title>coffee</title><path fill="currentColor" d="M4 4h16v2H4zm0 2h2v8H4zm2 8h10v2H6zm14-8h2v4h-2zm-2 4h2v2h-2zm-2-4h2v8h-2zM2 18h18v2H2z"/></svg>
                  </PixelButton>
                    </div>

                  </div>

                  {/*Contenido*/}
                    <span className="p-4 text-3xl hidden md:flex flex-col md:flex-row md:justify-between my-10">
                      <p className="font-bold relative w-fit uppercase max-w-150 ">
                        <div className="absolute hidden sm:block w-13/12 h-2 left-0 top-13/12">
                          <div className="relative w-full h-full flex">
                            <div className="relative top-0   left-0 h-2 w-2 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-1/1 left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-0   left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-1/1 left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-0   left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-1/1 left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-0   left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-1/1 left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-0   left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-1/1 left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-0   left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-1/1 left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-0   left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-1/1 left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-0   left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-1/1 left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-0   left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-1/1 left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-0   left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-1/1 left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-0   left-0 h-2 w-4 bg-[var(--foreground)]/90 w-"></div>
                            <div className="relative top-1/1   left-0 h-2 w-2 bg-[var(--foreground)]/90 w-"></div>
                          </div>
                        </div>
                        <p className="line-clamp-2">
                          
                        hola, {dataProfile !== "" ? dataProfile?.name : "{Nombre}"}
                        </p>
                      </p>
                      <p className="text-[var(--foreground)]/80 text-xl md:mt-0 mt-10 -mb-5">{dataProfile?.email}</p>
                    </span>
                      <span className="font-bold text-lg flex md:hidden">transacciones:</span>
                    <ul className="flex flex-col md:hidden w-full h-fit overflow-y-auto gap-2">
                      {transaction.length != 0 ?
                      (
                        transaction.map((t : any)=>(
                          <li className="relative min-h-22 flex flex-col sm:flex-row p-3 sm:px-12 sm:justify-between sm:items-center flex-wrap sm:flex-nowrap after:absolute after:w-11/12 after:h-1 after:bg-[var(--foreground)] after:left-1/2 after:-translate-x-1/2 after:top-11/12 after:rounded-xl">
                            <span className="flex justify-start px-3 sm:border-r-2 sm:border-[var(--foreground)]/40 min-w-10 sm:min-w-18">{t.amount >= 0 ?
                            (
                              <><span className="text-[color-mix(in_srgb,var(--primary-green),black_50%)]">+{t.amount}</span></>
                              // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0cb800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
                              ) :
                            (
                              <span className="text-[color-mix(in_srgb,var(--primary-red),black_50%)] ">{t.amount}</span>
                              // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg>
                              )}
                          </span>
                            <p className="line-clamp-2 sm:border-r-2 sm:border-[var(--foreground)]/40 pl-3 max-w-35 sm:max-w-full sm:w-full">{t.type}</p>
                            <span className=" min-w-28 md:min-w-30 lg:min-w-35 pl-3 underline absolute right-5 flex items-center justify-center h-full sm:relative sm:border-r-2 sm:border-[var(--foreground)]/40 ">Detalles</span>
                            <p className="truncate min-w-25 sm:min-w-28 pl-3 sm:pl-0 sm:-mx-4 lg:-mx-3 lg:min-w-32 pl-0">{t.createdAt.split("T")[0]}</p>
                          </li>

                        ))
                      ) :
                      (
                        <></>
                      )
                      }
                    </ul>

                    <div className="relative z-1000 hidden md:flex flex-col w-full ">
                      <span className="flex items-center font-extrabold w-full h-18 px-4 text-2xl ">
                        <div className="absolute w-full h-full top-0 left-0 z-100">
                          <div className="verticalStick absolute left-0 top-0 w-2 h-[60vh] py-3">
                            <div className="w-full h-full bg-[var(--foreground)]"></div>
                          </div>
                          <div className="verticalStick absolute right-0 top-0 w-2 h-[60vh] py-3">
                            <div className="w-full h-full bg-[var(--foreground)]"></div>
                          </div>
                          <div className="horizontalStick absolute right-0 top-[59vh] w-full h-3 px-2">
                            <div className="w-full h-full bg-[var(--foreground)]"></div>
                          </div>
                          <div className="horizontalStick absolute left-0 top-0 w-full h-20 sm:h-17 mt-1 px-2 z-500">
                            <div className="w-full h-full text-[var(--background)] pr-10 bg-[var(--foreground)] flex items-center justify-between flex-wrap pl-5">
                            <p className="z-400 items-center text-3xl flex">
                              {/*<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-cashapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057" /></svg>*/}
                              Transacciones
                            </p>
                            <span className=" flex gap-2">
                              {/*<p>{transaction.length}</p>*/}
                              {/*<p>/</p>*/}
                              <p>total: {transaction.length}</p>
                            </span>
                            </div>
                          </div>
                        </div>
                      </span>
                      <ul className="scrollTransaction z-400 md:max-h-[30vh] lg:max-h-[40vh] xl:max-h-[48vh] overflow-y-auto mx-1 flex flex-col">

                      {transaction.length != 0 ?
                      (
                        transaction.map((t : any)=>(
                          <li className="relative min-h-22 flex flex-col sm:flex-row p-3 sm:px-12 sm:justify-between sm:items-center flex-wrap sm:flex-nowrap after:absolute after:w-11/12 after:h-1 after:bg-[var(--foreground)] after:left-1/2 after:-translate-x-1/2 after:top-11/12 after:rounded-xl">
                            <span className="flex justify-start px-3 sm:border-r-2 sm:border-[var(--foreground)]/40 min-w-10 sm:min-w-18">{t.amount >= 0 ?
                            (
                              <><span className="text-[color-mix(in_srgb,var(--primary-green),black_50%)]">+{t.amount}</span></>
                              // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0cb800" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M9 12h6" /><path d="M12 9v6" /></svg>
                              ) :
                            (
                              <span className="text-[color-mix(in_srgb,var(--primary-red),black_50%)] ">{t.amount}</span>
                              // <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-circle-minus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg>
                              )}
                          </span>
                            <p className="line-clamp-2 sm:border-r-2 sm:border-[var(--foreground)]/40 pl-3 max-w-35 sm:max-w-full sm:w-full">{t.type}</p>
                            <span className=" min-w-28 md:min-w-30 lg:min-w-35 pl-3 underline absolute right-5 flex items-center justify-center h-full sm:relative sm:border-r-2 sm:border-[var(--foreground)]/40 ">Detalles</span>
                            <p className="truncate min-w-25 sm:min-w-28 pl-3 sm:pl-0 sm:-mx-4 lg:-mx-3 lg:min-w-32 pl-0">{t.createdAt.split("T")[0]}</p>
                          </li>

                        ))
                      ) :
                      (
                        <></>
                      )
                      }

                      </ul>
                      {transaction.length != 0 ? (<></>) : (
                        <div className="relative flex flex-col items-center justify-center relative left-1/2 top-0 -translate-x-1/2 w-23/24 h-[43dvh]">
                      <span className="flex items-center font-extrabold w-full h-40 px-4 text-2xl z-500">
                        <div className="absolute w-full h-full top-0 left-0 z-100">
                          <div className="verticalStick absolute left-0 top-0 w-2 h-screen py-3">
                            <div className="w-full h-full bg-[var(--foreground)]"></div>
                          </div>
                          <div className="verticalStick absolute right-0 top-0 w-2 h-screen py-3">
                            <div className="w-full h-full bg-[var(--foreground)]"></div>
                          </div>
                          <div className="horizontalStick absolute left-0 top-0 w-full h-17 mt-1 px-2 z-500">
                            <div className="w-full h-full bg-[var(--foreground)] flex items-center pl-5">
                            <p className="absolute z-400 items-center text-3xl flex text-[var(--background)]">
                              {/*<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-cashapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057" /></svg>*/}
                              Cargando transacciones
                            </p>
                            </div>
                          </div>
                        </div>
                      </span>
                            <div className="relative flex flex-col justify-center gap-9 items-center w-full h-full text-3xl px-20 sm:px-0">
                              Espere un poco
                            </div>
                        </div>
                      )}

                    </div>
                      <div className="flex items-end hidden bg-blue-500 h-full"></div>
                </div>
              </div>
          </>

          ) :
          (
            <div className="relative w-full h-full flex flex-col gap-2 p-4">
              {/*DecoVentana*/}
              <div className="absolute w-full h-full top-0 left-0 z-100">
                <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick lg:px-7 absolute left-0 top-0 w-full h-30 mt-1 px-2">
                  <div className="lg:-mx-5 flex justify-between items-center px-6 h-full bg-[var(--foreground)]">
                    <p className="text-[var(--background)] w-full h-30 text-3xl py-1 justify-start font-bold scale-101 flex items-center gap-2 ">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><title>coin</title><path fill="currentColor" d="M6 2h12v2H6zM4 6V4h2v2zm0 12V6H2v12zm2 2v-2H4v2zm12 0v2H6v-2zm2-2v2h-2v-2zm0-12h2v12h-2zm0 0V4h-2v2zm-9-1h2v2h3v2h-6v2h6v6h-3v2h-2v-2H8v-2h6v-2H8V7h3z"/></svg>
                      Balance:
                      <div className="relative py-5 px-4 text-4xl">
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
                        <span className="block font-family-[var(--font-tiny)] -translate-y-2">000</span>
                      </div>
                    </p> 
                    <PixelButton color="var(--background)" onClick={() => signOut({ callbackUrl: "/" })}>
                      Salir <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><title>arrow-bar-right</title><path fill="currentColor" d="M18 4v16h2V4zM4 11v2h8v2h-2v2h2v-2h2v-2h2v-2h-2V9h-2V7h-2v2h2v2z"/></svg>
                    </PixelButton>
                  </div>
                    <span className="p-4 text-3xl flex flex-col md:flex-row md:justify-between my-10">
                      <p className="font-bold relative w-fit uppercase">
                        <div className="absolute w-13/12 h-2 bg-[var(--foreground)]/70 left-0 top-12/12"></div>
                        hola, Cargando Nombre :D
                      </p>
                      <p className="text-[var(--foreground)]/80 text-xl md:mt-0 mt-3">CargandoEmail123@email.com</p>
                    </span>
                        <div className="relative flex flex-col items-center justify-center relative left-1/2 top-0 -translate-x-1/2 w-23/24 h-[43dvh]">
                      <span className="flex items-center font-extrabold w-full h-40 px-4 text-2xl z-500">
                        <div className="absolute w-full h-full top-0 left-0 z-100">
                          <div className="verticalStick absolute left-0 top-0 w-2 h-screen py-3">
                            <div className="w-full h-full bg-[var(--foreground)]"></div>
                          </div>
                          <div className="verticalStick absolute right-0 top-0 w-2 h-screen py-3">
                            <div className="w-full h-full bg-[var(--foreground)]"></div>
                          </div>
                          <div className="horizontalStick absolute left-0 top-0 w-full h-17 mt-1 px-2 z-500">
                            <div className="w-full h-full bg-[var(--foreground)] flex items-center pl-5">
                            <p className="absolute z-400 items-center text-3xl flex text-[var(--background)]">
                              {/*<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-brand-cashapp"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M17.1 8.648a.568 .568 0 0 1 -.761 .011a5.682 5.682 0 0 0 -3.659 -1.34c-1.102 0 -2.205 .363 -2.205 1.374c0 1.023 1.182 1.364 2.546 1.875c2.386 .796 4.363 1.796 4.363 4.137c0 2.545 -1.977 4.295 -5.204 4.488l-.295 1.364a.557 .557 0 0 1 -.546 .443h-2.034l-.102 -.011a.568 .568 0 0 1 -.432 -.67l.318 -1.444a7.432 7.432 0 0 1 -3.273 -1.784v-.011a.545 .545 0 0 1 0 -.773l1.137 -1.102c.214 -.2 .547 -.2 .761 0a5.495 5.495 0 0 0 3.852 1.5c1.478 0 2.466 -.625 2.466 -1.614c0 -.989 -1 -1.25 -2.886 -1.954c-2 -.716 -3.898 -1.728 -3.898 -4.091c0 -2.75 2.284 -4.091 4.989 -4.216l.284 -1.398a.545 .545 0 0 1 .545 -.432h2.023l.114 .012a.544 .544 0 0 1 .42 .647l-.307 1.557a8.528 8.528 0 0 1 2.818 1.58l.023 .022c.216 .228 .216 .569 0 .773l-1.057 1.057" /></svg>*/}
                              No hay transacciones
                            </p>
                            </div>
                          </div>
                        </div>
                      </span>
                            <div className="relative flex flex-col justify-center gap-9 items-center w-full h-full text-3xl px-20 sm:px-0">
                              Puedes jugar para ganar puntos :D
                      <button className="relative  p-3 text-[var(--foreground)] px-4 hover:brightness-130 z-600 rounded-lg h-14 w-32 flex justify-center items-center gap-2 cursor-pointer font-bold transition">
                      <Link href={"/games"}>
                      <div className="relative py-5 px-4 text-4xl">
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
                        <span className="block flex gap-2 px-12 justify-center items-center -translate-y-2">
                          Jugar
                        </span>
                      </div>
                    </Link>
                      </button>
                            </div>
                        </div>
                </div>
              </div>
            </div>
          )
        }
        </div>
        <div className="absolute md:relative"></div>
      </main>
    )
}