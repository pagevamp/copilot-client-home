import React from 'react'

const FieldOptions = () => {
  return (
    <div className='flex flex-col gap-5'>
      <p className='text-new-gray'> &#123;&#123;client.givenName&#125;&#125;</p>
      <p className='text-new-gray'>
        {' '}
        &#123;&#123;client.familyName&#125;&#125;
      </p>
      <p className='text-new-gray'> &#123;&#123;client.email&#125;&#125;</p>
      <p className='text-new-gray'> &#123;&#123;client.company&#125;&#125;</p>
      <p className='text-new-gray'> &#123;&#123;client.address&#125;&#125;</p>
    </div>
  )
}

export default FieldOptions
