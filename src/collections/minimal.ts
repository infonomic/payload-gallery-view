import { type CollectionConfig } from 'payload/types'

import { slugField } from '../fields/slug'

export const Minimal: CollectionConfig = {
  slug: 'minimal',
  admin: {
    defaultColumns: ['title', 'publishedOn', '_status'],
    useAsTitle: 'title',
    group: 'Content'
  },
  versions: {
    drafts: true,
    maxPerDoc: 15
  },
  labels: {
    singular: 'Minimal',
    plural: 'Minimal'
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true
    },
    {
      type: 'upload',
      name: 'image',
      relationTo: 'photos',
    },
    slugField(),
    {
      name: 'publishedOn',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      admin: {
        date: {
          pickerAppearance: 'dayAndTime'
        },
        position: 'sidebar'
      }
    }
  ]
}
