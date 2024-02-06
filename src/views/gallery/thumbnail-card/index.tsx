import React from 'react'

import { useConfig } from 'payload/components/utilities'
import { useSelection } from 'payload/dist/admin/components/views/collections/List/SelectionProvider'

import { Props } from './types'
// import { formatUseAsTitle } from '../../../hooks/useTitle'
import Thumbnail from '../thumbnail'

import './index.scss'

const baseClass = 'gallery-thumbnail-card'

export const ThumbnailCard: React.FC<Props> = (props) => {
  const { selected, setSelection } = useSelection()
  const {
    routes: { admin }
  } = useConfig()

  const { className, doc, collection } = props
  const classes = [baseClass, className].filter(Boolean).join(' ')

  const selectedColor = selected[doc.id] ? '#4952bf' : 'transparent'

  // TODO - add locale to collection item link
  return (
    <div
      title={doc?.title ?? (doc?.filename as string)}
      className={classes}
      style={{ border: `${selectedColor} solid 2px` }}
    >
      <div
        className={`${baseClass}__thumbnail`}
        onClick={() => {
          setSelection(doc.id)
        }}
      >
        {collection != null && doc != null && <Thumbnail doc={doc} collection={collection} />}
      </div>
      {doc?.title != null && <div className={`${baseClass}__title`}>{doc?.title}</div>}
      {/* TODO: If this component could receive an 'onSelect' handler from the main
        UploadGallery component props, then we could swap the <a> element with a 
        button that calls the onSelect handler for the ListDrawer, solving this issue...  
        See: https://github.com/payloadcms/payload/issues/4990 
      */}
      <a
        href={`${admin}/collections/${collection.slug}/${doc.id}`}
        className={`${baseClass}__filename`}
      >
        {doc?.filename}
      </a>
    </div>
  )
}
