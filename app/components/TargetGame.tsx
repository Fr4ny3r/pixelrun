import Image from 'next/image'
import Link from 'next/link'

export function TargetGame({titulo, desc, img} : {titulo: string, desc: string, img: string}){
	return (
		<Link href={titulo ? `/games/${titulo}` : ""} className="relative rounded-xl bg-black/30 md:hover:scale-104 md:hover:-rotate-3 md:hover:border-[var(--primary)]/40 cursor-pointer border-2 p-5 min-w-75 min-h-50 transition">
			{titulo ? (
			<>
				<strong className="text-xl">{titulo}</strong>
				<p className="w-50 mt-1">{desc}</p>
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
		</Link>
	)
}