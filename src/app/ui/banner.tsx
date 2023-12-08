'use client'
import { Image, Swiper } from 'antd-mobile';

export default function() {
    const images = [
        {imageSrc: '/banner1.png', imageAlt: 'banner-1'},
    ];

    const bannerItems = images.map(({imageSrc, imageAlt}, index) => (
        <Swiper.Item key={index}>
            <div>
                <Image src={imageSrc} alt={imageAlt} width="390px" height="130px"></Image>
            </div>
        </Swiper.Item>
    ));
    return (
        <Swiper>{bannerItems}</Swiper>
    );
}