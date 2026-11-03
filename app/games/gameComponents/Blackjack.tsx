"use client"
import { METHODS } from "http";
import { useEffect, useState } from "react"

// Tipos básicos
type Card = { suit: string; value: string; weight: number };

const suits = ["♠", "♥", "♦", "♣"];
const values = [
  { val: "2", weight: 2 }, { val: "3", weight: 3 }, { val: "4", weight: 4 },
  { val: "5", weight: 5 }, { val: "6", weight: 6 }, { val: "7", weight: 7 },
  { val: "8", weight: 8 }, { val: "9", weight: 9 }, { val: "10", weight: 10 },
  { val: "J", weight: 10 }, { val: "Q", weight: 10 }, { val: "K", weight: 10 },
  { val: "A", weight: 11 }
];

// Función para crear un mazo nuevo
const createDeck = (): Card[] => {
  let deck: Card[] = [];
  for (let s of suits) {
    for (let v of values) {
      deck.push({ suit: s, value: v.val, weight: v.weight });
    }
  }
  return deck.sort(() => Math.random() - 0.5); // Mezclar aleatorio
};

// Calcular puntaje total manejando el As (1 u 11)
const calculateScore = (hand: Card[]): number => {
  let score = hand.reduce((acc, card) => acc + card.weight, 0);
  let aces = hand.filter(card => card.value === "A").length;
  
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
};



