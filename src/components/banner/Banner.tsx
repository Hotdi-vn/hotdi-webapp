'use client'
import { Swiper } from 'antd-mobile';
import Image from 'next/image';
import styles from './Banner.module.css'

export default function Banner() {
    const images = [
        { imageSrc: '/banner1.png', imageAlt: 'banner-1' },
    ];

    const bannerItems = images.map(({ imageSrc, imageAlt }, index) => (
        <Swiper.Item key={index} className={styles.bannerItem}>
            <Image src={imageSrc} alt={imageAlt} height={130} width={440}></Image>
        </Swiper.Item>
    ));
    return (
        <Swiper className={styles.banner}>{bannerItems}</Swiper>
    );
}