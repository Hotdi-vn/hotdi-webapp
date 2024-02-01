import 'server-only'

import { InternalServerError, ResponseData, ServerError } from '@/utils/data-fetching-utils';
import { log } from 'console';
import { getSession } from '@/server-actions/authentication-actions';

type UploadFileInfo = {
    fileId: string;
    fileUrl: string;
    fileSize: string;
}

export async function uploadFile(formData: FormData): Promise<ResponseData<UploadFileInfo>> {
    let res;
    const session = await getSession();
    const file = formData.get('file') as File;
    try {
        res = await fetch(`${process.env.FILE_SERVER_ENDPOINT}/v1/files/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session.userProfile?.token}`,
                // 'Content-Type': 'multipart/form-data;boundary=boundary',
                // 'Content-Length': `${file.size}`
            },
            body: formData
        });
        return res.json();
    } catch (error) {
        log('Error when uploading file', error);
        if (error instanceof Error) {
            throw new InternalServerError(res?.status ?? 0, error.name, error.message);
        }
        throw error;
    }
}