import { redirect } from "next/navigation";
import { getSession, logoutSession } from "@/server-actions/authentication-actions";
import { SubmitButton } from "@/components/button/SubmitButton";
import { LOGIN_REDIRECT_URL_FIELD_NAME } from "@/constants/common-contants";

export default async function PersonalCenter() {
    const session = await getSession();
    if (!session.isLoggedIn) {
        redirect(`/login?${LOGIN_REDIRECT_URL_FIELD_NAME}=/me`);
    }

    return (
        <>
            <div className="w-full h-full bg-white p-5">
                <div className="text-center m-1">
                    <h1>{session.userProfile?.name}</h1>
                </div>
                <div>
                    <form>
                        <SubmitButton formAction={logoutSession} className="w-full rounded-sm border h-11">
                            Logout
                        </SubmitButton>
                    </form>

                </div>
            </div>
        </>
    )
}