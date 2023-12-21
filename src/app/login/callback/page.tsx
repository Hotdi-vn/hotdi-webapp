'use client'
import useSession from '@/hooks/use-session'
import { useSearchParams, useRouter } from 'next/navigation'

export default function HandleCallback() {
  const fbToken = useSearchParams().get('code')
  const { login } = useSession()
  const route = useRouter()
  fetch('/api/facebook/callback?code=' + fbToken).then((response) => {
    response.json().then((res) => {
      const { data } = res as any
      if (data) {
        login(data.name, {
          optimisticData: {
            isLoggedIn: true,
            username: data.name,
          },
        })
      }
      route.push('/')
    })
  })
}
