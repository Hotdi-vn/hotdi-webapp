import { Modal, Toast } from "antd-mobile";
import { ExclamationCircleFill } from "antd-mobile-icons";
import { ToastProps } from "antd-mobile/es/components/toast/toast";
import { ReactNode } from "react";

export function showError(error: any) {
    console.error(error);
    Modal.alert({
        header: <ExclamationCircleFill
            style={{
                fontSize: 64,
                color: 'var(--adm-color-warning)',
            }}
        />,
        content: 'Có lỗi xảy ra. Vui lòng thử lại.',
        confirmText: 'OK'
    });
}

export function showSuccess(content: ReactNode, props: ToastProps = { content: content, position: 'top' }) {
    Toast.show({
        content: props.content,
        position: props.position
    });
}

export function showDeleteConfirmation(
    {
        title = 'Xóa vĩnh viễn sản phẩm?',
        content = 'Bạn có chắc chắn muốn thực hiện?',
        confirmText = 'Xóa',
        cancelText = 'Hủy thay đổi',
        deleteFunc,
    }:
        {
            title?: string,
            content?: string,
            confirmText?: string,
            cancelText?: string,
            deleteFunc: () => void | Promise<void>
        }
) {
    Modal.show({
        closeOnAction: true,
        header: <ExclamationCircleFill
            style={{
                fontSize: 64,
                color: 'var(--adm-color-danger)',
            }}
        />,
        title: title,
        content: content,
        actions: [
            {
                key: 'confirm',
                text: confirmText,
                danger: true,
                primary: true,
                onClick: deleteFunc,
            },
            {
                key: 'cancel',
                text: cancelText,
            },
        ]
    });
}