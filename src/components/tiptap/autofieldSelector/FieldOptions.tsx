import React from 'react'

const FieldOptions = () => {
  return (
    <div className='flex flex-col gap-0.5 bg-white py-2 border border-new-card-border rounded shadow-vairant-1 absolute top-3 w-52'>
      <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
        {' '}
        &#123;&#123;client.givenName&#125;&#125;
      </button>
      <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
        {' '}
        &#123;&#123;client.familyName&#125;&#125;
      </button>
      <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
        {' '}
        &#123;&#123;client.email&#125;&#125;
      </button>
      <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
        {' '}
        &#123;&#123;client.company&#125;&#125;
      </button>
      <button className='flex flex-row gap-x-2.5 items-center py-1.5 px-3 focus:bg-new-white-2 cursor-pointer outline-none'>
        {' '}
        &#123;&#123;client.address&#125;&#125;
      </button>
    </div>
  )
}

export default FieldOptions
