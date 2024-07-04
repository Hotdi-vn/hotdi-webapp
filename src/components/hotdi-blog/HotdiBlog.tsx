
import BlogItemComponent, { BlogItem } from "./blog-item/BlogItemComponent";
import Link from "next/link";
import { RightOutline } from '@/components/common/antd_mobile_client_wrapper';
import { getNoCache, get } from '@/utils/server-side-fetching';

export default async function HotdiBlog() {
    type BlogData = {
        _id: string,
        title: string,
        content: string,
        imageUrls: string[],
        createdBy: string,
        createdAt: number,
        updatedAt: number,
    }

    type UserProfile = {
        _id: string,
        name: string,
        picture: string,
        createdAt: number
    }

    type CompleteBlogData = BlogData & {
        authorName: string,
        avatarURL: string
    }

    let blogDataList: BlogData[] = (await getNoCache<BlogData[]>('/blog/v1/posts')).data;
    let userProfileList: UserProfile[] = [];
    let completeBlogDataList: CompleteBlogData[] = [];

    //get user profile data for author of each blog post
    for (let i = 0; i < blogDataList.length; i++) {
        let userData = (await get<UserProfile>('/auth/v1/users/' + blogDataList[i].createdBy, 1800)).data;
        userProfileList[i] = userData;
    }

    //combine blog and author data to form complete blog data
    completeBlogDataList = blogDataList.map((blog: BlogData, index) => {
        return (
            {
                _id: blog._id,
                title: blog.title,
                content: blog.content,
                imageUrls: blog.imageUrls,
                createdBy: blog.createdBy,
                createdAt: blog.createdAt,
                updatedAt: blog.updatedAt,
                authorName: userProfileList[index].name,
                avatarURL: userProfileList[index].picture
            }
        )
    })

    //map blog data to array of BlogItem objects
    let blogs: BlogItem[] = completeBlogDataList.map((dataItem: CompleteBlogData) => {
        return (
            new BlogItem(
                //TODO: use the URL instead of the placeholder when app is published (right now URL contains no image)
                // dataItem.avatarURL,
                "/placeholder-avatar.svg",
                dataItem.authorName,
                new Date(dataItem.updatedAt),
                dataItem.title.concat('\n', dataItem.content)
            )
        )
    })

    return (
        <div className="flex flex-col w-screen bg-[url('/background-paper-texture.png')] bg-[#995e3e] bg-blend-soft-light">
            <div className="flex flex-row w-screen h-[65px] justify-between items-center px-3 py-5">
                <h1 className="text-white">{"Hotdi's Blog"}</h1>
                <Link href='#' className="flex items-center text-white">
                    Xem thêm <RightOutline />
                </Link>
            </div>
            <div className="flex flex-row gap-3 w-screen overflow-x-auto flex-nowrap px-3 pb-[30px]">
                {
                    blogs.map((blog, index) => <BlogItemComponent key={index} blogItem={blog} />)
                }
            </div>
        </div>
    )
}