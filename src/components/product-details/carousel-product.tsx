'use client'
import React, { useState } from 'react'

const CarouselProduct = (prop: any) => {
    const { imageUrls } = prop
    const [images, setImages] = useState(imageUrls)
    const [activeImg, setActiveImage] = useState(imageUrls[0])
    return (
        <div className='flex flex-col justify-between lg:flex-row bg-white'>
            <div className='flex flex-col gap-6 block'>
                <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl'/>
                <div className='flex flex-row h-24 overflow-scroll flex-nowrap'>
                    {images.map((image: string, index: number) => {
                        return (
                            <img src={image} key={index} alt="" className='w-24 h-24 rounded-md cursor-pointer border-solid border-2 border-black mx-3 float-left' onClick={() => setActiveImage(image)}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default CarouselProduct