import Banner from '@/components/banner/Banner';
import CategoryList from '@/components/category-list/CategoryList';
import ProductCollection from '@/components/product-collection/ProductCollection';
import { NavBar, SearchBar } from '@/components/common/antd_mobile_client_wrapper';
import FarmExplorerComponent from '@/components/farm-explorer/FarmExplorer';
import Icon from '@/components/common/icon_component';
import HotdiBlog from '@/components/hotdi-blog/HotdiBlog';
import { Suspense } from 'react';

export default function Home() {
  const navBar =
    <NavBar back={null} right={<Icon name='shoppingBag' />}>
      <SearchBar placeholder='tìm ở đây nè...' />
    </NavBar>;

  return (
    <div>
      <div className='top'>{navBar}</div>
      <Banner />
      <Suspense>
        <CategoryList />
      </Suspense>
      <div className='gap-12'>
        <ProductCollection title='Nổi Bật Phần Phật' />
        <ProductCollection title='Sản Phẩm Mới Toanh' />
        <ProductCollection title='Đồ Tươi Roi Rói' twoRows />
        <ProductCollection title='Đồ Khô Chân Ái' twoRows />
        <HotdiBlog />
        <FarmExplorerComponent />
      </div>
      
    </div>
  )
}