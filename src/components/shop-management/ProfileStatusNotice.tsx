import { NoticeBar } from "@/components/common/antd_mobile_client_wrapper";
import { ShopProfileStatus } from "@/model/market-data-model";

export default async function ProfileStatusNotice(
    {
        status,
    }: {
        status?: ShopProfileStatus,
    }
) {
    function getNoticeInfo(status?: ShopProfileStatus): [string, 'default' | 'alert' | 'info' | 'error' | undefined] {
        let content;
        let color: 'default' | 'alert' | 'info' | 'error' | undefined;
        switch (status) {
            case ShopProfileStatus.New:
                content = 'Hồ sơ chưa được duyệt, bạn cần cập nhật hồ sơ và nộp đăng ký để chính thức bán hàng trên Hotdi.';
                color = 'alert';
                break;
            case ShopProfileStatus.WaitingApproval:
                content = 'Hồ sơ đang được duyệt, bạn có thể thêm sản phẩm và thiết lập các cài đặt cho gian hàng của mình.';
                color = 'info';
                break;
            case ShopProfileStatus.Rejected:
                content = 'Hồ sơ chưa đạt yêu cầu, vui lòng cập nhật và nộp lại hồ sơ.';
                color = 'error';
                break;
            case ShopProfileStatus.Approved:
                content = 'Hồ sơ đã được duyệt, bây giờ bạn có thể bắt đầu bán hàng tại Hotdi.';
                color = 'default';
                break;
            default:
                content = 'Hồ sơ chưa được duyệt, bạn cần cập nhật hồ sơ và nộp đăng ký để chính thức bán hàng trên Hotdi.';
                color = 'alert';
                break;
        }

        return [content, color];
    }

    const [content, color] = getNoticeInfo(status);
    return (
        <NoticeBar content={content}
            color={color} wrap={true} icon={''} />
    );
}