
export default async function Game({ params }) {
  const { Games } = await params;
  console.log(Games.split("%20").toString())

    return (
      <main className=" h-[100dvh] w-[100%] text-md grid grid-cols-[1fr_220px]"> 
        <div className="scrollGame shadow-xl shadow-white/10 bg-white/20 h-[95dvh] backdrop-blur-[var(--blur)] overflow-y-auto overflow-x-hidden mx-4 my-5 p-8">
          <div className="bg-green-500 py-7 px-5">
asd
          </div>
        </div>
      </main>
    )

}