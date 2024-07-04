import Image from 'next/image';
import Link from 'next/link';

export default function ProductCategory({ imageSource, categoryName, categoryUrl }:
    { imageSource: string, categoryName: string, categoryUrl?: string }) {
    return (
        <Link href={categoryUrl ?? `/product?category=${categoryName}`}>
            <div className="flex flex-col items-center gap-[5px] decoration-white">
                <Image className="shadow-[0px_4px_8px_2px_rgba(0,0,0,0.16)] rounded-xl" src={imageSource} width={60} height={60} alt='Product category image' />
                <p className="text-white">{categoryName}</p>
            </div>
        </Link>
    )
}