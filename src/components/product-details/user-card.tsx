'use client'
import { UserProfile } from "@/libs/session-options";
import { useState } from "react";
import Image from "next/image";

const UserCard = ({ userProfile }: { userProfile: UserProfile }) => {
    const [imageError, setImageError] = useState(false);
    return (
        <div className="flex gap-2 p-3 justify-center bg-white">
            <div>
                <Image
                    width={32}
                    height={32}
                    className="float-left block mx-auto h-16 rounded-full"
                    src={imageError ? userProfile.picture : '/logo.png'}
                    onErrorCapture={() => setImageError(true)}
                    alt="Seller Info" />
            </div>
            <div className="flex flex-col basis-5/6">
                <p className="text-base text-black font-semibold">
                    {userProfile.name}
                </p>
                <p className="text-[#999999] text-xs font-normal">
                    Online 2 phút trước
                </p>
                <p className="text-[#999999] text-xs font-normal">
                    TP.Hồ Chí Minh
                </p>
            </div>
        </div>
    )
}

export default UserCard