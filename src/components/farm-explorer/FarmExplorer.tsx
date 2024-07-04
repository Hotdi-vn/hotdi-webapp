'use client'

import FarmProfileComponent, { FarmProfile } from './farm-profile/FarmProfileComponent'
import Link from 'next/link';
import { useSWRandGenerateData } from '@/utils/client-side-fetching';

export default function FarmExplorerComponent() {
    const generateDataFunc = (farms: FarmProfile[]) => (
        <div className="flex flex-col w-screen">
            <div className="flex flex-row w-screen h-16 justify-between items-center px-3 py-5 bg-white">
                <h1>Dạo vườn</h1>
                <Link href='/farm-explorer'>Xem thêm &gt;</Link>
            </div>
            <div className="flex flex-col w-screen gap-3">
                {
                    farms.map((farm, index) => <FarmProfileComponent key={farm.id} farmProfile={farm} />)
                }
            </div>
        </div>
    );
    return useSWRandGenerateData<FarmProfile[]>('/market/v1/sellers', generateDataFunc);
}