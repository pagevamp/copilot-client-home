'use client' // Error components must be Client Components

import { Stack, Typography } from '@mui/material'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Stack
      direction='column'
      justifyContent='center'
      textAlign='center'
      sx={{
        width: { xs: '90%', md: '30%' },
        margin: '0  auto',
        rowGap: '2em',
        mt: '10em',
      }}
    >
      <Typography
        variant='h4'
        sx={{
          fontSize: { xs: '16px', md: '32px' },
        }}
      >
        No client found with the supplied token!
      </Typography>
    </Stack>
  )
}
