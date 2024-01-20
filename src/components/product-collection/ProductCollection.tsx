import React from 'react';
import ProductCard, { CollectionType, ProductInfo } from "./product-card/ProductCard";
import styles from "./ProductCollection.module.css"
import { RightOutline } from '@/components/common/antd_mobile_client_wrapper';
import Link from 'next/link';
import { get, getNoCache } from '@/utils/server-side-fetching';

export default async function ProductCollection({ collectionType, title, twoRows }:
  { collectionType: CollectionType, title: string, twoRows?: boolean }) {

  const response = await getNoCache<ProductInfo[]>(`/market/v1/products?collectionType=${collectionType}`);

  if (response.error) {
    return <div>{`Server error! Code: ${response.error.code}`}</div>
  }

  const productList: ProductInfo[] = response.data;

  const collectionItems = productList.map((productInfo, index) => (
    <ProductCard
      key={productInfo._id}
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
        <h1 className={styles.title}>
          {title}
        </h1>
        <Link href={`/product?collection=${title}`}>
          <div className={styles.revealButton}>
            Xem thêm <RightOutline />
          </div>
        </Link>
      </div>
      {collection}
    </div>
  )
}