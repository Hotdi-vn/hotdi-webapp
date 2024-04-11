import { DotLoading } from "antd-mobile"

export default function InfiniteScrollContent({ hasMore, loadingMessage = 'Đang tải dữ liệu', noMoreDataMessage = 'Đã hết dữ liệu' }:
    { hasMore?: boolean, loadingMessage?: string, noMoreDataMessage?: string }) {
    return (
        <>
            {hasMore ? (
                <>
                    <span>{loadingMessage}</span>
                    <DotLoading />
                </>
            ) : (
                <span>{noMoreDataMessage}</span>
            )}
        </>
    )
}