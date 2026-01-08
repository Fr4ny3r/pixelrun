

export default async function App() {
    return (
      <> 
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
          <div className="horizontalStick absolute left-0 top-0 w-full h-30 mt-1 px-2">
            <div className="w-full h-full bg-[var(--foreground)]">
              {/*cabeza*/}
            </div>
          </div>
        </div>
      </>
    )

}