import Image from 'next/image';
import styles from './ProductCategory.module.css';

export default function ProductCategory({ imageSource, categoryName }:
    { imageSource: string, categoryName: string }) {
    return (
        <div className={styles.category}>
            <Image className={styles.categoryImage} src={imageSource} width={60} height={60} alt='Product category image' />
            <p className={styles.categoryName}>{categoryName}</p>
        </div>
    );
}