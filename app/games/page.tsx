import { TargetGame } from '../components/TargetGame'

export default async function Game() {
    return (
      <main className="h-[100dvh] w-[100%] text-lg md:text-2xl flex md:grid md:grid-cols-[1fr_280px]"> 
        <div className="scrollTransaction h-[95dvh] overflow-y-auto overflow-x-hidden mx-4 my-5 p-8">
          <div className="bg-[var(--foreground)] text-[var(--background)] flex gap-3 py-7 px-5">
            <strong className="text-4xl font-bold">Juegos</strong>
              <svg xmlns="http://www.w3.org/2000/svg" className="scale-120" width="48" height="48" viewBox="0 0 24 24"><title xmlns="">gamepad</title><path fill="currentColor" d="M2 5h20v14H2zm18 12V7H4v10zM8 9h2v2h2v2h-2v2H8v-2H6v-2h2zm6 0h2v2h-2zm4 4h-2v2h2z"/></svg>
          </div>
          <div className="flex justify-center items-start gap-4 flex-wrap pt-8">
            <TargetGame
              titulo={"Ruleta ( click y gana! )"}
              desc={`!Que esperas para seguir gananado Puntos`}
              img={"./file.svg"}
            />
            <TargetGame
              titulo={"Duplica y Gana!"}
              desc={`!Que esperas para seguir gananado Puntos`}
              img={"./file.svg"}
            />
            <TargetGame />
            <TargetGame />
            <TargetGame />
            <TargetGame />
          </div>
        </div>
      </main>
    )

}