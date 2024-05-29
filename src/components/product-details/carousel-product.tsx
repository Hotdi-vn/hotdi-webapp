'use client'
import React, { useState } from 'react'

const CarouselProduct = (prop: any) => {
    const { imageUrls } = prop
    const [images, setImages] = useState(imageUrls)
    const [activeImg, setActiveImage] = useState(imageUrls[0])
    const [openModal, SetOpenModal] = useState(false)
    return (
        <div className='flex flex-col justify-between lg:flex-row bg-white'>
            <div className='flex flex-col gap-6 block'>
                <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl' onClick={() => {
                    SetOpenModal(true)
                }}/>
                <div className='flex flex-row h-24 overflow-scroll flex-nowrap'>
                    {images.map((image: string, index: number) => {
                        return (
                            <img src={image} key={index} alt="" className='w-24 h-24 rounded-md cursor-pointer border-solid border-2 border-black mx-3 float-left' onClick={() => setActiveImage(image)}/>
                        )
                    })}
                </div>
            </div>
            <div id="modal"
                className={openModal ? "" : "hidden"}>
                    <div className="fixed top-0 left-0 z-80 w-screen h-screen bg-black/70 flex justify-center items-center">
                    <a className="fixed z-90 top-14 right-2
                        text-white text-5xl font-bold" 
                href="javascript:void(0)"
                onClick={() => {SetOpenModal(false)}}>
                    ×
                </a>
                <img id="modal-img" src={activeImg} className="max-w-[400px] max-h-[600px] object-cover"/>
                    </div>
            </div>
        </div>
    )
}

export default CarouselProduct