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
  sold: number;
  location: string;

  constructor(
    imgUrl: string,
    title: string,
    price: number,
    sold: number,
    location: string,
  ) {
    this.imgUrl = imgUrl
    this.title = title
    this.price = price
    this.sold = sold
    this.location = location
  }
}

//function to format 1000 as 1K, 1000000 as 1M, etc.
export function formatNumber(num:number, precision:number = 1) {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => num >= x.threshold);
  if (found) {
    if (found.threshold == 1) {return num}
    const formatted = (num / found.threshold).toFixed(precision) + found.suffix;
    return formatted;
  }

  return num;
}


export default function ProductCard({ productInfo, shortImage, fill = true, width = 0, height = 0,
  productInfoPadding = false, imageRadius = true, productCardType = ProductCardType.Normal, imageSizes = "33vw" }:
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
          {productInfo.title.substring(0,30)}
          {productInfo.title.length > 30 ? '...' : '' }
        </div>
        <div className={styles.productPrice}>
          {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(productInfo.price)}
        </div>
        <div className={styles.numberSold}>
          Đã bán {formatNumber(productInfo.sold)}
        </div>
        <div className={styles.productLocation}>
          <EnvironmentOutline />
          <div className={styles.productLocationText}>{productInfo.location}</div>
        </div>
      </Space>
    </div>
  )
}