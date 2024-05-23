'use client'
import { useState } from "react";

const UserCard = async (prop: any) => {
    const { userInfo } = prop
    const [imageError, setImageError] = useState(false);
    return (
        <div className="max-w-sm bg-white rounded-xl p-1">
            <img 
                className="float-left block mx-auto h-16 rounded-full" 
                src={ imageError ? userInfo.picture : '/logo.png'}
                onErrorCapture={() => setImageError(true)}
                alt="Seller Info"/>
            <div className="mx-2 p-1">
                <div className="space-y-0.5">
                    <p className="text-lg text-black font-semibold">
                        {userInfo.name}
                    </p>
                    <p className="text-slate-500 font-medium">
                        Online 2 phút trước
                    </p>
                    <p className="text-slate-500 font-medium">
                        TP.Hồ Chí Minh
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserCard