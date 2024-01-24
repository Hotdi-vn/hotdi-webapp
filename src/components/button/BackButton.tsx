'use client'

import Icon from '@/components/common/icon_component';
import { useRouter } from 'next/navigation';

export function BackButton({ redirectPath }: { redirectPath?: string }) {
    const router = useRouter();

    return (
        <div onClick={() => redirectPath ? router.push(redirectPath) : router.back()}><Icon name='arrowLeft' /></div>
    )
}