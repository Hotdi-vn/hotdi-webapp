import Banner from '@/components/banner/Banner';
import CategoryList from '@/components/category-list/CategoryList'
import FarmExplorerComponent from '@/components/farm-explorer/FarmExplorer';

export default function Home() {
  return (
    <div>
      <Banner />
      <CategoryList />
      <FarmExplorerComponent />
    </div>
  )
}