'use client'

import Icon from '@/components/common/icon_component';
import { Dialog } from 'antd-mobile';
import { useRouter } from 'next/navigation';

export function BackButton(
    {
        redirectPath, isConfirmedPrompt,
        confirmedPromptMessage = 'Thông tin sản phẩm sẽ không được lưu nếu bạn rời đi. Bạn có muốn rời đi?',
        cancelText = 'Ở lại',
        confirmText = 'Rời đi'
    }:
        {
            redirectPath?: string, isConfirmedPrompt?: boolean,
            confirmedPromptMessage?: string,
            cancelText?: string,
            confirmText?: string,
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
        <div onClick={onClick}><Icon name='back' /></div>
    )
}