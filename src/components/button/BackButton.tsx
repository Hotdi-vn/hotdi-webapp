'use client'

import Icon from '@/components/common/icon_component';
import { Dialog } from 'antd-mobile';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export function BackButton(
    {
        redirectPath, isConfirmedPrompt,
        confirmedPromptMessage = 'Thông tin sản phẩm sẽ không được lưu nếu bạn rời đi. Bạn có muốn rời đi?',
        cancelText = 'Ở lại',
        confirmText = 'Rời đi',
        icon = <Icon name='back' />
    }:
        {
            redirectPath?: string, isConfirmedPrompt?: boolean,
            confirmedPromptMessage?: string,
            cancelText?: string,
            confirmText?: string,
            icon?: ReactNode
        }) {
    const router = useRouter();

    function back() {
        redirectPath ? router.push(redirectPath) : router.back();
    }

    const onClick = () => {
        if (isConfirmedPrompt) {
            Dialog.confirm({
                content: confirmedPromptMessage,
                cancelText: cancelText,
                confirmText: confirmText,
                onConfirm() {
                    back();
                },
            })

        } else {
            back();
        }
    }

    return (
        <div onClick={onClick}>{icon}</div>
    )
}