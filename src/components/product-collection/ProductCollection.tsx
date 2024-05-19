import React from 'react';
import ProductCard, { CollectionType } from "./product-card/ProductCard";
import styles from "./ProductCollection.module.css"
import { RightOutline } from '@/components/common/antd_mobile_client_wrapper';
import Link from 'next/link';
import { get, getNoCache } from '@/utils/server-side-fetching';
import { ProductInfo } from '@/model/market-data-model';

export default async function ProductCollection({ collectionType, title, twoRows, special }:
  { collectionType: CollectionType, title: string, twoRows?: boolean, special?: boolean }) {

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

  const collection = special ? (
      <div className={`${styles.collection} ${styles.special}`}>
        {collectionItems}
      </div>
    ) :
    twoRows ? (
      <div className={`${styles.collection} ${styles.twoRows}`}>
        {collectionItems}
      </div>
  ) : (
    <div className={styles.collection}>
      {collectionItems}
    </div>
  );

  const wrapperStyle = special ? `${styles.wrapper} ${styles.special}` : styles.wrapper;

  const titleStyle = special ? `${styles.title} ${styles.special}` : styles.title;

  const revealButtonStyle = special ? `${styles.revealButton} ${styles.special}` : styles.revealButton;

  return (
    <div className={wrapperStyle}>
      <div className={styles.header}>
        <h1 className={titleStyle}>
          {title}
        </h1>
        <Link href={`/product?collection=${title}`}>
          <div className={revealButtonStyle}>
            Xem thêm <RightOutline />
          </div>
        </Link>
      </div>
      {collection}
    </div>
  )
}