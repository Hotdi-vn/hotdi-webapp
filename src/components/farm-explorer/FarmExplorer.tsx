import Image from 'next/image';
import styles from './FarmExplorer.module.css';
import FarmProfileComponent, { FarmProfile } from './farm-profile/FarmProfileComponent'
import Link from 'next/link';

export default function FarmExplorerComponent() {
    const farms: FarmProfile[] = [
        new FarmProfile(
            '/farm-profile/nali-avatar.svg',
            'Chuyện nhà Nali',
            new Date(),
            '/farm-profile/nali-cover-image.png',
            'Trong quãng thời gian trải nghiệm và nghiên cứu làm xà phòng suốt một năm trời, chúng mình nhận ra đây là một bộ môn nghệ thuật thực sự. Cũng như nấu ăn, làm bánh, vẽ, đàn, ca hát và'
        ),
        new FarmProfile(
            '/farm-profile/vuon-rung-cua-la-avatar.svg',
            'Vườn rừng của Lá',
            new Date(),
            '/farm-profile/vuon-rung-cua-la-cover-image.png',
            'Trong quãng thời gian trải nghiệm và nghiên cứu làm xà phòng suốt một năm trời, chúng mình nhận ra đây là một bộ môn nghệ thuật thực sự. Cũng như nấu ăn, làm bánh, vẽ, đàn, ca hát và'
        ),
        new FarmProfile(
            '/farm-profile/nali-avatar.svg',
            'Chuyện nhà Nali',
            new Date(),
            '/farm-profile/nali-cover-image.png',
            'Trong quãng thời gian trải nghiệm và nghiên cứu làm xà phòng suốt một năm trời, chúng mình nhận ra đây là một bộ môn nghệ thuật thực sự. Cũng như nấu ăn, làm bánh, vẽ, đàn, ca hát và'
        ),
        new FarmProfile(
            '/farm-profile/vuon-rung-cua-la-avatar.svg',
            'Vườn rừng của Lá',
            new Date(),
            '/farm-profile/vuon-rung-cua-la-cover-image.png',
            'Trong quãng thời gian trải nghiệm và nghiên cứu làm xà phòng suốt một năm trời, chúng mình nhận ra đây là một bộ môn nghệ thuật thực sự. Cũng như nấu ăn, làm bánh, vẽ, đàn, ca hát và'
        ),
        new FarmProfile(
            '/farm-profile/nali-avatar.svg',
            'Chuyện nhà Nali',
            new Date(),
            '/farm-profile/nali-cover-image.png',
            'Trong quãng thời gian trải nghiệm và nghiên cứu làm xà phòng suốt một năm trời, chúng mình nhận ra đây là một bộ môn nghệ thuật thực sự. Cũng như nấu ăn, làm bánh, vẽ, đàn, ca hát và'
        ),
        new FarmProfile(
            '/farm-profile/vuon-rung-cua-la-avatar.svg',
            'Vườn rừng của Lá',
            new Date(),
            '/farm-profile/vuon-rung-cua-la-cover-image.png',
            'Trong quãng thời gian trải nghiệm và nghiên cứu làm xà phòng suốt một năm trời, chúng mình nhận ra đây là một bộ môn nghệ thuật thực sự. Cũng như nấu ăn, làm bánh, vẽ, đàn, ca hát và'
        ),
    ];

    return (
        <div className={styles.farmExplorer}>
            <div className={styles.farmExplorerHeading}>
                <h1>Dạo vườn</h1>
                <Link href='/farm-explorer'>Xem thêm &gt;</Link>
            </div>
            <div className={styles.farmExplorerContent}>
                {
                    farms.map((farm, index) => <FarmProfileComponent key={index} farmProfile={farm} />)
                }
            </div>
        </div>
    );
}