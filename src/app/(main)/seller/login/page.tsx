import Image from 'next/image'
import { facebookLogin, zaloLogin } from '@/server-actions/authentication-actions'
import { SubmitButton } from '@/components/button/SubmitButton';
import { LOGIN_REDIRECT_URL_FIELD_NAME, SELLER_LOGIN_FIELD_NAME } from '@/constants/common-contants';

export default function SellerLogin({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {

  const loginRedirectUrl = searchParams?.[`${LOGIN_REDIRECT_URL_FIELD_NAME}`] ?? '/seller/shop';

  return (
    <div className="w-full h-full bg-white p-5">
      <div className="relative inset-0 flex m-10">
        <Image
          src="/logo.png"
          width={100}
          height={100}
          alt="logo"
          className="m-auto"
        />
      </div>
      <div className="text-center m-1">
        <h1>Trang đang nhập cho shop</h1>
        <h1>Đăng Nhập Với</h1>
      </div>
      <div>
        <form>
          <input type='hidden' name={LOGIN_REDIRECT_URL_FIELD_NAME} value={loginRedirectUrl} />
          <input type='hidden' name={SELLER_LOGIN_FIELD_NAME} value='true' />
          <SubmitButton formAction={facebookLogin} className="w-full rounded-sm border h-11">
            <Image
              className="float-left ms-1.5"
              src="/fb.png"
              width={16}
              height={16}
              alt="icon"
            />
            Facebook
          </SubmitButton>
          <SubmitButton formAction={zaloLogin} className="w-full rounded-sm border h-11">
            <Image
              className="float-left ms-1.5"
              src="/fb.png"
              width={16}
              height={16}
              alt="icon"
            />
            Zalo
          </SubmitButton>
        </form>
      </div>
    </div >
  )
}
