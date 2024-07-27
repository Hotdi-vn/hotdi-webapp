'use client'

import { ImageUploadItem, ImageUploader, ImageUploaderRef, Image } from "antd-mobile";
import { useEffect, useRef, useState } from "react";
import { uploadImage } from "@/server-actions/file-server-actions";
import { PictureOutline } from "antd-mobile-icons";
import clsx from "clsx";

export default function AvatarUploader({
    value,
    onChange,
}: {
    value?: ImageUploadItem,
    onChange?: (value: ImageUploadItem) => void,
}) {
    const input = useRef<ImageUploaderRef>(null);
    const [fileList, setFileList] = useState<ImageUploadItem[]>(value ? [value] : []);
    const [showUploadIcon, setShowUploadIcon] = useState<boolean>(fileList.length > 0 ? false : true);


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
        onUploadFileChange([{
            key: uploadedFile.fileId,
            url: uploadedFile.fileUrl,
        }]);
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
                beforeUpload={(file) => {
                    if (showUploadIcon) {
                        setShowUploadIcon(false);
                    }
                    if (fileList.length > 0) {
                        setFileList([]);
                    }
                    return Promise.resolve(file);
                }}
                upload={uploadAvatar}
                maxCount={2}
                columns={1}
                ref={input}
                renderItem={(originNode, file, fileList) => {
                    return (
                        <div>
                            <Image
                                className="rounded-full"
                                src={file.url}
                                width={80}
                                height={80}
                                fit='cover'
                                onClick={onOpen}
                            />
                        </div>
                    );
                }}
            >
                <div
                    className={clsx("w-20 h-20 rounded-full bg-[#f5f5f5] justify-center items-center text-[#999999]",
                        {
                            ["flex"]: showUploadIcon,
                            ["hidden"]: !showUploadIcon,
                        }
                    )}
                >
                    <PictureOutline style={{ fontSize: 32 }} />
                </div>
            </ImageUploader>
        </div>
    );
}