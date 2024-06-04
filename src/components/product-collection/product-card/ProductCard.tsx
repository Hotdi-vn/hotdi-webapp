import Image from 'next/image';
import { Space, EnvironmentOutline } from '@/components/common/antd_mobile_client_wrapper';
import styles from './ProductCard.module.css';
import clsx from 'clsx';
import Link from 'next/link';
import { ProductInfo } from '@/model/market-data-model';

export enum ProductCardType {
  Normal,
  Large,
  Special
}

export enum CollectionType {
  NoiBatPhanPhat = "NoiBatPhanPhat",
  SanPhamMoiToanh = "SanPhamMoiToanh",
  ChoNeHotDi = "ChoNeHotDi",
  DoTuoiRoiRoi = "DoTuoiRoiRoi",
  DoKhoChanAi = "DoKhoChanAi"
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
  productInfoPadding = false, imageRadius = true, productCardType = ProductCardType.Normal, imageSizes = "33vw", showLocation = true }:
  {
    productInfo: ProductInfo, shortImage?: boolean, fill?: boolean, width?: number, height?: number,
    productInfoPadding?: boolean, imageRadius?: boolean, productCardType?: ProductCardType, imageSizes?: string, showLocation?: boolean
  }) {

  let specialType = false;
  if (productInfo.collectionType == "ChoNeHotDi") {
    specialType = true;
    productCardType = ProductCardType.Special;
    productInfoPadding = true;
  }

  const image = (
    <Image
      src={productInfo.imageUrls.at(0) ?? ''}
      alt={productInfo.name}
      fill={fill}
      width={fill ? 0 : width}
      height={fill ? 0 : height}
      sizes={imageSizes}
      className={clsx({
        [styles.imageRadiusLeft]: specialType,
        [styles.imageRadius]: imageRadius && !specialType,
        [styles.image]: !imageRadius
      })}
    />
  )

  const imageContainer = shortImage ? (
    <div className={`${styles.imageContainer} ${styles.fourByThree}`}>
      {image}
    </div>
  ) : specialType ? (
    <div className={`${styles.imageContainer} ${styles.special}`}>
      {image}
    </div>
  ) : (
    <div className={`${styles.imageContainer} ${styles.square}`}>
      {image}
    </div>
  )

  const priceAndSoldCount = specialType ? (
    <div className={styles.priceAndSoldCountSpecial}>
      <div className={styles.productPrice}>
        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(productInfo.price)}
      </div>
      <div className='text-neutral-300'>|</div>
      <div className={styles.numberSold}>
        Đã bán {formatNumber(productInfo.soldCount)}
      </div>
    </div>
  ) : (
    <div className={styles.priceAndSoldCount}>
      <div className={styles.productPrice}>
        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(productInfo.price)}
      </div>
      <div className={styles.numberSold}>
        Đã bán {formatNumber(productInfo.soldCount)}
      </div>
    </div>
  )

  return (
    <Link href={`/product/${productInfo._id}`}>
      <div className={clsx({
        [styles.cardContainer]: productCardType == ProductCardType.Normal,
        [styles.cardContainerLarge]: productCardType == ProductCardType.Large,
        [styles.cardContainerSpecial]: productCardType == ProductCardType.Special
      })}>
        {imageContainer}
        <Space direction="vertical" className={clsx({
          [styles.productInfoContainer]: !productInfoPadding,
          [styles.productInfoContainerWithPadding]: productInfoPadding
        })}>
          <div className={clsx({
          [styles.productName]: !specialType,
          [styles.productNameSpecial]: specialType
        })}>
            {productInfo.name.substring(0, 30)}
            {productInfo.name.length > 30 ? '...' : ''}
          </div>
          {priceAndSoldCount}
          {
            showLocation ?
              <div className={styles.productLocation}>
                <EnvironmentOutline />
                <div className={styles.productLocationText}>{productInfo.location}</div>
              </div>
              :
              undefined
          }
        </Space>
      </div>
    </Link>
  )
}