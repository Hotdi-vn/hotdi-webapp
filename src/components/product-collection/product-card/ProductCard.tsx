import Image from 'next/image';
import { Space, EnvironmentOutline } from '@/components/common/antd_mobile_client_wrapper';
import styles from './ProductCard.module.css';
import clsx from 'clsx';
import Link from 'next/link';

export enum ProductCardType {
  Normal,
  Large,
}

export enum CollectionType {
  NoiBatPhanPhat = "NoiBatPhanPhat",
  SanPhamMoiToanh = "SanPhamMoiToanh",
  ChoNeHotDi = "ChoNeHotDi",
  DoTuoiRoiRoi = "DoTuoiRoiRoi",
  DoKhoChanAi = "DoKhoChanAi"
}

export class ProductInfo {
  _id: string;
  imageUrls: string[];
  name: string;
  price: number;
  soldCount: number;
  location: string;
  collectionType: CollectionType;

  constructor(
    _id: string,
    imageUrls: string[],
    name: string,
    price: number,
    soldCount: number,
    location: string,
    collectionType: CollectionType
  ) {
    this._id = _id
    this.imageUrls = imageUrls
    this.name = name
    this.price = price
    this.soldCount = soldCount
    this.location = location
    this.collectionType = collectionType
  }
}

//function to format 1000 as 1K, 1000000 as 1M, etc.
export function formatNumber(num: number, precision: number = 1) {
  const map = [
    { suffix: 'T', threshold: 1e12 },
    { suffix: 'B', threshold: 1e9 },
    { suffix: 'M', threshold: 1e6 },
    { suffix: 'K', threshold: 1e3 },
    { suffix: '', threshold: 1 },
  ];

  const found = map.find((x) => num >= x.threshold);
  if (found) {
    if (found.threshold == 1) { return num }
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
      src={productInfo.imageUrls.at(0) ?? ''}
      alt={productInfo.name}
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
    <Link href={`/product/${productInfo._id}`}>
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
            {productInfo.name.substring(0, 30)}
            {productInfo.name.length > 30 ? '...' : ''}
          </div>
          <div className={styles.productPrice}>
            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(productInfo.price)}
          </div>
          <div className={styles.numberSold}>
            Đã bán {formatNumber(productInfo.soldCount)}
          </div>
          <div className={styles.productLocation}>
            <EnvironmentOutline />
            <div className={styles.productLocationText}>{productInfo.location}</div>
          </div>
        </Space>
      </div>
    </Link>
  )
}