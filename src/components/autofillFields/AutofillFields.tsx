const AutofillFields = () => {
  return (
    <div className='p-5'>
      <p className='font-medium pb-5'>Autofill fields</p>
      <div className='flex flex-col gap-5'>
        <AutofillText label={'client.givenName'} />
        <AutofillText label={'client.familyName'} />
        <AutofillText label={'client.email'} />
        <AutofillText label={'client.company'} />
        <AutofillText label={'client.address'} />
      </div>
    </div>
  )
}

export default AutofillFields

const AutofillText = ({ label }: { label: string }) => {
  return <p className='text-new-gray'> &#123;&#123;{label}&#125;&#125;</p>
}
