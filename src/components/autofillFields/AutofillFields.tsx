const AutofillFields = () => {
  return (
    <div className='p-5'>
      <p className='font-medium pb-5'>Autofill fields</p>

      <div className='flex flex-col gap-5'>
        <p className='text-new-gray'>
          {' '}
          &#123;&#123;client.givenName&#125;&#125;
        </p>
        <p className='text-new-gray'>
          {' '}
          &#123;&#123;client.familyName&#125;&#125;
        </p>
        <p className='text-new-gray'> &#123;&#123;client.email&#125;&#125;</p>
        <p className='text-new-gray'> &#123;&#123;client.company&#125;&#125;</p>
        <p className='text-new-gray'> &#123;&#123;client.address&#125;&#125;</p>
      </div>
    </div>
  )
}

export default AutofillFields
