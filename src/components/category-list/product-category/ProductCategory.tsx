import Image from 'next/image';
import styles from './ProductCategory.module.css';
import Link from 'next/link';

export default function ProductCategory({ imageSource, categoryName, categoryUrl }:
    { imageSource: string, categoryName: string, categoryUrl?: string }) {
    return (
        <Link href={categoryUrl ?? `/product?category=${categoryName}`}>
            <div className={styles.category}>
                <Image className={styles.categoryImage} src={imageSource} width={60} height={60} alt='Product category image' />
                <p className={styles.categoryName}>{categoryName}</p>
            </div>
        </Link>
    );
}