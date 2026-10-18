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
      const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
      const [message, setMessage] = useState<string>("¡Haz una apuesta para empezar!");

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
    setMessage("Tu turno: ¿Pedir (Hit) o Plantarse (Stand)?");

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
      setMessage("Te pasaste de 21. ¡Perdiste! 💀");
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
      setMessage(`¡Ganaste! (Tú: ${playerScore} vs Dealer: ${dealerScore}) 🎉`);
    } else if (playerScore < dealerScore) {
      setMessage(`El dealer gana. (Tú: ${playerScore} vs Dealer: ${dealerScore}) 😢`);
    } else {
      setMessage(`Empate (Push). (Tú: ${playerScore} vs Dealer: ${dealerScore}) 🤝`);
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
            <main className=" w-full h-full flex flex-col justify-around items-center overflow-hidden ">
                <div className="text-[var(--background)] flex flex-col sm:p-4 gap-6 bg-[var(--foreground)] sm:w-5/6 md:h-fit w-full h-fit">
                    <h1 className="text-2xl md:text-4xl hidden sm:flex">BLACKJACK</h1>
                    <div className="text-[var(--foreground)] flex flex-col xl:flex-row p-4 bg-[var(--background)] w-full h-fit">

                        <div className="flex flex-col justify-center items-center gap-8 xl:w-1/2 w-full ">
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
                              <div className=" p-6 bg-slate-900 text-white rounded-xl w-full text-center">
      
      <div className="mb- p-4  bg-slate-800 rounded-lg">
        <p className="text-lg font-medium text-amber-300">{message}</p>
      </div>

      {/* Dealer Hand */}
      <div className="flex justify-around items-center gap-3 mb-6">
        <h3 className="text-sm text-slate-400 mb-2">Repartidor: ({calculateScore(dealerHand)})</h3>
        <div className="flex justify-center gap-2">
          {dealerHand.map((card, i) => (
            <div key={i} className="w-12 h-16 bg-white text-slate-900 rounded flex flex-col justify-center items-center font-bold shadow">
              <span>{card.value}</span>
              <span className="text-lg">{card.suit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Player Hand */}
      <div className="flex justify-around items-center gap-3 mb-6">
        <h3 className="text-sm text-slate-400 mb-2">Tu Mano ({calculateScore(playerHand)})</h3>
        <div className="flex justify-center gap-2">
          {playerHand.map((card, i) => (
            <div key={i} className="w-12 h-16 bg-white text-slate-900 rounded flex flex-col justify-center items-center font-bold shadow">
              <span>{card.value}</span>
              <span className="text-lg">{card.suit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Botones de acción */}
      <div className="flex justify-center gap-4">
        {gameState !== "playing" ? (
          <button onClick={startGame} className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 rounded font-bold transition">
            {gameState === "idle" ? "Iniciar Juego" : "Jugar de Nuevo"}
          </button>
        ) : (
          <>
            <button onClick={hit} className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded font-bold transition">
              Pedir (Hit)
            </button>
            <button onClick={stand} className="px-6 py-2 bg-rose-600 hover:bg-rose-500 rounded font-bold transition">
              Plantarse (Stand)
            </button>
          </>
        )}
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