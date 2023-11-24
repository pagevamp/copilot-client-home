import { useAppState } from "@/hooks/useAppState"

const AutofillFields = () => {

  const appState = useAppState()

  const selectedClient = appState?.appState.mockData.filter(el => el.givenName === appState.appState.selectedClient)[0]

  return (
    <div className="p-5">
      <p className="font-medium pb-5">Autofill fields</p>

      <div className="flex flex-col gap-5">
        {
          appState?.appState.readOnly ?
            <>
              <p className="text-new-gray">Given name: {selectedClient?.givenName}</p>
              <p className="text-new-gray">Family name: {selectedClient?.familyName}</p>
              <p className="text-new-gray">Email: {selectedClient?.email}</p>
              <p className="text-new-gray">Company: {selectedClient?.company}</p>
              <p className="text-new-gray">Address: {selectedClient?.address}</p>
            </> :
            <>
              <p className="text-new-gray">	&#123;&#123;client.givenName&#125;&#125;</p>
              <p className="text-new-gray">	&#123;&#123;client.familyName&#125;&#125;</p>
              <p className="text-new-gray">	&#123;&#123;client.email&#125;&#125;</p>
              <p className="text-new-gray">	&#123;&#123;client.company&#125;&#125;</p>
              <p className="text-new-gray">	&#123;&#123;client.address&#125;&#125;</p>
            </>
        }
      </div>
    </div>
  )
}

export default AutofillFields
