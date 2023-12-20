'use client'

import { NavBar } from "@/components/common/antd_mobile_client_wrapper";
import { useRouter } from "next/navigation";


export default function Product() {
    const router = useRouter();
    const navBar = <NavBar onBack={() => router.back()}>Nổi bât phần phật</NavBar>;

    return (
        <div>
            <div className='top'>{navBar}</div>
            Product List
        </div>
    )
}