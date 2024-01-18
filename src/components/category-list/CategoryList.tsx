import { get } from '@/utils/server-side-fetching';
import styles from './CategoryList.module.css';
import ProductCategory from './product-category/ProductCategory';

export class CategoryProps {
    id: number;
    name: string;
    imageUrl: string;

    constructor(
        id: number,
        name: string,
        imageUrl: string,
    ) {
        this.id = id
        this.name = name
        this.imageUrl = imageUrl
    }
}

export default async function CategoryList() {
    const response = await get<CategoryProps[]>('/market/v1/categories');

    if (response.error) {
        return <div>{`Server error! Code: ${response.error.code}`}</div>
    }

    return (
        <div className={styles.categories}>
            {
                response.data.map(
                    category =>
                        <ProductCategory key={category.id} imageSource={category.imageUrl} categoryName={category.name} />
                )
            };
        </div>
    );
}