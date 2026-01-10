"use client"
import { useEffect, useState } from 'react'


export default function ClickRisk(){
	const [sessionData, setSessionData] = useState<any>({});
	const [porcentajePerdida, setPorcentajePerdida] = useState<any>({})

  const getCLick = async () => {
    try {
      const res = await fetch("/api/games/clickRisk/click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: 'DAILY_BONUS' }),
      })
      const gameSessionData = await res.json();
      await setPorcentajePerdida(gameSessionData)
      await setSessionData(gameSessionData.gameSession)

    }catch{
    }
  }

  const getStart = async () => {
    try {
      await fetch("/api/games/clickRisk/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientSeed: null }),
      })
      .then(res => res.json())
      .then(data => setSessionData(data.gameSession));
    }catch{
    }
  }

  useEffect(()=>{
    const handleLeave = () => {
      navigator.sendBeacon("/api/games/clickRisk/abandon", JSON.stringify({ gameSessionId: sessionData?.id })
      );
    };

    document.addEventListener("visibilitychange", ()=>{
      if (document.visibilityState === "hidden") {
      	handleLeave();
      }
    });

    return () => {
      document.removeEventListener("visibilitychange", handleLeave);
    };
  	// setSessionData({gameSession:{gameReward:0, status:"ACTIVE"}});
  	// setPorcentajePerdida({gameSession:{gameReward:0},porcentajePerdida:0});
  },[]);

  return (
  	<>
          <span>[resultado ruleta]: {sessionData?.status === "FINISHED" ? "perdiste :v" : porcentajePerdida?.gameSession?.gameReward}</span>
          <span>[% Perdida]: {porcentajePerdida?.porcentajePerdida}</span>
          {console.log(sessionData?.status)}
          <div>
            <button
              className="bg-green-500 mr-3 py-7 px-5"
              onClick={getCLick}
            >
              Girar
            </button>
            <button
              className="bg-green-500 py-7 px-5"
              onClick={getStart}
            >
              Empezar
            </button>
          </div>
  	</>

  	)


}
