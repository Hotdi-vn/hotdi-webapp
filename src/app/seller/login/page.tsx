'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/button/button'
export default function Login() {
  function handleLoginEvent(){
    const redirectUri = process.env.NEXT_PUBLIC_API_ENDPOINT + '/auth/facebook/login?redirect_uri=' + process.env.NEXT_PUBLIC_DOMAIN + '/login/callback'
    localStorage.setItem("redirect", "/seller/me")
    location.href = redirectUri
  }
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
        <h1>Đăng Nhập Với</h1>
      </div>
      <div>
        <Button onClick={handleLoginEvent} className="w-full rounded-sm border h-11">
          <Image
            className="float-left ms-1.5"
            src="/fb.png"
            width={16}
            height={16}
            alt="icon"
          />
          Facebook
        </Button>
      </div>
    </div>
  )
}
