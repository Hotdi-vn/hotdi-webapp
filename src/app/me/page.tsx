'use client'
import { redirect } from "next/navigation";
import useSession from "@/hooks/use-session";
import { Button } from '@/components/button/button'

export default function PersonalCenter() {
    const { session: { isLoggedIn, username }, logout } = useSession();
    if( !isLoggedIn )
        redirect('/login');

    function handleLogoutEvent(){
        logout()
    }
    return(
        <>
            <div className="w-full h-full bg-white p-5">
                <div className="text-center m-1">
                    <h1>{username}</h1>
                </div>
                <div>
                    <Button onClick={handleLogoutEvent} className="w-full rounded-sm border h-11">
                        Logout
                    </Button>
                </div>
            </div>
        </>
    )
}