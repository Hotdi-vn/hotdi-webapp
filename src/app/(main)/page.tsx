import Banner from '@/components/banner/Banner';
import CategoryList from '@/components/category-list/CategoryList';
import ProductCollection from '@/components/product-collection/ProductCollection';
import { NavBar, SearchBar } from '@/components/common/antd_mobile_client_wrapper';
import FarmExplorerComponent from '@/components/farm-explorer/FarmExplorer';
import Icon from '@/components/common/icon_component';
import HotdiBlog from '@/components/hotdi-blog/HotdiBlog';
import { Suspense } from 'react';
import { CollectionType } from '@/components/product-collection/product-card/ProductCard';
import ShoppingCart from '@/components/shopping-cart/ShoppingCart';
import BottomNavBar from '@/components/bottom-nav-bar/BottomNavBar';
import Application from '@/components/Application';

export default function Home() {
  const navBar =
    <NavBar back={null} right={<ShoppingCart />}>
      <SearchBar placeholder='tìm ở đây nè...' />
    </NavBar>;

  return (
    <Application bottom={<BottomNavBar />} top={navBar}>
      <Banner />
      <Suspense>
        <CategoryList />
      </Suspense>
      <div className='gap-12'>
        <Suspense>
          <ProductCollection collectionType={CollectionType.NoiBatPhanPhat} title='Nổi Bật Phần Phật' />
        </Suspense>
        <Suspense>
          <ProductCollection collectionType={CollectionType.SanPhamMoiToanh} title='Sản Phẩm Mới Toanh' />
        </Suspense>
        <Suspense>
          <ProductCollection collectionType={CollectionType.DoTuoiRoiRoi} title='Đồ Tươi Roi Rói' twoRows />
        </Suspense>
        <Suspense>
          <ProductCollection collectionType={CollectionType.DoKhoChanAi} title='Đồ Khô Chân Ái' twoRows />
        </Suspense>
        <Suspense>
          <HotdiBlog />
        </Suspense>
        <Suspense>
          <FarmExplorerComponent />
        </Suspense>
      </div>
    </Application>
  )
}