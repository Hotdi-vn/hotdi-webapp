'use client'
import { Swiper } from 'antd-mobile';
import Image from 'next/image';
import Link from 'next/link'
import { useSWRandGenerateData } from '@/utils/client-side-fetching'; 

export default function Banner() {
    type Banner = {
        _id: string,
        name: string,
        imageUrl: string,
        link: string,
        createdBy: string,
        createdAt: number,
        updatedAt: number
    }
    
    const generateDataFunc = (images: Banner[]) => (
        <Swiper className="w-screen">{
            images.map(({ name, imageUrl, link }, index) => (
                <Swiper.Item key={index} className="w-screen aspect-[8/3]">
                    <Link href={link}>
                        <Image src={imageUrl} alt={name} height={130} width={440} priority={true}></Image>
                    </Link>
                </Swiper.Item>
            ))
        }</Swiper>
    )
    return useSWRandGenerateData<Banner[]>('/market/v1/banners', generateDataFunc);
}