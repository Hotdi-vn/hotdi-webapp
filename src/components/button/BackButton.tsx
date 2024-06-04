'use client'

import Icon from '@/components/common/icon_component';
import { Modal } from 'antd-mobile';
import { ExclamationCircleFill } from 'antd-mobile-icons';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export function BackButton(
    {
        redirectPath, isConfirmedPrompt,
        header = <ExclamationCircleFill
            style={{
                fontSize: 64,
                color: 'var(--adm-color-warning)',
            }}
        />,
        title = 'Thoát không lưu?',
        confirmedPromptMessage = 'Thông tin sản phẩm sẽ không được lưu nếu bạn rời đi. Bạn có muốn rời đi?',
        cancelText = 'Tiếp tục chỉnh sửa',
        confirmText = 'Rời đi',
        icon = <Icon name='back' />
    }:
        {
            redirectPath?: string, isConfirmedPrompt?: boolean,
            header?: ReactNode,
            title?: string,
            confirmedPromptMessage?: string,
            cancelText?: ReactNode,
            confirmText?: ReactNode,
            icon?: ReactNode
        }) {
    const router = useRouter();

    function back() {
        redirectPath ? router.push(redirectPath) : router.back();
    }

    const onClick = () => {
        if (isConfirmedPrompt) {
            Modal.show({
                closeOnAction: true,
                header: header,
                title: title,
                content: confirmedPromptMessage,
                actions: [
                    {
                        key: 'cancel',
                        text: cancelText,
                        primary: true
                    },
                    {
                        key: 'confirm',
                        text: confirmText,
                        danger: true,
                        onClick: () => { back(); }
                    },
                ]
            })

        } else {
            back();
        }
    }

    return (
        <div onClick={onClick}>
            {icon}

        </div>
    )
}