import 'client-only'

import { Skeleton } from "antd-mobile";
import useSWR from "swr";
import { ResponseData, fetcher } from "./data-fetching-utils";

export function useCustomSWR<T>(path: string) {
    const { data, error, isLoading } = useSWR<ResponseData<T>>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}${path}`, fetcher);
    return { data, error, isLoading };
}

export function useSWRandGenerateData<T>(url: string, generateDataFunc: (data: T) => any, loadingSkeleton?: React.ReactNode) {
    const { data: response, error, isLoading } = useCustomSWR<T>(url);

    if (error) {
        return <div>{`Failed to load! Error: ${error}`}</div>;
    }

    if (isLoading || !response) return loadingSkeleton ?? <Skeleton.Paragraph lineCount={10} animated />;

    if (response.error) {
        return <div>{`Server error! Code : ${response.error.code}`}</div>;
    }

    if (!response.data) {
        return <div>No data</div>;
    }

    return generateDataFunc(response.data);
}