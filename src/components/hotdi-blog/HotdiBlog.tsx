import BlogItemComponent, { BlogItem } from "./blog-item/BlogItemComponent";
import Link from "next/link";
import styles from './HotdiBlog.module.css'

export default function HotdiBlog() {
    const blogs: BlogItem[] = [
        new BlogItem(
            '/hotdi-blog/hieu-sinh-avatar.svg',
            'Hiếu Sinh',
            new Date(),
            'Hotdi.vn ra đời với sứ mệnh tạo ra một sàn thương mại điện tử mua bán nông sản sạch, nơi mọi giao dịch đều là sự đóng góp cho cuộc sống toàn diện và môi trường bền'
        ),
        new BlogItem(
            '/hotdi-blog/another-avatar.svg',
            'Hiếu Sinh',
            new Date(),
            'Một trong những điểm du lịch quá nổi tiếng ở tỉnh cực Bắc Thái Lan, Singha Park mang trong mình một xứ mệnh là làm thao thức bao con tim của du khách. Mình đã đi rất nhiều n'
        ),
        new BlogItem(
            '/hotdi-blog/hieu-sinh-avatar.svg',
            'Hiếu Sinh',
            new Date(),
            'Hotdi.vn ra đời với sứ mệnh tạo ra một sàn thương mại điện tử mua bán nông sản sạch, nơi mọi giao dịch đều là sự đóng góp cho cuộc sống toàn diện và môi trường bền'
        )
    ]
    return (
        <div className={styles.blogComponent}>
            <div className={styles.heading}>
                <h1 className={styles.h1}>{'Hotdi\'s Blog'}</h1>
                <Link href='https://www.facebook.com/groups/881860672889799' className={styles.a}>Xem thêm &gt;</Link>
            </div>
            <div className={styles.blogs}>
                {
                    blogs.map((blog, index) => <BlogItemComponent key={index} blogItem={blog} />)
                }
            </div>
        </div>
    );
}