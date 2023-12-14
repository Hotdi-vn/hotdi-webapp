import styles from './CategoryList.module.css';
import ProductCategory from './product-category/ProductCategory';

export default function CategoryList() {
    return (
        <div className={styles.categories}>
                <ProductCategory imageSource='/product-category/product-category-gao-dau.png' categoryName='Gạo đậu' />
                <ProductCategory imageSource='/product-category/product-category-thit-heo-bo.png' categoryName='Thị heo, bò' />
                <ProductCategory imageSource='/product-category/product-category-rau-cu.png' categoryName='Rau củ' />
                <ProductCategory imageSource='/product-category/product-category-gia-cam-trung.png' categoryName='Gia cầm, trứng' />
                <ProductCategory imageSource='/product-category/product-category-trai-cay.png' categoryName='Trái cây' />
                <ProductCategory imageSource='/product-category/product-category-bun-mien.png' categoryName='Bún miến' />
                <ProductCategory imageSource='/product-category/product-category-hai-san.png' categoryName='Hải sản' />
                <ProductCategory imageSource='/product-category/product-category-gia-vi.png' categoryName='Gia vị' />
        </div>
    );
}