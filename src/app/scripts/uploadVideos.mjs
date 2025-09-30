import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

if (!process.env.VERCEL_BLOB_REST_API_URL || !process.env.VERCEL_BLOB_TOKEN) {
  console.error(
    'Set VERCEL_BLOB_REST_API_URL and VERCEL_BLOB_TOKEN in your .env'
  )
  process.exit(1)
}

const videoDir = path.join(process.cwd(), 'public', 'videos')

if (!fs.existsSync(videoDir)) {
  console.error('Videos folder not found at', videoDir)
  process.exit(1)
}

const files = fs.readdirSync(videoDir).filter((f) => f.endsWith('.mp4'))

async function uploadFile(fileName) {
  const filePath = path.join(videoDir, fileName)
  const data = fs.readFileSync(filePath)

  const res = await fetch(
    `${process.env.VERCEL_BLOB_REST_API_URL}/${fileName}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.VERCEL_BLOB_TOKEN}`,
        'Content-Type': 'application/octet-stream',
      },
      body: data,
    }
  )

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to upload ${fileName}: ${res.status} ${text}`)
  }

  const json = await res.json()
  return json.url // Blob URL
}

async function main() {
  const results = {}
  for (const file of files) {
    try {
      const url = await uploadFile(file)
      console.log(`${file} → ${url}`)
      results[file] = url
    } catch (e) {
      console.error(e)
    }
  }

  console.log('\nUse these URLs in your verticalSections array:')
  console.log(JSON.stringify(results, null, 2))
}

main()
