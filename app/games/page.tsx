import { TargetGame } from '../components/TargetGame'

export default async function Game() {
    return (
      <main className=" h-[100dvh] w-[100%] text-md grid grid-cols-[1fr_220px]"> 
        <div className="scrollGame shadow-xl shadow-white/10 bg-white/20 h-[95dvh] backdrop-blur-[var(--blur)] overflow-y-auto overflow-x-hidden mx-4 my-5 p-8">
          <div className="bg-green-500 py-7 px-5">
            <strong className="text-3xl font-bold">Juegos</strong>
          </div>
          <div className="flex justify-center items-start gap-4 flex-wrap pt-8">
            <TargetGame
              titulo={"Ruleta ( click y gana! )"}
              desc={`!Que esperas para seguir gananado Puntos¡`}
              img={"./file.svg"}
            />
            <TargetGame
              titulo={"Duplica y Gana!"}
              desc={`!Que esperas para seguir gananado Puntos¡`}
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