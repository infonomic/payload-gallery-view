import type { Photo } from 'payload/generated-types'
import { SanitizedCollectionConfig } from 'payload/types'

export interface Props {
  collection: SanitizedCollectionConfig
  doc: Photo
  className?: string
}
