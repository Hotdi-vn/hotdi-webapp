'use client'

import { Button } from 'antd-mobile';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

type ButtonProps = {
    path: string
    color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    fill?: 'solid' | 'outline' | 'none';
    size?: 'mini' | 'small' | 'middle' | 'large';
    block?: boolean;
    loading?: boolean | 'auto';
    loadingText?: string;
    loadingIcon?: ReactNode;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | Promise<void> | unknown;
    type?: 'submit' | 'reset' | 'button';
    shape?: 'default' | 'rounded' | 'rectangular';
    children?: ReactNode;
}

export function NavigationButton({ path = '/', ...props }
    : ButtonProps) {
    const router = useRouter();

    return (
        <Button onClick={() => router.push(path)} {...props} />
    );
}