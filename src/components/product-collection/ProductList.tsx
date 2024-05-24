import React, { ReactNode } from 'react';
import ProductCard from "./product-card/ProductCard";
import Link from 'next/link';
import IconComponent from '@/components/common/icon_component';
import clsx from 'clsx';
import { ProductInfo } from '@/model/market-data-model';

export default function ProductList({ products, title, shortImage = true, twoRows, readMoreLink, showLocation = true }:
    { products: ProductInfo[], title: string | ReactNode, shortImage?: boolean, twoRows?: boolean, readMoreLink?: string, showLocation?: boolean }) {

    const productCards = products.map((productInfo) => (
        <ProductCard
            key={productInfo._id}
            productInfo={productInfo}
            shortImage={shortImage}
            showLocation={showLocation}
        />
    ));

    return (
        <div className="bg-white p-3 flex flex-col gap-3">
            <div className="flex justify-between items-center">
                <div>
                    {title}
                </div>
                {
                    readMoreLink ?
                        <Link href={readMoreLink}>
                            <div className="flex items-center">
                                <p>Xem thêm </p>
                                <IconComponent name={'navigateRight'} />
                            </div>
                        </Link>
                        :
                        undefined
                }
            </div>
            <div className={clsx("flex flex-nowrap gap-3 w-screen overflow-scroll")}>
                {productCards}
            </div>
        </div>
    )
}