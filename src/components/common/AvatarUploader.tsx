'use client'

import { Button, ImageUploadItem, ImageUploader, ImageUploaderRef } from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import { uploadImage } from "@/server-actions/file-server-actions";
import { PictureOutline } from "antd-mobile-icons";

export default function AvatarUploader({
    value,
    onChange,
}: {
    value?: ImageUploadItem,
    onChange?: (value: ImageUploadItem) => void,
}) {
    const [fileList, setFileList] = useState<ImageUploadItem[]>(value ? [value] : []);
    const input = useRef<ImageUploaderRef>(null);

    const onOpen = () => {
        const nativeInput = input.current?.nativeElement;
        if (nativeInput) {
            nativeInput.click();
        }
    }

    const triggerValue = (changedValue: ImageUploadItem) => {
        onChange?.({ ...value, ...changedValue });
    }

    const onUploadFileChange = (uploadedItems: ImageUploadItem[]) => {
        setFileList(uploadedItems);
        triggerValue(uploadedItems.length > 0 ? uploadedItems[0] : { key: undefined, url: '' });
    }

    async function uploadAvatar(file: File): Promise<ImageUploadItem> {
        const data = new FormData();
        data.append('file', file);
        const uploadedFile = await uploadImage(data);
        if (uploadedFile == null) {
            return { url: '' };
        }
        return {
            key: uploadedFile.fileId,
            url: uploadedFile.fileUrl,
        }
    }

    useEffect(() => {
    }, []);

    return (
        <div>
            <ImageUploader
                className="hotdi-avatar-uploader"
                style={{
                    '--cell-size': '80px',
                }}
                value={fileList}
                onChange={onUploadFileChange}
                upload={uploadAvatar}
                maxCount={1}
                columns={1}
                preview={true}
            >
                <div
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: '#999999',
                    }}
                >
                    <PictureOutline style={{ fontSize: 32 }} />
                </div>
            </ImageUploader>
        </div>
    );
}