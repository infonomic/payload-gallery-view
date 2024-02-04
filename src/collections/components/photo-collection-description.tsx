import React from 'react'

export function PhotoCollectionDescription(): JSX.Element {
  return (
    <div style={{ paddingRight: '12px' }}>
      <div style={{ lineHeight: '1.5rem', fontSize: '1.2rem' }}>
        Upload photos for use in galleries and other content.{' '}
      </div>
      <div style={{ color: '#c72051' }}>
        Note that uploaded photos should be at least 2100px wide.
      </div>
    </div>
  )
}
