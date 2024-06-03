'use client'

import { CartItem as CartItemModel } from '@/model/market-data-model';
import { Checkbox } from 'antd-mobile';
import React from 'react';
import { UserProfile } from '@/libs/session-options';
import CartItem from './CartItem';
import IconComponent from '@/components/common/icon_component';

export default function ShopCartItems(
    { shopInfo, cartItems }:
        { shopInfo: UserProfile, cartItems: CartItemModel[] }) {

    return (
        <>
            <div className='flex flex-col items-left p-4 bg-white'>
                <div className='flex items-center gap-2'>
                    <div>
                        <Checkbox value={shopInfo.id}></Checkbox>
                    </div>
                    <div className='flex flex-col'>
                        <div className='text-sm font-semibold'>
                            {shopInfo.name}
                        </div>
                        <div className='text-xs font-normal text-[#999999]'>
                            {'TP. Hồ Chí Minh'}
                        </div>
                    </div>
                    <div>
                        <IconComponent name={'navigateRight'} />
                    </div>

                </div>
                <div>
                    {
                        cartItems.map(item => <CartItem cartItem={item} />)
                    }
                </div>
            </div>
        </>
    );
}