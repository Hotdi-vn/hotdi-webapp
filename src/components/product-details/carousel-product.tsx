'use client'
import React, { useState } from 'react'
import { ImageViewer } from 'antd-mobile'
import Image from 'next/image'

const CarouselProduct = (prop: any) => {
    const { imageUrls } = prop
    const [images, setImages] = useState(imageUrls)
    const [activeImg, setActiveImage] = useState(imageUrls[0])
    const [visible, setVisible] = useState(false)
    return (
        <div className='flex flex-col justify-between lg:flex-row bg-white'>
            <div className='flex flex-col gap-6 block'>
                <Image
                    width={400}
                    height={400}
                    src={activeImg}
                    alt=""
                    className='w-full h-full aspect-square object-cover rounded-xl'
                    onClick={() => {
                        setVisible(true)
                    }} />
                <div className='flex flex-row h-24 overflow-scroll flex-nowrap'>
                    {images.map((image: string, index: number) => {
                        return (
                            <Image
                                width={96}
                                height={96}
                                src={image} key={index} alt="" className='w-24 h-24 rounded-md cursor-pointer border-solid border-2 border-black mx-3 float-left' onClick={() => setActiveImage(image)} />
                        )
                    })}
                </div>
            </div>
            <ImageViewer
                image={activeImg}
                visible={visible}
                onClose={() => {
                    setVisible(false)
                }}
            />
        </div>
    )
}

export default CarouselProduct