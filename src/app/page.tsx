import Banner from '@/components/banner/Banner';
import CategoryList from '@/components/category-list/CategoryList';
import { NavBar, SearchBar } from '@/components/common/antd_mobile_client_wrapper';
import FarmExplorerComponent from '@/components/farm-explorer/FarmExplorer';
import Icon from '@/components/common/icon_component';
import HotdiBlog from '@/components/hotdi-blog/HotdiBlog';

export default function Home() {
  const navBar =
        <NavBar back={null} right={<Icon name='shoppingBag' />}>
            <SearchBar placeholder='tìm ở đây nè...' />
        </NavBar>;

  return (
    <div>
      <div className='top'>{navBar}</div>
      <Banner />
      <CategoryList />
      <HotdiBlog />
      <FarmExplorerComponent />
    </div>
  )
}