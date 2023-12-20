import Image from 'next/image';
import styles from './BlogItem.module.css'

export class BlogItem {
    avatarUrl: string;
    name: string;
    lastUpdatedDate: Date;
    content: string;

    constructor (
        avatarUrl: string,
        name: string,
        lastUpdatedDate: Date,
        content: string,
    ) {
        this.avatarUrl = avatarUrl;
        this.name = name;
        this.lastUpdatedDate = lastUpdatedDate;
        this.content = content;
    }

}

export default function BlogItemComponent({ blogItem }:
    { blogItem: BlogItem}) {
    return (
        <div className={styles.blog}>
            <div className={styles.blogHeader}>
                <Image src={blogItem.avatarUrl} width={40} height={40} alt='Blog author avatar image' />
                <div className={styles.nameAndDate}>
                    <div><b>{blogItem.name}</b></div>
                    <div>{blogItem.lastUpdatedDate.toLocaleDateString()}</div>
                </div>
            </div>
            <div className={styles.blogContent}>
                <div>{blogItem.content}</div>
            </div>
        </div>
    );
}