import { useAppState } from '@/hooks/useAppState'
import { IClient } from '@/types/interfaces'
import { staticAutofillValues } from '@/utils/constants'
import { TiptapEditorUtils } from '@/utils/tiptapEditorUtils'
import { Editor } from '@tiptap/react'
import { When } from '../hoc/When'
import { useEffect } from 'react'

const AutofillFields = () => {
  const appState = useAppState()

  const tiptapEditorUtils = new TiptapEditorUtils(
    appState?.appState.editor as Editor,
  )

  useEffect(() => {
    if (!appState?.appState.selectedClient && !appState?.appState.readOnly)
      return
    appState?.setClientCompanyName('')
    ;(async () => {
      appState?.setLoading(true)
      const res = await fetch(
        `/api/companies?companyId=${appState?.appState.selectedClient?.companyId}`,
      )
      const { data } = await res.json()
      if (data.name) {
        appState?.setClientCompanyName(data.name)
      } else {
        appState?.setClientCompanyName('')
      }
      appState?.setLoading(false)
    })()
  }, [appState?.appState.selectedClient])

  return (
    <div className='p-5'>
      <p className='font-medium pb-5'>Autofill fields</p>
      <div className='flex flex-col gap-5'>
        {/* readonly mode */}
        <When condition={appState?.appState.readOnly as boolean}>
          <AutofillTextReadonlyMode
            label={`Given name: ${
              appState?.appState.selectedClient?.givenName as string
            }`}
          />
          <AutofillTextReadonlyMode
            label={`Family name: ${
              appState?.appState.selectedClient?.familyName as string
            }`}
          />
          <AutofillTextReadonlyMode
            label={`Email: ${
              appState?.appState.selectedClient?.email as string
            }`}
          />
          <AutofillTextReadonlyMode
            label={`Company: ${
              appState?.appState.selectedClientCompanyName
                ? appState?.appState.selectedClientCompanyName
                : ''
            }`}
          />
          {/* <AutofillTextReadonlyMode */}
          {/*   label={`Address: ${ */}
          {/*     (appState?.appState.selectedClient?.address as string) || '' */}
          {/*   }`} */}
          {/* /> */}
          {appState?.appState.selectedClient &&
            Object.keys(
              (appState?.appState.selectedClient as IClient)?.customFields,
            ).length > 0 &&
            Object.entries(
              (appState?.appState.selectedClient as IClient)?.customFields,
            ).map((value, key) => {
              return (
                <AutofillTextReadonlyMode
                  key={key}
                  label={`${value[0]}: ${value[1]}`}
                />
              )
            })}
        </When>

        {/* edit mode */}
        <When condition={!appState?.appState.readOnly}>
          {staticAutofillValues.map((el, key) => {
            return (
              <AutofillText
                key={key}
                label={el.replaceAll('{{', '').replaceAll('}}', '')}
                handleClick={() => {
                  if (appState?.appState.readOnly) return
                  tiptapEditorUtils.insertContent(`${el}`)
                }}
              />
            )
          })}
          {appState?.appState.customFields &&
            appState?.appState.customFields.map((el, key) => {
              return (
                <AutofillText
                  key={key}
                  label={`client.customFields.${el.key}`}
                  handleClick={() => {
                    if (appState?.appState.readOnly) return
                    tiptapEditorUtils.insertContent(
                      `{{client.customFields.${el.key}}}`,
                    )
                  }}
                />
              )
            })}
        </When>
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
  handleClick?: () => void
}) => {
  return (
    <p
      className='text-new-gray hover:text-text cursor-pointer'
      onClick={handleClick}
    >
      &#123;&#123;{label}&#125;&#125;
    </p>
  )
}

const AutofillTextReadonlyMode = ({ label }: { label: string }) => {
  return <p className='text-new-gray hover:text-text cursor-pointer'>{label}</p>
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
