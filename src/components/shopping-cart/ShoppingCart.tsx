'use client'

import Icon from '@/components/common/icon_component';
import { InventoryStatus, ProductInfo, PublishStatus } from '@/model/market-data-model';
import { Badge, Button, NavBar, Popup } from 'antd-mobile';
import { useEffect, useState } from 'react';
import CartItem from './cart-item/CartItem';
import { getMyProducts } from '@/server-actions/product-operation-actions';
import Price from '../common/Price';

export default function ShoppingCart() {
    const [visible, setVisible] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);
    const [cartItems, setCartItems] = useState<ProductInfo[]>([]);

    async function fetchData() {
        // TODO fetch cart items instead
        const inStockProductQuery = { inventoryStatus: InventoryStatus.InStock, publishStatus: PublishStatus.Published, skip: 0, limit: 20 };
        const inStockProductResponse = await getMyProducts(inStockProductQuery);
        const inStockProductList = inStockProductResponse.data;

        setCartItems(inStockProductList);
        setCount(inStockProductList.length);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <Button fill='none' onClick={() => setVisible(true)}>
                <Badge content={count} color='#D46B08'>
                    <Icon name='shoppingBag' />
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
                    <div className='body'>
                        {
                            cartItems.map(
                                item => <CartItem key={item._id} productInfo={item} currentQuantity={1} />
                            )
                        }
                    </div>
                    <div className='bottom'>
                        <div className='flex justify-between items-center p-2'>
                            <div>
                                <h2>Tổng thanh toán: <Price price={cartItems.map((product) => product.price).reduce((prePrice, curPrice) => prePrice + curPrice, 0)} /></h2>
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