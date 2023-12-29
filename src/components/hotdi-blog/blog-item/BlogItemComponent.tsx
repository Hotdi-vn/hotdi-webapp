import Image from 'next/image';
import styles from './BlogItem.module.css';
import Link from 'next/link';

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

function dateToString(date: Date) {
    const dateTimeFormat = new Intl.DateTimeFormat('vi', {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    return dateTimeFormat.format(date);
}

export default function BlogItemComponent({ blogItem }:
    { blogItem: BlogItem}) {
    return (
        <div className={styles.blog}>
            <div className={styles.blogHeader}>
                <Image src={blogItem.avatarUrl} width={40} height={40} alt='Blog author avatar image' />
                <div className={styles.nameAndDate}>
                    <div className="text-base"><b>{blogItem.name}</b></div>
                    <div className="text-gray-500/75 text-xs">{dateToString(blogItem.lastUpdatedDate)}</div>
                </div>
            </div>
            <div className={styles.blogContent}>
                <div>
                    {blogItem.content.substring(0, 150)}
                    <Link href='http://hotdi.vn/' className={styles.a}>...Xem thêm</Link>
                </div>
            </div>
        </div>
    );
}