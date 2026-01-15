"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/navigation'; // Importamos el router
import { useWallet } from '@/app/components/WalletContext'

export default function ClickRisk({url} : {url:string}) {
  const router = useRouter();
  const { updateBalance, refresh } = useWallet();
  const [sessionData, setSessionData] = useState<any>(null);
  const [balance, setBalance] = useState<number>(0);
  const [sessionActive, setSessionActive] = useState<boolean>(false);
  const [porcentajePerdida, setPorcentajePerdida] = useState<any>(null);
  const [seconds, setSeconds] = useState(60);
  const [isCounting, setIsCounting] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para el modal

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const originalTitle = useRef("");

  useEffect(() => {
    originalTitle.current = document.title;
    getStart();
    return () => { document.title = originalTitle.current; };
  }, []);

  const handleLeave = () => {
    if (sessionData?.id) {
      navigator.sendBeacon(
        "/api/games/clickRisk/abandon",
        JSON.stringify({ gameSessionId: sessionData.id })
      );
    }
  };

  // --- Lógica de Visibilidad y Temporizador ---
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden" && sessionData?.id && sessionData?.status === "ACTIVE") {
        setIsCounting(true);
      } else {
        setIsCounting(false);
        setSeconds(60);
        document.title = originalTitle.current;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (isCounting) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleLeave();
            document.title = "⚠️ SESIÓN EXPIRADA";
            return 0;
          }
          const nextValue = prev - 1;
          document.title = `⌛ (${nextValue}s) ¡Regresa!`;
          return nextValue;
        });
      }, 1000);
    }
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isCounting, sessionData]);


  const handleBottonCashout = () => {
  	if (sessionData?.gameReward <= 5 && sessionData?.status != "FINISHED") {
  	console.log(sessionData?.gameReward <= 5 && sessionData?.status !== "FINISHED")
  	return true
  	}
  	console.log(sessionData?.gameReward <= 5 && sessionData?.status !== "FINISHED")
  	return false
  }

  const getAbandon = async () => {
    try {
      const res = await fetch("/api/games/clickRisk/abandon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameSessionId: sessionData.id }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  // --- Acciones de API ---
  const getStart = async () => {
    try {
      const res = await fetch("/api/games/clickRisk/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientSeed: null }),
      });
      const data = await res.json();
      if (data?.estado !== null && data?.gameSession?.gameReward > 2) {
      	setSessionData(data.gameSession);
      	setPorcentajePerdida(data.gameSession.percentLoss || null); // Reiniciar visualmente
        setSessionActive(true);	
      }
      setSessionData(data.gameSession);
      setPorcentajePerdida(data || null); // Reiniciar visualmente
      setSeconds(60);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBalance = async () => {
      try {
        await fetch("/api/wallet")
        .then(res => res.json())
        .then(data => setBalance(data.balance));
      }
      catch {
      }
  };

  const getCLick = async () => {
    try {
      const res = await fetch("/api/games/clickRisk/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setPorcentajePerdida(data);
      setSessionData(data.gameSession);
      handleBottonCashout()
    } catch (error) {
      console.error(error);
    }
  };



  const getCashout = async () => {
    try {
    	const sessionDataId = sessionData?.id || null
      await fetch("/api/games/clickRisk/cashout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionDataId: sessionDataId }),
      });
      if (sessionActive) return;

      await updateBalance(balance)
      await refresh();
      setShowModal(true); // Al finalizar con éxito, mostramos el modal
    } catch (error) {
      console.error(error);
    }
  };

  // --- Manejo del Modal ---
  const handleRestart = () => {
    setSessionData(null);
    setPorcentajePerdida(null);
    setShowModal(false);
    setSessionActive(false);
    getStart();
  };

  const handleRestartSession = async () => {
  	await getAbandon();
  	setSessionData(null);
    setPorcentajePerdida(null);
    setShowModal(false);
    setSessionActive(false);
    router.push("/games");
  }

  const handleExit = () => {
    router.push("/games");
  };


  function PixelButton({
    color,
    children,
    onClick,
    disabled
  }: {
    color: string
    children: React.ReactNode
    onClick?: () => void
    disabled: boolean
  }) {
    return (
      <button
        onClick={onClick}
        className="relative h-fit w-full disabled:brightness-190 font-bold hover:brightness-130 hover:cursor-pointer"
        style={{ color }}
        disabled={disabled}
      >
        <div className="relative h-full py-5 px-4">
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
          <span className="block flex gap-2 justify-center items-center -translate-y-2">
          {children}
          </span>
        </div>
      </button>
    )
  }



  return (
    <div className="p-5 flex justify-center gap-10 w-full h-full relative">
    	
      <div className="relative h-full w-80 sm:w-65 lg:w-80 flex flex-col justify-between">

             <div className="relative lg:w-74 mb-14 min-h-28 top-0 left-0 z-100">
                <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute flex justify-between gap-3 left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-6 h-full bg-[var(--foreground)]"></div>
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                  <div className="absolute px-2 ml-2 w-13 h-13 ">
                  	<div className="w-2 h-8 bg-[var(--foreground)]"></div>
                  	<div className="w-5 h-3 bg-[var(--foreground)]"></div>
                  	<div className="absolute w-2 h-5 right-4 top-3 bg-[var(--foreground)]"></div>
                  </div>
                </div>
                <div className="horizontalStick absolute left-0 top-0 w-full h-3 mt-1 px-2">
                  <div className="w-full h-full bg-[var(--foreground)] text-[var(--background)] gap-2 flex items-center px-2">
                  </div>
                </div>  
                <div className="px-2 w-70 h-29 absolute left-1/2 top-1/2 -translate-1/2 flex items-center justify-center">
						      <h1 className="font-bold text-3xl lg:text-4xl ">ClickRisk Game</h1>
                </div>
              </div>

      <div className="flex w-full h-fit">
      	<div className="w-full h-fit">
      		<span className="text-2xl  text-center">Perdida : {porcentajePerdida?.porcentajePerdida < 100 ? (porcentajePerdida?.porcentajePerdida || 1) : (porcentajePerdida?.porcentajePerdida !== 0 ? porcentajePerdida?.porcentajePerdida || sessionData?.percentLoss : 0) }%</span>
             <div className="relative w-full mb-2 h-25 top-0 left-0 z-100">
                <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 top-0 w-full h-3 mt-1 px-2">
                  <div className="w-full h-full bg-[var(--foreground)] text-[var(--background)] gap-2 flex items-center px-2">
                  </div>
                </div>  
							<div className="px-2 w-23/24 h-14 mt-[2px] gap-2 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-between">
							  {Array.from({ length: 10 }).map((_, index) => {
							    // Calculamos el umbral para este bloque (10, 20, 30... 100)
							    const threshold = (index + 1) * 10;
							    const isActive = (porcentajePerdida?.porcentajePerdida || 0) >= threshold;

							    return (
							      <div
							        key={index}
							        className={`h-full flex-1 ${
							          isActive 
							            ? "bg-[var(--foreground)] opacity-100" 
							            : "bg-gray-700 opacity-30"
							        }`}
							      />
							    );
							  })}
							</div>
							</div>
      	</div>
      </div>
      <div className=" h-full py-5 flex flex-col items-center justify-between">
      <div className="h-fit py-5 flex items-center text-2xl justify-center">
              <div className="relative w-74 lg:w-74 mb-14 min-h-33 top-0 left-0 z-100">
                <div className="verticalStick absolute flex flex-col justify-center items-center translate-y-1 left-0 top-0 w-2 h-full ">
                  <div className="w-2 h-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-4 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2  bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-4 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2  bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-4 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2  bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 top-0 w-1 h-full py-3">
                  <div className="w-2 h-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 -translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 -translate-x-4 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 -translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2  bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 -translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 -translate-x-4 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 -translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2  bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 -translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 -translate-x-4 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 -translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2  bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 -translate-x-2 bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute flex justify-between gap-3 left-0 bottom-0 w-full h-2 px-3 pl-4">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 top-0 w-full h-2 mt-1 px-1">
                  <div className="w-full h-full bg-[var(--foreground)] text-[var(--background)] gap-2 flex items-center px-2">
                  </div>
                </div>  
                <div className="px-2 w-70 h-29 absolute left-1/2 top-1/2 -translate-1/2 flex items-center justify-center">
						      <h1 className="font-bold text-3xl lg:text-4xl p-5 bg-[var(--foreground)] text-[var(--background)] min-w-20 flex justify-center items-center">
						      	{sessionData?.status === "FINISHED" ? "Perdiste :v" : (sessionData?.gameReward && sessionData?.gameReward)}
						      </h1>

                </div>
              </div>
        {/*<span>[Ganancia]: {sessionData?.status === "FINISHED" ? "Perdiste :v" : (sessionData?.gameReward || 0)}</span>*/}
      
      </div>
      {isCounting && (
        <div className=" border border-red-400 text-red-700 px-4 py-3 rounded animate-pulse">
          <strong>¡Cuidado!</strong> La sesión expirará en {seconds}s.
        </div>
      )}


        <span className="text-base text-black">ID: {sessionData?.id || "---"}</span>
      </div>

      <div className="relative">      	
 
        <PixelButton color="var(--foreground)" onClick={handleRestart} disabled={sessionData?.status === "ACTIVE"}>
          Empezar de nuevo
        </PixelButton>
      <div className=" mt-4 flex gap-3">
        <PixelButton color="var(--foreground)" onClick={getCLick} disabled={sessionData?.status === "FINISHED"}>
          Girar
        </PixelButton>
        <PixelButton color="var(--foreground)" onClick={getCashout} disabled={false}>
          Retirar
        </PixelButton>
        {/*<PixelButton color="var(--foreground)" onClick={getCashout} disabled={(sessionData?.gameReward <= 5 || sessionData?.status === "FINISHED")}>
          Retirar
        </PixelButton>*/}
      </div>
      </div>
          		
    	</div>

      <div className="bg-[var(--foreground)]  py-3 px-2 w-full h-full  hidden sm:block">
      <div className="bg-[var(--background)]  w-full flex flex-col xl:flex-row h-full overflow-hidden">
        <div className="h-full flex flex-col justify-between w-3/6">
          <div className="w-full h-full flex items-end px-2">
              <div className="relative w-74 lg:w-74 mb-14 min-h-33 top-0 left-0 z-100">
                <div className="verticalStick absolute flex flex-col justify-center items-center translate-y-1 left-0 top-0 w-2 h-full ">
                  <div className="w-2 h-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-4 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2  bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-4 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2  bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-4 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2  bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 top-0 w-1 h-full py-3">
                  <div className="w-2 h-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-4 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-6 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-8 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-10 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-12 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-10 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-8 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-6 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-4 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 translate-x-2 bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2  bg-[var(--foreground)]"></div>
                  <div className="w-2 h-2 -translate-x-2 bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute flex justify-between gap-3 left-0 bottom-0 w-full h-2 px-3 pl-4">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 top-0 w-full h-2 mt-1 px-1">
                  <div className="w-full h-full bg-[var(--foreground)] text-[var(--background)] gap-2 flex items-center px-2">
                  </div>
                </div>  
                <div className="px-2 w-70 h-29 absolute left-1/2 top-1/2 -translate-1/2 flex items-center justify-center">
                  <h1 className="font-bold text-3xl lg:text-4xl p-5 bg-[var(--foreground)] text-[var(--background)] min-w-20 flex justify-center items-center">
                    {sessionData?.status === "FINISHED" ? "Perdiste :v" : (sessionData?.gameReward && sessionData?.gameReward)}
                  </h1>

                </div>
              </div>
          </div> 
          <div className="w-full h-full">
          </div>
        </div>
      	<div className="relative  py-3 flex justify-center xl:justify-end items-center  h-full w-full">
          <div className="absolute  flex justify-center items-start xl:items-center w-250 h-100 xl:translate-x-1/2">
            <div className="relative w-500 h-6/3 flex justify-center items-center">
              <div className="absolute scale-90 xl:scale-100 flex flex-col justify-center items-center">
                <img
                  className=""
                  src={"/circulo.png"}  
                  alt={"circulo"}
                />
   
{/*             
                <div className="bg-[var(--foreground)] -translate-y-100 w-24 h-8"></div>
                <div className="bg-[var(--foreground)] translate-y-100 w-24 h-8"></div>
                <div className="bg-[var(--foreground)] absolute translate-y-96 -translate-x-16 w-24 h-8"></div>
                <div className="bg-[var(--foreground)] absolute -translate-y-96 -translate-x-16 w-24 h-8"></div>
                <div className="bg-[var(--foreground)] absolute translate-y-89 -translate-x-32 w-24 h-8"></div>
                <div className="bg-[var(--foreground)] absolute -translate-y-89 -translate-x-32 w-24 h-8"></div>
                <div className="bg-[var(--foreground)] absolute translate-y-81 -translate-x-41 w-7 h-22"></div>
                <div className="bg-[var(--foreground)] absolute -translate-y-81 -translate-x-41 w-7 h-22"></div>
                <div className="bg-[var(--foreground)] absolute translate-y-66 -translate-x-48 w-7 h-30"></div>
                <div className="bg-[var(--foreground)] absolute -translate-y-66 -translate-x-48 w-7 h-30"></div>
                <div className="bg-[var(--foreground)] absolute top-1/2 -translate-y-1/2 -translate-x-54 w-7 h-122"></div>
           */}  
              </div>
            </div>
          </div>
        </div>
      </div>      	
{/*      <div className="flex flex-col border p-4 rounded bg-gray-50">
        <span>[resultado]: {sessionData?.status === "FINISHED" ? "Perdiste :v" : (sessionData?.gameReward || 0)}</span>
        <span>[% Perdida]: {porcentajePerdida?.porcentajePerdida || 0}%</span>
        <span className="text-xs text-gray-400">ID: {sessionData?.id || "---"}</span>
      </div>

      <div className="mt-4 flex gap-3">
        <button className="bg-green-500 text-white py-4 px-8 rounded" onClick={getCLick} disabled={sessionData?.status === "FINISHED"}>
          Girar
        </button>
        <button className="bg-blue-500 text-white py-4 px-8 rounded" onClick={getCashout}>
          Retirar (Cashout)
        </button>
      </div>*/}
      </div>



      {/* MODAL EMERGENTE */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50000">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm">
            <h3 className="text-xl font-bold mb-4">¡Retiro Exitoso!</h3>
            <p className="mb-6 text-gray-600">¿Deseas iniciar una nueva partida?</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleRestart}
                className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600"
              >
                Sí, de nuevo
              </button>
              <button 
                onClick={handleExit}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded font-bold hover:bg-gray-400"
              >
                No, salir
              </button>
            </div>
          </div>
        </div>
      )}

        {!sessionData && (
        <div className="absolute z-100 h-full top-0 w-full flex justify-center items-center text-white px-4 py-3 rounded">
          <div className="relative w-full h-full">
             <div className="relative w-full h-full top-0 left-0 scale-107  sm:scale-100  z-500000">
                <div className="verticalStick absolute left-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="verticalStick absolute right-0 top-0 w-2 h-full py-3">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick absolute left-0 bottom-0 w-full h-3 px-2">
                  <div className="w-full h-full bg-[var(--foreground)]"></div>
                </div>
                <div className="horizontalStick relative left-0 top-0 w-full h-fit mt-1 px-2">
                  <div className="w-full h-full py-2 bg-[var(--foreground)] text-[var(--background)]">
                      Cargando...
                  </div>
                </div>  
                <div className="bg-[var(--background)] px-2 h-23/24 flex justify-center items-center">
                  Cargando...
                </div>
              </div>
          </div>
        </div>
      )}
      {/* MODAL EMERGENTE */}
      {sessionActive && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50000">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm">
            <h3 className="text-2xl font-bold mb-4">¡Ya hay una sesion activa!</h3>
            <div className="mb-6 text-gray-600">
              <p>Ganancia: {sessionData?.gameReward || undefined}</p>
              <p>perdida: {sessionData?.percentLoss || undefined}%</p>
            </div>
            <p className="mb-6 text-gray-600">¿Desea abandonar?</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleRestartSession}
                className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600"
              >
                Empezar nueva partida
              </button>
              <button 
                onClick={()=>{setSessionActive(false)}}
                className="bg-gray-300 text-gray-800 px-6 py-2 rounded font-bold hover:bg-gray-400"
              >
                Seguir la partida
              </button>
            </div>
          </div>
        </div>
      )}



    </div>
  );
}