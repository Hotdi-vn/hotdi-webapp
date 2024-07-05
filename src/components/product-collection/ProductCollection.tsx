import React from 'react';
import ProductCard, { CollectionType, ProductCardType } from "./product-card/ProductCard";
import { RightOutline } from '@/components/common/antd_mobile_client_wrapper';
import Link from 'next/link';
import { get, getNoCache } from '@/utils/server-side-fetching';
import { ProductInfo } from '@/model/market-data-model';
import clsx from 'clsx';

export default async function ProductCollection({ collectionType, title, twoRows }:
  { collectionType: CollectionType, title: string, twoRows?: boolean }) {

  const response = await getNoCache<ProductInfo[]>(`/market/v1/products?collectionType=${collectionType}`);

  if (response.error) {
    return <div>{`Server error! Code: ${response.error.code}`}</div>
  }

  const productList: ProductInfo[] = response.data;

  const collectionItems = productList.map((productInfo, index) => {
    const productCardType = collectionType == CollectionType.ChoNeHotDi ? ProductCardType.Horizontal : ProductCardType.Normal;
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
      ["grid-rows-[repeat(2,1fr)] grid grid-flow-col auto-rows-min auto-cols-min gap-[1em] w-screen overflow-x-scroll overflow-y-hidden whitespace-nowrap overscroll-x-contain px-8 pb-5"] : collectionType == CollectionType.ChoNeHotDi,
      ["grid-rows-[repeat(2,1fr)] grid grid-flow-col auto-rows-min auto-cols-min gap-[1em] w-screen overflow-x-scroll overflow-y-hidden whitespace-nowrap overscroll-x-contain px-3 pb-5"] : twoRows,
      ["grid grid-flow-col auto-rows-min auto-cols-min gap-[1em] w-screen overflow-x-scroll overflow-y-hidden whitespace-nowrap overscroll-x-contain px-3 pb-5"] : !twoRows && collectionType !== CollectionType.ChoNeHotDi
    })}>
        {collectionItems}
    </div>
  )

  return (
    <div className={clsx({
      ["bg-[#376116] bg-[url('/background-paper-texture.png')] bg-blend-soft-light text-base"] : collectionType == CollectionType.ChoNeHotDi,
      ["bg-white text-base"] : collectionType !== CollectionType.ChoNeHotDi
    })}>
      <div className="flex w-screen justify-between items-center py-5 px-3">
        <h1 className={clsx({
          ["text-white font-bold text-[1.25em]"] : collectionType == CollectionType.ChoNeHotDi,
          ["text-[#3A6F05] font-bold text-[1.25em]"] : collectionType !== CollectionType.ChoNeHotDi
        })}>
          {title}
        </h1>
        <Link href={`/product?collection=${title}`}>
          <div className={clsx({
            ["text-white flex items-center"] : collectionType == CollectionType.ChoNeHotDi,
            ["flex items-center"] : collectionType !== CollectionType.ChoNeHotDi
          })}>
            Xem thêm <RightOutline />
          </div>
        </Link>
      </div>
      {collection}
    </div>
  )
}