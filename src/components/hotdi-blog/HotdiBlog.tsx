
import BlogItemComponent, { BlogItem } from "./blog-item/BlogItemComponent";
import Link from "next/link";
import styles from './HotdiBlog.module.css';
import { RightOutline } from '@/components/common/antd_mobile_client_wrapper';
import { getNoCache, get } from '@/utils/server-side-fetching';
import { UserProfile } from "@/libs/session-options";

export default async function HotdiBlog() {

    type blogData = {
        _id: string;
        title: string;
        content: string;
        imageUrls: string[];
        createdBy: string;
        createdAt: number;
        updatedAt: number;
        authorName: string;
        avatarURL: string;
    };

    type userProfile = {
        _id: string,
        name: string,
        picture: string;
        createdAt: number;
    }

    let blogs: BlogItem[] = [];

    await getNoCache<blogData[]>('/blog/v1/posts').then((returnedObject) => {
        //get the blogs in the data field of the object
        let blogDataList = returnedObject.data;
        console.log(blogDataList);

        //get avatar and name of author from facebook
        blogDataList.forEach(async (dataItem) => {
            await get<userProfile>('/auth/v1/users/' + dataItem.createdBy, 30).then((user) => {
                (dataItem as any).authorName = user.data.name;
                (dataItem as any).avatarURL = user.data.picture;
            })
        })

        //map data to BlogItem array
        blogs = blogDataList.map((dataItem: blogData) => {
            return (
                new BlogItem(
                    dataItem.avatarURL,
                    dataItem.authorName,
                    new Date(dataItem.updatedAt),
                    dataItem.title.concat('\n', dataItem.content)
                )
            );
        });
    });

    return (
        <div className={styles.blogComponent}>
            <div className={styles.heading}>
                <h1 className={styles.h1}>{"Hotdi's Blog"}</h1>
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