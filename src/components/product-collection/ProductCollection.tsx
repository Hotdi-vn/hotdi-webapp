import React from 'react';
import ProductCard, { ProductInfo } from "./product-card/ProductCard";
import styles from "./ProductCollection.module.css"
import { RightOutline } from '@/components/common/antd_mobile_client_wrapper';

const demoProduct: ProductInfo[] = [
  new ProductInfo (
    '/product-collection/demoProduct1.jpg',
    'Combo 5 Bắp nếp mỡ gà canh tác sadding filler words to demonstrate ellipsis a few more words',
    100000,
    'TP. Hồ Chí Minh'
  ),
  new ProductInfo (
    '/product-collection/demoProduct2.jpg',
    'Tôm thẻ hàng loại 1 nuôi không cám filler words to demonstrate ellipsis a few more words',
    350000,
    'Tiền Giang'
  ),
  new ProductInfo (
    '/product-collection/demoProduct3.jpg',
    'Táo xanh Ninh Thuận hữu cơ',
    70000,
    'Ninh Thuận'
  ),
  new ProductInfo (
    '/product-collection/demoProduct4.jpg',
    'Thịt heo đen nuôi 2 năm',
    250000,
    'Daklak'
  ),
  new ProductInfo (
    '/product-collection/demoProduct5.jpg',
    'Khô cá đù 1 nắng',
    180000,
    'Vũng Tàu'
  )
]

export default function ProductCollection({ title, twoRows }:
  { title: string, twoRows?: boolean}) {

  const productList: ProductInfo[] = Array(19).fill(demoProduct).flat();

  const collectionItems = productList.map((productInfo, index) => (
    <ProductCard
      key={index}
      productInfo={productInfo}
      shortImage={twoRows}
    />
  ));

  const collection = twoRows ? (
    <div className={`${styles.collection} ${styles.twoRows}`}>
      {collectionItems}
    </div>
  ) : (
    <div className={styles.collection}>
      {collectionItems}
    </div>
  )
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>
          {title}
        </div>
        <div className={styles.revealButton}>
          Xem thêm <RightOutline />
        </div>
      </div>
      {collection}
    </div>
  )
}