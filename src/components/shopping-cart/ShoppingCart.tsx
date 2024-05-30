'use client'

import Icon from '@/components/common/icon_component';
import { CartItem as CartItemModel, ProductInfo } from '@/model/market-data-model';
import { Badge, Button, Divider, NavBar, Popup } from 'antd-mobile';
import { ReactNode, useEffect, useState } from 'react';
import CartItem from './cart-item/CartItem';
import Price from '../common/Price';
import { getMyCart } from '@/server-actions/shopping-cart-actions';
import ShopCartItems from './cart-item/ShopCartItems';
import { UserProfile } from '@/libs/session-options';

export default function ShoppingCart(
    {
        icon = <Icon name='shoppingBag' />
    }:
        {
            icon?: ReactNode
        }
) {
    const [visible, setVisible] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [cartItems, setCartItems] = useState<CartItemModel[]>([]);

    async function fetchData() {
        const cartItemsRes = await getMyCart({ populate: 'productId' });
        const carItems = cartItemsRes.data;

        setCartItems(carItems);
        setCount(carItems.length);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Button fill='none' onClick={() => setVisible(true)}>
                <Badge content={count} color='#D46B08'>
                    {icon}
                </Badge>
            </Button>

            <Popup
                position='right'
                visible={visible}
                forceRender
                onClose={() => {
                    setVisible(false)
                }}
            >
                <div className='flex flex-col h-screen w-screen' >
                    <div className='top'>
                        <NavBar onBack={() => setVisible(false)} left={<h1>Giỏ hàng ({count})</h1>}>

                        </NavBar>

                    </div>
                    <div className='body divide-y-8'>
                        {
                            // TODO mapping using new data structure
                            cartItems.map(
                                item =>
                                    <ShopCartItems key={item._id} shopInfo={new UserProfile('token', 'id', 'Chuyện Nhà NaLi', '', [])} cartItems={cartItems} />
                            )
                        }
                    </div>
                    <div className='bottom'>
                        <div className='flex justify-between items-center p-2'>
                            <div>
                                <h2>Tổng thanh toán: <Price price={cartItems.map((cartItem) =>
                                    (cartItem.productId as ProductInfo).price * cartItem.quantity).reduce((prePrice, curPrice) => prePrice + curPrice, 0)} /></h2>
                            </div>

                            <div>
                                <Button color='primary'>Mua hàng</Button>
                            </div>
                        </div>

                    </div>

                </div>
            </Popup>
        </>
    );
}