import Image from 'next/image';
import { Space, EnvironmentOutline } from '@/components/common/antd_mobile_client_wrapper';
import styles from './ProductCard.module.css';
import clsx from 'clsx';

export enum ProductCardType {
  Normal,
  Large,
}

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

export default function ProductCard({ productInfo, shortImage, fill = true, width = 0, height = 0,
  productInfoPadding = false, imageRadius = true, productCardType = ProductCardType.Normal, imageSizes = "" }:
  {
    productInfo: ProductInfo, shortImage?: boolean, fill?: boolean, width?: number, height?: number,
    productInfoPadding?: boolean, imageRadius?: boolean, productCardType?: ProductCardType, imageSizes?: string
  }) {

  const image = (
    <Image
      src={productInfo.imgUrl}
      alt={productInfo.title}
      fill={fill}
      width={fill ? 0 : width}
      height={fill ? 0 : height}
      sizes={imageSizes}
      className={clsx({
        [styles.imageRadius]: imageRadius,
        [styles.image]: !imageRadius
      })}
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
    <div className={clsx({
      [styles.cardContainer]: productCardType == ProductCardType.Normal,
      [styles.cardContainerLarge]: productCardType == ProductCardType.Large
    })}>
      {imageContainer}
      <Space direction="vertical" className={clsx({
        [styles.productInfoContainer]: !productInfoPadding,
        [styles.productInfoContainerWithPadding]: productInfoPadding
      })}>
        <div className={styles.productName}>
          {productInfo.title}
        </div>
        <div className={styles.productPrice}>
          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(productInfo.price)}
        </div>
        <div className={styles.productLocation}>
          <EnvironmentOutline />
          <div className={styles.productLocationText}>{productInfo.location}</div>
        </div>
      </Space>
    </div>
  )
}