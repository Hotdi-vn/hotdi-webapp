import { ImageInfo, ShopProfile, ShopProfileStatus } from "@/model/market-data-model";
import ProfileStatusNotice from "./ProfileStatusNotice";
import { Avatar, Button } from "@/components/common/antd_mobile_client_wrapper";
import { CheckCircleFill, ExclamationCircleFill, ForbidFill } from "antd-mobile-icons";
import { ReactNode } from "react";
import { NavigationButton } from "../button/NavigationButton";

export default async function ShopInfoCard(
    {
        profile,
    }: {
        profile?: ShopProfile,
    }
) {

    function getTick(): [string, ReactNode] {
        switch (profile?.status) {
            case ShopProfileStatus.New:
                return ['#E8E8E8', ''];
            case ShopProfileStatus.WaitingApproval:
                return ['#FF8F1F', <ForbidFill key={1} />];
            case ShopProfileStatus.Rejected:
                return ['#FF3141', <ExclamationCircleFill key={2} />];
            case ShopProfileStatus.Approved:
                return ['#00B578', <CheckCircleFill key={3} />];
            default:
                return ['#E8E8E8', ''];
        }
    }

    const [color, tick] = getTick();
    const shopIcon = profile?.avatarImageId ? (profile.avatarImageId as ImageInfo)?.url : '/icons/shop_active.svg';
    return (
        <div className="flex flex-col gap-2">
            <div>
                <ProfileStatusNotice status={profile?.status} />
            </div>
            <div className="flex flex-col p-3 bg-white gap-6">
                <div className="flex flex-row gap-2">
                    <Avatar src={shopIcon}
                        style={{
                            '--border-radius': '24px',
                            '--size': '48px',
                            border: `solid 1px ${color}`,
                            padding: '4px'
                        }}
                    />
                    <div className="flex flex-col">
                        <div className="flex flex-row text-xl font-medium">
                            {profile ? profile.name : "Tên shop"}
                            {tick}
                        </div>
                        <div className="text-xs font-normal text-[#999999]">
                            {profile ? `hotdi.vn/${profile.username}` : ''}
                        </div>
                    </div>
                </div>
                <div className="flex flex-row gap-2">
                    <Button disabled className="basis-1/2" color="primary">Xem shop</Button>
                    <NavigationButton path={`/seller/shop/profile`} className="basis-1/2" color="default" fill="outline">Hồ sơ shop</NavigationButton>
                </div>
            </div>
        </div>
    );
}