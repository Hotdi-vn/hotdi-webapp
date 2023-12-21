'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/button/button'
export default function Login() {
  return (
    <div className="w-full h-full bg-white p-5">
      {/* <Link href="http://localhost:3001/facebook/login"> Google </Link> */}
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
        <Button className="w-full rounded-sm border h-11">
          <Image
            className="float-left ms-1.5"
            src="/fb.png"
            width={16}
            height={16}
            alt="icon"
          ></Image>
          Facebook
        </Button>
      </div>
    </div>
  )
}
