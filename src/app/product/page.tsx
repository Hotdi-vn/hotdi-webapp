'use client'

import { NavBar } from "@/components/common/antd_mobile_client_wrapper";
import { useRouter, useSearchParams } from "next/navigation";
import ProductCard, { ProductInfo } from "@/components/product-collection/product-card/ProductCard";


export default function Product() {
    const demoProduct: ProductInfo[] = [
        new ProductInfo(
            '/product-collection/demoProduct1.jpg',
            'Combo 5 Bắp nếp mỡ gà canh tác sadding filler words to demonstrate ellipsis a few more words',
            100000,
            'TP. Hồ Chí Minh'
        ),
        new ProductInfo(
            '/product-collection/demoProduct2.jpg',
            'Tôm thẻ hàng loại 1 nuôi không cám filler words to demonstrate ellipsis a few more words',
            350000,
            'Tiền Giang'
        ),
        new ProductInfo(
            '/product-collection/demoProduct3.jpg',
            'Táo xanh Ninh Thuận hữu cơ',
            70000,
            'Ninh Thuận'
        ),
        new ProductInfo(
            '/product-collection/demoProduct4.jpg',
            'Thịt heo đen nuôi 2 năm',
            250000,
            'Daklak'
        ),
        new ProductInfo(
            '/product-collection/demoProduct5.jpg',
            'Khô cá đù 1 nắng',
            180000,
            'Vũng Tàu'
        ),
        new ProductInfo(
            '/product-collection/demoProduct1.jpg',
            'Combo 5 Bắp nếp mỡ gà canh tác sadding filler words to demonstrate ellipsis a few more words',
            100000,
            'TP. Hồ Chí Minh'
        ),
        new ProductInfo(
            '/product-collection/demoProduct2.jpg',
            'Tôm thẻ hàng loại 1 nuôi không cám filler words to demonstrate ellipsis a few more words',
            350000,
            'Tiền Giang'
        ),
        new ProductInfo(
            '/product-collection/demoProduct3.jpg',
            'Táo xanh Ninh Thuận hữu cơ',
            70000,
            'Ninh Thuận'
        ),
        new ProductInfo(
            '/product-collection/demoProduct4.jpg',
            'Thịt heo đen nuôi 2 năm',
            250000,
            'Daklak'
        ),
        new ProductInfo(
            '/product-collection/demoProduct5.jpg',
            'Khô cá đù 1 nắng',
            180000,
            'Vũng Tàu'
        ),
        new ProductInfo(
            '/product-collection/demoProduct1.jpg',
            'Combo 5 Bắp nếp mỡ gà canh tác sadding filler words to demonstrate ellipsis a few more words',
            100000,
            'TP. Hồ Chí Minh'
        ),
        new ProductInfo(
            '/product-collection/demoProduct2.jpg',
            'Tôm thẻ hàng loại 1 nuôi không cám filler words to demonstrate ellipsis a few more words',
            350000,
            'Tiền Giang'
        ),
        new ProductInfo(
            '/product-collection/demoProduct3.jpg',
            'Táo xanh Ninh Thuận hữu cơ',
            70000,
            'Ninh Thuận'
        ),
        new ProductInfo(
            '/product-collection/demoProduct4.jpg',
            'Thịt heo đen nuôi 2 năm',
            250000,
            'Daklak'
        ),
        new ProductInfo(
            '/product-collection/demoProduct5.jpg',
            'Khô cá đù 1 nắng',
            180000,
            'Vũng Tàu'
        )
    ];

    const searchParams = useSearchParams();
    const category = searchParams.get('category');
    const collection = searchParams.get('collection');

    const router = useRouter();
    const navBar = <NavBar onBack={() => router.back()}>{category ?? collection ?? 'Sản phẩm'}</NavBar>;

    return (
        <div>
            <div className='top'>{navBar}</div>
            <div className="flex flex-wrap gap-1.5 p-1.5">
                {demoProduct.map((product, index) =>
                    <div key={index} className="bg-white">
                        <ProductCard key={index} productInfo={product} />
                    </div>
                )}
            </div>
        </div>
    )
}