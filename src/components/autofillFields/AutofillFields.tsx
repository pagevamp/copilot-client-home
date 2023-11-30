import { useAppState } from '@/hooks/useAppState'
import { staticAutofillValues } from '@/utils/constants'
import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils'
import { Editor } from '@tiptap/react'

const AutofillFields = () => {
  const appState = useAppState()

  const tiptapEditorUtils = new TiptapEditorUtils(
    appState?.appState.editor as Editor,
  )


  return (
    <div className='p-5'>
      <p className='font-medium pb-5'>Autofill fields</p>
      <div className='flex flex-col gap-5'>
        {staticAutofillValues.map((el, key) => {
          return (
            <AutofillText
              key={key}
              label={el}
              handleClick={() => {
                if (appState?.appState.readOnly) return
                tiptapEditorUtils.insertContent(`{{${el}}}`)
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default AutofillFields

const AutofillText = ({
  label,
  handleClick,
}: {
  label: string
  handleClick: () => void
}) => {
  return (
    <p className='text-new-gray hover:text-text' onClick={handleClick}>
      {' '}
      &#123;&#123;{label}&#125;&#125;
    </p>
  )
}

/**
  *
THIS CODE REMAINS COMMENTED BECAUSE IT MIGHT BE A NEED LATER
THIS CODE MOVES THE CURSOR TO THE searchText TEXT
*/
// import { TextSelection } from 'prosemirror-state';
// const moveCursor = (searchText: string) => {
//   if (editor) {
//     const pos = editor.getText().indexOf(searchText);

//     if (!pos) return;

//     if (pos !== -1) {
//       const { state } = editor;
//       const resolvedPos = state.doc.resolve(pos + searchText.length); // Move to the end of the matched text
//       console.log(resolvedPos)
//       const selection = TextSelection.create(state.doc, resolvedPos.pos);
//       editor.chain().focus().setTextSelection({ to: selection.to, from: selection.from }).run()

//     }
//   }
// };
