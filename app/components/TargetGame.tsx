import Image from 'next/image'
import Link from 'next/link'

export function TargetGame({titulo, desc, img} : {titulo: string, desc: string, img: string}){
	return (
		<Link href={titulo ? `/games/${titulo}` : ""} className="relative flex justify-center text-2xl items-center px-5 hover:brightness-140 cursor-pointer min-w-70 min-h-50">
            <div className="verticalStick absolute left-0 top-0 w-1 h-full py-2">
              <div className="w-full h-full bg-[var(--foreground)]"></div>
            </div>
            <div className="verticalStick absolute right-0 top-0 w-1 h-full py-2">
              <div className="w-full h-full bg-[var(--foreground)]"></div>
            </div>
            <div className="horizontalStick absolute left-0 top-0 w-full h-1 px-2">
              <div className="w-full h-full rounded-r-full bg-[var(--foreground)]"></div>
              <div className="absolute w-3 right-0 rotate-45 h-full bg-[var(--foreground)]"></div>
              <div className="absolute w-1 left-1 h-full bg-[var(--foreground)]"></div>
            </div>
            <div className="horizontalStick absolute left-0 bottom-0 w-full h-1 px-2">
              <div className="-translate-y-4 w-full h-5 bg-[var(--foreground)]"></div>
              <div className="absolute w-3 left-0 rotate-45 -translate-y-6 h-1 bg-[var(--foreground)]"></div>
              <div className="absolute w-2 left-0 rotate-45 -translate-y-10 h-1 bg-[var(--foreground)]"></div>
              <div className="absolute w-1 right-1 h-5 -translate-y-10 bg-[var(--foreground)]"></div>
              <div className="absolute w-1 left-1 h-4 -translate-y-9 rounded-b-full bg-[var(--foreground)]"></div>
            </div>
            <div className="relative w-full h-full -translate-y-2">
              {/*<svg xmlns="http://www.w3.org/2000/svg" className="scale-120" width="32" height="32" viewBox="0 0 24 24"><title xmlns="">gamepad</title><path fill="currentColor" d="M2 5h20v14H2zm18 12V7H4v10zM8 9h2v2h2v2h-2v2H8v-2H6v-2h2zm6 0h2v2h-2zm4 4h-2v2h2z"/></svg>       */}
			{titulo ? (
			<>
				<strong className="">{titulo}</strong>
				<p className="w-50 text-lg mt-1">{desc}</p>
				<Image 
					src={img}
					alt="foto"
					width={60}
					height={60}
					className="absolute right-5 bottom-5"
				/>
			</>
			):
			(
				<div className="h-30 flex justify-center italic items-center">Pronto...</div>
			)
		}
        </div>
		</Link>
	)
}