'use client'

import styles from './FarmExplorer.module.css';
import FarmProfileComponent, { FarmProfile } from './farm-profile/FarmProfileComponent'
import Link from 'next/link';
import { useSWRandGenerateData } from '@/utils/client-side-fetching';

export default function FarmExplorerComponent() {
    const generateDataFunc = (farms: FarmProfile[]) => (
        <div className={styles.farmExplorer}>
            <div className={styles.farmExplorerHeading}>
                <h1>Dạo vườn</h1>
                <Link href='/farm-explorer'>Xem thêm &gt;</Link>
            </div>
            <div className={styles.farmExplorerContent}>
                {
                    farms.map((farm, index) => <FarmProfileComponent key={farm.id} farmProfile={farm} />)
                }
            </div>
        </div>
    );
    return useSWRandGenerateData<FarmProfile[]>('/market-place/sellers', generateDataFunc);
}