export function Blackjack ({url} : {url:string}) {
      const [deck, setDeck] = useState<Card[]>([]);
      const [playerHand, setPlayerHand] = useState<Card[]>([]);
      const [dealerHand, setDealerHand] = useState<Card[]>([]);
      const [gameState, setGameState] = useState<"idle" | "playing" | "ended" | "draw">("idle");
      const [message, setMessage] = useState<string>("¡Apuesta para empezar!");

      const [pokerCoins, setPokerCoins] = useState<number>(10)
      const [wallet, setWallet] = useState<any>()


        const startGame = () => {
    const newDeck = createDeck();
    const pHand = [newDeck.pop()!, newDeck.pop()!];
    const dHand = [newDeck.pop()!, newDeck.pop()!];

    setDeck(newDeck);
    setPlayerHand(pHand);
    setDealerHand(dHand);
    setGameState("playing");
    setMessage("¡Es tu turno!");

    if (calculateScore(pHand) === 21) {
      setMessage("¡Blackjack! Has ganado 🃏");
      setGameState("ended");
    }
  };

  // Pedir carta
  const hit = () => {
    if (gameState !== "playing") return;
    const newDeck = [...deck];
    const card = newDeck.pop()!;
    const newHand = [...playerHand, card];

    setDeck(newDeck);
    setPlayerHand(newHand);

    const score = calculateScore(newHand);
    if (score > 21) {
      setMessage("Te pasaste de 21. -0");
      setGameState("ended");
    }
  };

  // Plantarse (Turno del Dealer)
  const stand = () => {
    if (gameState !== "playing") return;
    setGameState("ended");

    let currentDealerHand = [...dealerHand];
    let currentDeck = [...deck];

    while (calculateScore(currentDealerHand) < 17) {
      currentDealerHand.push(currentDeck.pop()!);
    }

    setDealerHand(currentDealerHand);
    setDeck(currentDeck);

    const playerScore = calculateScore(playerHand);
    const dealerScore = calculateScore(currentDealerHand);

    if (dealerScore > 21 || playerScore > dealerScore) {
      setMessage(`¡Ganaste 0!!!`);
    } else if (playerScore < dealerScore) {
      setMessage(`El dealer gana. (-0)`);
    } else {
      setGameState("draw");
      setMessage(`Empate. ()`);
    }
  };

        useEffect(()=> {
          handleWallet()
         },[wallet])


    const handleWallet = async () => {
      try{
        await fetch("/api/wallet")
        .then(res => res.json())
        .then(data => setWallet(data.balance));

      }catch (error) {
        if (error) {
          return Response.error()
        }
      }
    }


    return (
        <>
        {gameState && "idle" ? (
            <main className=" w-full h-full flex flex-col justify-around items-center ">
                <div className="text-[var(--background)] flex flex-col sm:p-4 gap-6 bg-[var(--foreground)] sm:w-5/6 md:h-fit w-full h-fit">
                    <h1 className="text-2xl md:text-4xl hidden sm:flex">BLACKJACK</h1>
                    <div className="text-[var(--foreground)] flex flex-col xl:flex-row p-4 bg-[var(--background)] w-full h-fit">

                        <div className="flex hidden flex-col justify-center items-center gap-8 xl:w-1/2 w-full ">
                            <h2 className="text-4xl">APOSTAR</h2>
                            <div className="flex justify-center items-center gap-4">
                                <span className="bg-[var(--foreground)] text-[var(--background)] text-5xl p-1 px-8">{pokerCoins}</span>
                                <button onClick={()=>{setPokerCoins(10)}} className="hover:text-[var(--primary-red)] cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><title>trash</title><path fill="currentColor" d="M18 22H6v-2h12zM9 6h6V4h2v2h5v2h-2v12h-2V8H6v12H4V8H2V6h5V4h2zm6-2H9V2h6z"/></svg>
                                </button>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex gap-6">
                                <button onClick={()=>{wallet > pokerCoins+10 ? setPokerCoins(pokerCoins+10) : ""}} className="border-2 border-[var(--foregound)] p-2 cursor-pointer hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)]">+10</button>
                                <button onClick={()=>{wallet > pokerCoins+100 ? setPokerCoins(pokerCoins+100) : ""}} className="border-2 border-[var(--foregound)] p-2 cursor-pointer hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)]">+100</button>
                                <button onClick={()=>{wallet > pokerCoins+500 ? setPokerCoins(pokerCoins+500) : ""}} className="border-2 border-[var(--foregound)] p-2 cursor-pointer hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)]">+500</button>
                              </div>
                                <button onClick={()=>{setPokerCoins(wallet)}} className="border-2 border-[var(--foregound)] p-2 cursor-pointer hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)]">ALL IN</button>
                            </div>
                        </div>
      <div className="flex items-center py-10 sm:py-0 justify-center w-full">
        <div className=" p-6  w-full text-center">
      
      {/* <div className="relative sm:p-4 mb-8 flex border-white rounded-lg">
        <p className="absolute  md:flex top-0  sm:right-0 -translate-y-5 text-lg font-medium">{message}</p>
        <span>Total Apostado : 0</span>
      </div> */}
      
      <div className="relative md:flex flex-col lg:flex-row lg:gap-8  w-full mb-12 text-xl sm:text-2xl">
          {gameState === "draw" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <p className="text-white text-2xl font-bold">It's a Draw!</p>
              <button onClick={startGame} className="ml-4 px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200">
                Jugar de nuevo
              </button>
            </div>
          )}
          {gameState === "ended" && (
            <div className="absolute scale-125 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
              <p className="text-white text-2xl font-bold">{message}</p>
              <button onClick={startGame} className="ml-4 px-4 py-2 bg-white text-black font-bold rounded hover:bg-gray-200">
                Jugar de nuevo
              </button>
            </div>
          )}
          {/* Dealer Hand */}
        <div className="flex w-full xl:w-1/2 scale-120 sm:scale-100 flex-row-reverse justify-center xl:justify-between items-center gap-3">
          <h3 className="flex gap-3 items-center font-semibold mb-2">
            <svg xmlns="http://www.w3.org/2000/svg"  width="2.3em" height="2.3em" viewBox="0 0 24 24"><title>coins</title><path fill="currentColor" d="M23 4v11h-1v1h-3v-2h2v-2h-2v-2h2V8h-3V6h2V4h-2V3h-7v1H9v1H7V3h2V2h2V1h7v1h2v1h2v1z"/><path fill="currentColor" d="M15 8V7h-3V6H6v1H3v1H1v13h2v1h3v1h6v-1h3v-1h2V8ZM3 9h3V8h6v1h3v2h-3v1H6v-1H3Zm12 11h-3v1H6v-1H3v-3h3v1h6v-1h3Zm-3-5v1H6v-1H3v-2h3v1h6v-1h3v2Z"/></svg>
            {/* ({calculateScore(dealerHand)}) */}
          </h3>
          <div className="flex justify-center gap-2">
            <span className="flex pl-1 justify-between flex-row-reverse absolute -translate-y-8/6 left-0 text-3xl w-full font-bold">
              <p>Dealer</p>
              {calculateScore(dealerHand)}
            </span>
            {dealerHand.map((card, i) => (
              <div key={i} className="w-12 h-16 bg-white text-slate-900 rounded flex flex-col justify-center items-center font-bold shadow">
                <span>{card.value}</span>
                <span className="text-lg">{card.suit}</span>
              </div>
            ))}
          </div>
        </div>


                  <div className="relative xl:w-1/2 sm:p-4 my-10 flex justify-center md:border-x-0 md:border-y-0 border-y-4">
                  {/* <p className="absolute w-full text-left pl-2 underline md:flex top-0  sm:right-0 -translate-y-5 text-lg font-medium">{message}</p> */}
                  <span className="text-5xl flex justify-center items-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="2em" viewBox="0 0 24 24"><title>coin</title><path fill="currentColor" d="M17 9V8h-2V7H9v1H7v1H6v2h1v1h2v1h6v-1h2v-1h1V9Zm-2 2H9V9h6Z"/><path fill="currentColor" d="M21 8V7h-1V6h-2V5h-2V4H8v1H6v1H4v1H3v1H1v8h2v1h1v1h2v1h3v1h6v-1h3v-1h2v-1h1v-1h2V8ZM6 16H4v-1H3v-2h1v1h2Zm5 2H8v-2h3Zm5 0h-3v-2h3Zm5-3h-1v1h-2v-2h2v-1h1Zm0-4h-1v1h-2v1h-2v1H8v-1H6v-1H4v-1H3V9h1V8h2V7h2V6h8v1h2v1h2v1h1Z"/></svg>
                    0
                  </span>
                </div>


        {/* Player Hand */}
        <div className="w-full xl:w-1/2 scale-120 sm:scale-100 w-full flex justify-center xl:justify-between items-end gap-3 ">
          <h3 className="flex gap-3 font-semibold">
            <svg xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.3em" viewBox="0 0 24 24"><title>user</title><path fill="currentColor" d="M17 5V3h-1V2h-2V1h-4v1H8v1H7v2H6v4h1v2h1v1h2v1h4v-1h2v-1h1V9h1V5zm-2 4v1h-1v1h-4v-1H9V9H8V5h1V4h1V3h4v1h1v1h1v4zm6 10v-1h-1v-1h-1v-1h-2v-1H7v1H5v1H4v1H3v1H2v3h1v1h18v-1h1v-3zM5 19v-1h2v-1h10v1h2v1h1v2H4v-2z"/></svg>
            {/* ({calculateScore(playerHand)}) */}
          </h3>
          <div className=" flex justify-center gap-2">
            <span className="flex pl-1 justify-between absolute translate-y-11/6 left-0 text-3xl w-full font-bold">
              <p>Player</p>
              {calculateScore(playerHand)}
            </span>
            {playerHand.map((card, i) => (
              <div key={i} className="w-12 h-16 bg-white text-slate-900 rounded flex flex-col justify-center items-center font-bold shadow">
                <span>{card.value}</span>
                <span className="text-lg">{card.suit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="relative flex flex-col w-full -translate-x-1/2 left-1/2 sm:w-fit top-10 sm:top-3 justify-center gap-4">
              {gameState === "idle" ? (
            <button onClick={startGame}  className="font-bold border-2 border-[var(--foreground)] p-2 cursor-pointer hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)]">
              Empezar Juego
            </button>
            ) : (<button className="font-bold border-2 border-[var(--foreground)] p-2 cursor-pointer hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)]">Retirarse</button>)}
            <div className="flex justify-center gap-4 w-full">
              {gameState !== "playing" ? (
                <>
                  <button onClick={hit} className=" cursor-pointer px-6 py-2 bg-[var(--primary-green)] hover:bg-blue-500 rounded font-bold transition">
                    Pedir (Hit)
                  </button>
                  <button onClick={stand} className="cursor-pointer px-6 py-2 bg-[var(--primary-red)] hover:bg-rose-500 rounded font-bold transition">
                    Plantarse (Stand)
                  </button>
                </>
              ) : (
                <>
                  <button onClick={hit} className="cursor-pointer px-6 py-2 bg-[var(--primary-green)] hover:bg-blue-500 rounded font-bold transition">
                    Pedir (Hit)
                  </button>
                  <button onClick={stand} className="cursor-pointer px-6 py-2 bg-[var(--primary-red)] hover:bg-rose-500 rounded font-bold transition">
                    Plantarse (Stand)
                  </button>
                </>
              )}
            </div>
            <button className="font-bold border-2 border-[var(--foreground)] p-2 cursor-pointer hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:border-[var(--foreground)]">
              Doblar 
            </button>
        {/* {gameState !== "playing" ? (
          <>
          <button onClick={startGame} className="cursor-pointer px-6 py-2 bg-[var(--primary-green)] hover:bg-emerald-500 rounded font-bold transition">
            {gameState === "idle" ? "Iniciar Juego" : "Jugar de Nuevo"}
          </button>
          <button className="cursor-pointer px-6 py-2 bg-[var(--foreground)] text-[var(--background)] hover:bg-[var(--foreground)]/70 rounded font-bold transition">
            Retirarse
          </button>
          </>
        ) : (
          <>
            <button onClick={hit} className="cursor-pointer px-6 py-2 bg-[var(--primary-green)] hover:bg-blue-500 rounded font-bold transition">
              Pedir (Hit)
            </button>
            <button onClick={stand} className="cursor-pointer px-6 py-2 bg-[var(--primary-red)] hover:bg-rose-500 rounded font-bold transition">
              Plantarse (Stand)
            </button>
          </>
        )} */}
      </div>
    </div>
                        </div>
                    </div>
                </div>
            </main>
        ) : (<></>)}
        </>
)
}