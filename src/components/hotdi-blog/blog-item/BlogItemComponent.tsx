import Image from 'next/image';
import styles from './BlogItem.module.css';
import Link from 'next/link';
import Date from '@/components/common/Date';

export class BlogItem {
    avatarUrl: string;
    name: string;
    lastUpdatedDate: Date;
    content: string;

    constructor(
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
    { blogItem: BlogItem }) {
    return (
        <div className="flex flex-[0_0_318px] flex-col items-start bg-white w-[314px] rounded-md">
            <div className="flex flex-row p-2.5">
                <Image src={blogItem.avatarUrl} width={40} height={40} alt='Blog author avatar image' />
                <div className="flex flex-col px-[5px]">
                    <div className="text-base"><b>{blogItem.name}</b></div>
                    <Date date={blogItem.lastUpdatedDate}></Date>
                </div>
            </div>
            <div className="flex pt-[5px] pb-3 px-3">
                <div>
                    {blogItem.content.substring(0, 150)}...
                    <Link href='http://hotdi.vn/' className="text-neutral-400"> xem thêm</Link>
                </div>
            </div>
        </div>
    );
}