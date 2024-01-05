'use client'
import useSession from '@/hooks/use-session'
import { useSearchParams, useRouter } from 'next/navigation'

export default function HandleCallback() {
  const redirect = window.localStorage.getItem('redirect') || '/me'
  const fbToken = useSearchParams().get('code')
  const { login } = useSession()
  const route = useRouter()
  fetch('/facebook/callback?code=' + fbToken).then((response) => {
    response.json().then((res) => {
      const { data: { name, token } } = res as any
      localStorage.setItem("token", token)
      if (token) {
        login(name, {
          optimisticData: {
            isLoggedIn: true,
            username: name,
          },
        })
      }
      route.push(redirect)
    })
  })
}
