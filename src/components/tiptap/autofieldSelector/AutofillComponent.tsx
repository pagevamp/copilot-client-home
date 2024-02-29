import { NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

export const AutofillComponent = () => {
  return (
    <NodeViewWrapper className='autofill-pill' as='span'>
      <NodeViewContent as='span' className='content' />
    </NodeViewWrapper>
  )
}
