import ClientHomeInterface from "./components/ClientHomeInterface";


// type SearchParams = { [key: string]: string | string[] | undefined }

// async function getContent(searchParams: SearchParams) {
// if (!process.env.COPILOT_API_KEY) {
// throw new Error('Missing COPILOT_API_KEY')
// }

// const copilotAPI = new CopilotAPI(process.env.COPILOT_API_KEY)
// const result: { client?: Client; company?: Company } = {}

// if (searchParams.clientId && typeof searchParams.clientId === 'string') {
// result.client = await copilotAPI.getClient(searchParams.clientId)
// }

// if (searchParams.companyId && typeof searchParams.companyId === 'string') {
// result.company = await copilotAPI.getCompany(searchParams.companyId)
// }

// return result
// }

export default async function Page() {
  return (
    <div>
      <p>Home</p>
      <div className="flex flex-row">
        <div className="basis-3/4">
          EDITOR
        </div>
        <div className="basis-1/4 border-t-2 border-l-2 border-slate-300">
          <ClientHomeInterface />
        </div>
      </div>
    </div>
  )
}

