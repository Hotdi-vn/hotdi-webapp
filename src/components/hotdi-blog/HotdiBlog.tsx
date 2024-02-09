
import BlogItemComponent, { BlogItem } from "./blog-item/BlogItemComponent";
import Link from "next/link";
import styles from './HotdiBlog.module.css'
import { RightOutline } from '@/components/common/antd_mobile_client_wrapper';
import { getNoCache } from '@/utils/server-side-fetching'

export default async function HotdiBlog() {
    type blogData = {
        _id: string;
        title: string;
        content: string;
        imageUrls: string[];
        createdBy: string;
        createdAt: number;
        updatedAt: number;
    };

    type blogDataResponse = {
        data: blogData[];
        count: number;
    }

    let blogs: BlogItem[] = [];

    await getNoCache<blogData[]>('/blog/v1/posts').then((returnedObject) => {
        blogs = returnedObject.data.map((dataItem: blogData) => {
            return (
                //TODO: get avatar and name from login info
                new BlogItem(
                    '/hotdi-blog/hieu-sinh-avatar.svg',
                    dataItem.createdBy,
                    new Date(dataItem.updatedAt),
                    dataItem.title.concat('\n', dataItem.content)
                )
            );
        });
    });

    return (
        <div className={styles.blogComponent}>
            <div className={styles.heading}>
                <h1 className={styles.h1}>{'Hotdi\'s Blog'}</h1>
                <Link href='#' className={styles.a}>
                    Xem thêm <RightOutline />
                </Link>
            </div>
            <div className={styles.blogs}>
                {
                    blogs.map((blog, index) => <BlogItemComponent key={index} blogItem={blog} />)
                }
            </div>
        </div>
    );
}