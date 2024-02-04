import { PaginatedDocs } from 'payload/database'
import { Photo } from 'payload/generated-types'
import { SanitizedCollectionConfig, Where, FieldAffectingData } from 'payload/types'
export type { Props } from 'payload/dist/admin/components/views/collections/List/types'

// export interface Props {
//   collection: SanitizedCollectionConfig
//   data?: PaginatedDocs<Photo>
//   hasCreatePermission: boolean
//   limit: number
//   newDocumentURL: string
//   resetParams: (overrides?: {
//     page?: number
//     search?: string
//     sort?: string
//     where?: Where
//   }) => void
//   titleField?: FieldAffectingData
// }
