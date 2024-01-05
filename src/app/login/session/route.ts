import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { defaultSession, sessionOptions } from '@/libs/session-options'
import { sleep, SessionData } from '@/libs/session-options'

// login
export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  const { username = 'No username', token } = (await request.json()) as {
    token: string,
    username: string
  }

  session.isLoggedIn = true
  session.username = username
  await session.save()

  // simulate looking up the user in db
  await sleep(250)

  return Response.json(session)
}

// read session
export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  await sleep(250)

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession)
  }

  return Response.json(session)
}

// logout
export async function DELETE() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)

  session.destroy()

  return Response.json(defaultSession)
}
