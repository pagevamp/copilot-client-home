import { Editor, NodeViewContent, NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef } from 'react'

export const Callout = (props: any) => {
  // const ref = useRef(null)
  // const handleKeyDown = (event: any) => {
  //   console.log(props.editor.view.dom)
  //   props.editor.chain().focus().splitBlock().run()
  //   // if (event.code === 'Enter' && event.metaKey) {
  //   //   // Prevent the default behavior of Enter key within the Callout
  //   //   event.preventDefault()

  //   //   // Perform the action you want when 'Mod-Enter' is pressed
  //   //   // For example, move the cursor to the next line inside the Callout
  //   //   props.editor.chain().focus().splitBlock().run()
  //   // }
  // }
  // useEffect(() => {
  //   if (!ref) return

  //   //@ts-ignore
  //   ref.addEventListener('keydown', handleKeyDown)

  //   return () => {
  //     //@ts-ignore
  //     ref.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [ref])
  return (
    <NodeViewWrapper className='callout-container'>
      <div className='callout-icon'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
        >
          <path
            d='M7.9987 15.1654C4.0467 15.1654 0.832031 11.9507 0.832031 7.9987C0.832031 4.0467 4.0467 0.832031 7.9987 0.832031C11.9507 0.832031 15.1654 4.0467 15.1654 7.9987C15.1654 11.9507 11.9507 15.1654 7.9987 15.1654ZM7.9987 1.83203C4.59803 1.83203 1.83203 4.59803 1.83203 7.9987C1.83203 11.3994 4.59803 14.1654 7.9987 14.1654C11.3994 14.1654 14.1654 11.3994 14.1654 7.9987C14.1654 4.59803 11.3994 1.83203 7.9987 1.83203ZM8.4987 10.9987V7.95133C8.4987 7.67533 8.2747 7.45133 7.9987 7.45133C7.7227 7.45133 7.4987 7.67533 7.4987 7.95133V10.9987C7.4987 11.2747 7.7227 11.4987 7.9987 11.4987C8.2747 11.4987 8.4987 11.2747 8.4987 10.9987ZM8.67871 5.66536C8.67871 5.29736 8.38071 4.9987 8.01204 4.9987H8.00537C7.63737 4.9987 7.34196 5.29736 7.34196 5.66536C7.34196 6.03336 7.64404 6.33203 8.01204 6.33203C8.38004 6.33203 8.67871 6.03336 8.67871 5.66536Z'
            fill='#60606A'
          />
        </svg>
      </div>

      <NodeViewContent as='div' className='content' />
    </NodeViewWrapper>
  )
}
