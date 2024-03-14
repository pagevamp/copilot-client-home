import { exec } from 'node:child_process'
import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import * as fs from 'fs'
import { unlink } from 'node:fs'
import path from 'node:path'

export function GET() {
  if (!process.env.POSTGRES_URL_NON_POOLING) {
    return NextResponse.json(
      { error: 'No database URL found' },
      {
        status: 500,
      },
    )
  }

  // @todo Authenticate

  const backupFileName = `client_home_${new Date().toISOString()}.sql`
  exec(
    `pg_dump ${process.env.POSTGRES_URL_NON_POOLING}  > ${path.join(
      process.cwd(),
      `/${backupFileName}`,
    )}`,
    async (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
        return
      }

      if (stderr) {
        console.error('pg_dump stderr:', stderr)
        return NextResponse.json(
          { error: 'Failed to perform database backup' },
          {
            status: 500,
          },
        )
      }

      try {
        const blob = await put(
          `backups/client_home_${new Date().toISOString()}`,
          fs.readFileSync(backupFileName),
        )
        console.log(blob)

        unlink(backupFileName, (err) => {
          if (err) {
            console.error('Error deleting backup file', err)
          }
        })

        console.log(`Database backup successful, file: ${backupFileName}`)
        return NextResponse.json({ error: 'Database backup successful' })
      } catch (e) {
        console.error('Error when uploading or deleting backup to storage', e)
        return NextResponse.json(
          { error: 'Failed to upload or delete backup' },
          {
            status: 500,
          },
        )
      }
    },
  )

  return NextResponse.json({ error: 'Database backup successful' })
}
