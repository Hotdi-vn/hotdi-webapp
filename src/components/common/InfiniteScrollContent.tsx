import { DotLoading } from "antd-mobile"

export default function InfiniteScrollContent({ hasMore }: { hasMore?: boolean }) {
    return (
        <>
            {hasMore ? (
                <>
                    <span>Đang tải dữ liệu</span>
                    <DotLoading />
                </>
            ) : (
                <span>Đã hết dữ liệu</span>
            )}
        </>
    )
}