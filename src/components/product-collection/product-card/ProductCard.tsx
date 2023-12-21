import Image from 'next/image';
import { Space, EnvironmentOutline } from '@/components/common/antd_mobile_client_wrapper';
import styles from './ProductCard.module.css';

export class ProductInfo {
  imgUrl: string;
  title: string;
  price: number;
  location: string;

  constructor(
    imgUrl: string,
    title: string,
    price: number,
    location: string,
  ) {
    this.imgUrl = imgUrl
    this.title = title
    this.price = price
    this.location = location
  }
}

export default function ProductCard({ productInfo, shortImage }:
  { productInfo: ProductInfo, shortImage?: boolean}) {

  const image = (
    <Image
      src={productInfo.imgUrl}
      alt={productInfo.title}
      fill={true}
      className={styles.image}
    />
  )

  const imageContainer = shortImage ? (
    <div className={`${styles.imageContainer} ${styles.fourByThree}`}>
      {image}
    </div>
  ) : (
    <div className={`${styles.imageContainer} ${styles.square}`}>
      {image}
    </div>
  )

  return (
    <Space direction="vertical" className={styles.cardContainer}>
      {imageContainer}
      <div className={styles.productName}>
        {productInfo.title}
      </div>
      <div className={styles.productPrice}>
        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND"}).format(productInfo.price)}
      </div>
      <div className={styles.productLocation}>
        <EnvironmentOutline/>
        <div className={styles.productLocationText}>{productInfo.location}</div>
      </div>
      <div/>
    </Space>
  )
}