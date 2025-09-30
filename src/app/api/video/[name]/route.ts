import { NextRequest, NextResponse } from 'next/server'
import kv from '@vercel/kv'

export async function GET(
  req: NextRequest,
  { params }: { params: { name: string } }
) {
  const { name } = params
  if (!name)
    return NextResponse.json(
      { error: 'No video name provided' },
      { status: 400 }
    )

  const data = await kv.getBuffer(`video:${name}`)
  if (!data)
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })

  return new Response(data, {
    headers: {
      'Content-Type': 'video/mp4',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
