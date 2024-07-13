'use server'

import { uploadFile } from "@/api-services/file-service";

export async function uploadImage(formData: FormData) {
    const result = await uploadFile(formData);
    if (result.error) {
        console.log(result.error);
        return null;
    }
    return result.data;
}