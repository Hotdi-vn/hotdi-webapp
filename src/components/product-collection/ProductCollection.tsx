import React from 'react';
import ProductCard, { CollectionType, ProductCardType } from "./product-card/ProductCard";
import styles from "./ProductCollection.module.css"
import { RightOutline } from '@/components/common/antd_mobile_client_wrapper';
import Link from 'next/link';
import { get, getNoCache } from '@/utils/server-side-fetching';
import { ProductInfo } from '@/model/market-data-model';
import clsx from 'clsx';

export default async function ProductCollection({ collectionType, title, twoRows }:
  { collectionType: CollectionType, title: string, twoRows?: boolean }) {

  const horizontalCard = collectionType == "ChoNeHotDi" ? true : false;

  const response = await getNoCache<ProductInfo[]>(`/market/v1/products?collectionType=${collectionType}`);

  if (response.error) {
    return <div>{`Server error! Code: ${response.error.code}`}</div>
  }

  const productList: ProductInfo[] = response.data;

  const collectionItems = productList.map((productInfo, index) => {
    const productCardType = horizontalCard ? ProductCardType.Horizontal : ProductCardType.Normal;
    return (
      <ProductCard
        key={productInfo._id}
        productInfo={productInfo}
        shortImage={twoRows}
        productCardType={productCardType}
      />
    )
  });

  const collection = (
    <div className={clsx({
      [`${styles.collection} ${styles.twoRows}`] : twoRows,
      [styles.collection] : !twoRows 
    })}>
        {collectionItems}
    </div>
  )

  return (
    <div className={clsx({
      [styles.wrapperHorizontal] : horizontalCard,
      [styles.wrapper] : !horizontalCard
    })}>
      <div className={styles.header}>
        <h1 className={clsx({
          [styles.titleHorizontal] : horizontalCard,
          [styles.title] : !horizontalCard
        })}>
          {title}
        </h1>
        <Link href={`/product?collection=${title}`}>
          <div className={clsx({
            [styles.revealButtonHorizontal] : horizontalCard,
            [styles.revealButton] : !horizontalCard
          })}>
            Xem thêm <RightOutline />
          </div>
        </Link>
      </div>
      {collection}
    </div>
  )
}