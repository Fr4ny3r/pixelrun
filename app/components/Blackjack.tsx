"use client";
import { useState } from "react";

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

export default function Blackjack() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [playerHand, setPlayerHand] = useState<Card[]>([]);
  const [dealerHand, setDealerHand] = useState<Card[]>([]);
  const [gameState, setGameState] = useState<"idle" | "playing" | "ended">("idle");
  const [message, setMessage] = useState<string>("¡Haz una apuesta para empezar!");

  // Iniciar partida
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

  return (
    <div className="max-w-xl mx-auto p-6 bg-slate-900 text-white rounded-xl shadow-lg mt-10 text-center">
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">Blackjack - PixelRun</h2>
      
      <div className="mb-6 p-4 bg-slate-800 rounded-lg">
        <p className="text-lg font-medium text-amber-300">{message}</p>
      </div>

      {/* Dealer Hand */}
      <div className="mb-6">
        <h3 className="text-sm text-slate-400 mb-2">Mano del Dealer</h3>
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
      <div className="mb-6">
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
  );
}