import { Photo } from 'payload/generated-types'
import { SanitizedCollectionConfig } from 'payload/types'

export interface Props {
  doc: Photo
  collection: SanitizedCollectionConfig
  size?: 'small' | 'medium' | 'large' | 'expand'
}
