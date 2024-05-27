'use client'

import { CartItem as CartItemModel, ProductInfo } from '@/model/market-data-model';
import { Checkbox, Stepper } from 'antd-mobile';
import { useState } from 'react';
import Image from "next/image";
import Price from '@/components/common/Price';

export default function CartItem(
    { cartItem }:
        { cartItem: CartItemModel }) {
    const [quantity, setQuantity] = useState<number>(cartItem.quantity);
    const productInfo = cartItem.productId as ProductInfo;

    return (
        <>
            <div className='flex items-center p-4 bg-white justify-between'>
                <div>
                    <Checkbox value={cartItem._id}></Checkbox>
                </div>
                <div>
                    <Image width={76} height={76} src={productInfo.imageUrls.at(0) ?? ''} alt="product image" />
                </div>
                <div className='flex flex-col justify-between basis-2/3 h-20'>
                    <div>
                        <p>{productInfo.name}</p>
                    </div>
                    <div className='flex justify-between'>
                        <div>
                            <Price price={productInfo.price} />
                        </div>
                        <div>
                            <Stepper value={quantity} onChange={setQuantity} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}