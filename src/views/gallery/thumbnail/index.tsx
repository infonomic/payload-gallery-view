import React from 'react'

import { Props } from './types'
import FileGraphic from '../graphics/file'
import useThumbnail from '../hooks/useThumbnail'

import './index.scss'

const baseClass = 'gallery-thumbnail'

const Thumbnail: React.FC<Props> = (props) => {
  const {
    doc,
    doc: { filename },
    collection
  } = props

  const thumbnailSRC = useThumbnail(collection, doc)

  return (
    <div className={baseClass}>
      {thumbnailSRC != null && <img src={thumbnailSRC as string} alt={filename as string} />}
      {thumbnailSRC == null && <FileGraphic />}
    </div>
  )
}
export default Thumbnail
