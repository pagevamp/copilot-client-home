import { PictureAsPdf } from '@mui/icons-material'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

export const Linkpdf = (props: any) => {
  console.log(props)
  return (
    <NodeViewWrapper className='flex flex-row'>
      <div className=''>
        <PictureAsPdf />
      </div>

      <NodeViewContent as='div' className='content' />
    </NodeViewWrapper>
  )
}
