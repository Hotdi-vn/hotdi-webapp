import { ResponseData } from '@/utils/data-fetching-utils';
import styles from './CategoryList.module.css';
import ProductCategory from './product-category/ProductCategory';
import { getCategories } from '@/api-services/market-service';
import { Category } from '@/model/market-data-model';
import { log } from 'console';

export default async function CategoryList() {
    let categories: ResponseData<Category[]>;
    try {
        categories = await getCategories();
    } catch (error) {
        log(error);
        return <div>Fail to load categories.</div>
    }

    return (
        <div className={styles.categories}>
            {
                categories.data.map(
                    category =>
                        <ProductCategory key={category.id} imageSource={category.imageUrl} categoryName={category.name} />
                )
            };
        </div>
    );
}