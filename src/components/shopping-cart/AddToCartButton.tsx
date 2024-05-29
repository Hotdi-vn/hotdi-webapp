'use client'

import { Button, ButtonProps, Toast } from 'antd-mobile';
import { ReactNode, useTransition } from 'react';
import { addCartItem } from '@/server-actions/shopping-cart-actions';
import { CartItem } from '@/model/market-data-model';

export default function AddToCartButton(
    {
        productId,
        children = 'Thêm vào giỏ hàng',
        color = 'primary',
        shape = 'rectangular',
        size = 'large',
        block = true,
        onFinish,
        ...props
    }:
        {
            productId: string,
            children?: ReactNode
            onFinish?: (cartItem: CartItem) => void | Promise<void>
        } & ButtonProps
) {
    const [isPending, startTransition] = useTransition();


    function addToCart(itemId: string) {
        startTransition(async () => {
            const res = await addCartItem(itemId);
            Toast.show({
                content: 'Đã thêm vào giỏ hàng'
            });
            if (onFinish) {
                onFinish(res.data);
            }
        })
    };

    return (
        <>
            <Button loading={isPending} color={color} shape={shape} size={size} block={block} {...props}
                onClick={() => addToCart(productId)}>
                {children}
            </Button>
        </>
    );
}