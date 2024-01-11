import { useAppState } from '@/hooks/useAppState'
import { DeleteIcon } from '@/icons'
import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils'
import { InputAdornment, TextField } from '@mui/material'
import { Editor } from '@tiptap/react'
import React, {
  FormEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react'

const BubbleLinkInput = () => {
  const appState = useAppState()

  const [url, setUrl] = useState('')

  const urlInputRef = useRef<HTMLInputElement>(null)

  const tiptapEditorUtils = new TiptapEditorUtils(
    appState?.appState.editor as Editor,
  )

  const handleKeyDown = (event: SyntheticEvent<HTMLDivElement>) => {
    //@ts-expect-error event should contain code
    if (event.code === 'Escape') {
      event.preventDefault()
      appState?.toggleShowLinkInput(false)
    }

    //@ts-expect-error event should contain code
    if (event.code === 'Enter') {
      event.preventDefault()
      const regex = /^https:\/\//
      if (!regex.test(url)) {
        tiptapEditorUtils.insertLink(`https://${url}`)
      } else {
        tiptapEditorUtils.insertLink(url)
      }
      appState?.toggleShowLinkInput(false)
      setUrl('')
    }
  }

  useEffect(() => {
    if (urlInputRef.current) {
      urlInputRef.current.focus()
    }
  }, [urlInputRef.current])

  useEffect(() => {
    setUrl(appState?.appState.editor?.getAttributes('link').href)
  }, [])

  return (
    <TextField
      type='text'
      variant='outlined'
      InputProps={{
        endAdornment: (
          <InputAdornment
            position='end'
            sx={{
              cursor: 'pointer',
            }}
          >
            <DeleteIcon
              onClick={() => {
                tiptapEditorUtils.unlink()
                appState?.toggleShowLinkInput(false)
              }}
            />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiInputBase-input': {
          padding: '8px 12px',
        },
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#DFE1E4',
          },
          '&:hover fieldset': {
            borderColor: '#DFE1E4',
          },
        },
        background: '#fff',
        borderRadius: '8px',
      }}
      onChange={(e) => setUrl(e.target.value)}
      ref={urlInputRef}
      onKeyDown={handleKeyDown}
      value={url}
      autoFocus
    />
  )
}

export default BubbleLinkInput
