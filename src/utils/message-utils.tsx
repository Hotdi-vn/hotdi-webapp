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