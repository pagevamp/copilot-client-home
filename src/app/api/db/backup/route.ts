import { exec } from 'node:child_process'
import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import * as fs from 'fs'
import { unlink } from 'node:fs'
import path from 'node:path'

export function GET(request: NextRequest) {
  if (!process.env.POSTGRES_URL_NON_POOLING) {
    return NextResponse.json(
      { error: 'No database URL found' },
      {
        status: 500,
      },
    )
  }

  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json('Unauthorized', {
      status: 401,
    })
  }

  const currentDateTime = new Date().toISOString()
  const dateTime = currentDateTime.split('T')
  const backupFileName = `client_home_${dateTime[0]}_${dateTime[1]}_backup.sql`
  const localFilePath = path.join(process.cwd(), `/${backupFileName}`)

  console.log(`Performing database backup with filename ${backupFileName}`)
  exec(
    `pg_dump ${process.env.POSTGRES_URL_NON_POOLING}  > ${localFilePath}`,
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
        await put(
          `backups/${backupFileName}`,
          fs.readFileSync(backupFileName),
          {
            access: 'public',
          },
        )

        console.log(`Database backup successful for filename ${backupFileName}`)

        unlink(localFilePath, (err) => {
          if (err) {
            console.error('Error deleting backup file', err)
          }
          console.log(
            `File cleanup was successful for filename ${backupFileName}`,
          )
        })
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

  return NextResponse.json({
    message: 'Backing up the database, please check log for more detail',
  })
}
