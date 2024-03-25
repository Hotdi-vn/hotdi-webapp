'use client'

import { Button, ButtonProps } from 'antd-mobile';
import { useRouter } from 'next/navigation';

type NavigationButtonProps = {
    path: string

} & ButtonProps;

export function NavigationButton({ path = '/', ...props }
    : NavigationButtonProps) {
    const router = useRouter();

    return (
        <Button onClick={() => router.push(path)} {...props} />
    );
}