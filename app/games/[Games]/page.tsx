import ClickRisk from '../gameComponents/ClickRisk'

export default async function Game({ params } : {params:any}) {




  const { Games } = await params;
  const gameName = Games.split("%20").toString();
    return (
      <main className="h-[100dvh] w-[100%] mb-12 text-lg md:text-2xl flex md:grid md:grid-cols-[1fr_240px]"> 
        <div className="flex gap-3 flex-col w-full justify-center items-center h-[95dvh] backdrop-blur-[var(--blur)] overflow-y-auto sm:overflow-x-hidden mx-4 my-5 p-8">
          {gameName === "Ruleta,(,click,y,gana!,)" && <ClickRisk url={Games}/>}
          {/* {gameName === "Ruleta,(,click,y,gana!,)" && <ClickRisk url={Games}/>} */} juego cohete
        </div>
      </main>
    )

}