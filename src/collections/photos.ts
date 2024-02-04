import path from 'path'

import type { CollectionConfig } from 'payload/types'

import { UploadGallery } from '../views/gallery'
import { PhotoCollectionDescription } from './components/photo-collection-description'


const getAdminThumbnail = ({ doc }: any): string | null => {
  const mimeType = doc.mimeType as string
  if (mimeType === 'image/svg+xml') {
    return doc.url
  } else if (doc?.sizes?.thumbnail != null) {
    return doc.sizes.thumbnail.url
  } else {
    return null
  }
}

export const Photos: CollectionConfig = {
  slug: 'photos',
  admin: {
    defaultColumns: ['filename', 'id', 'alt'],
    enableRichTextLink: false,
    enableRichTextRelationship: false,
    group: 'Uploads',
    description: PhotoCollectionDescription,
    components: {
      views: {
        List: UploadGallery
      }
    },
    pagination: {
      defaultLimit: 50,
      limits: [10, 20, 30, 40, 50]
    }
  },
  defaultSort: 'createdAt',
  upload: {
    adminThumbnail: getAdminThumbnail,
    staticDir: path.resolve(__dirname, '../../uploads/photos'),
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        height: 400,
        width: 400,
        position: 'center'
      },
      {
        name: 'thumbnail_webp',
        height: 400,
        width: 400,
        position: 'center',
        formatOptions: {
          format: 'webp'
        }
      },
      {
        name: 'square',
        width: 1200,
        height: 1200,
        position: 'center'
      },
      {
        name: 'square_webp',
        width: 1200,
        height: 1200,
        position: 'center',
        formatOptions: {
          format: 'webp'
        }
      },
      {
        name: 'small',
        width: 900,
        // height: 600,
        position: 'center'
      },
      {
        name: 'small_webp',
        width: 900,
        // height: 600,
        position: 'center',
        formatOptions: {
          format: 'webp'
        }
      },
      {
        name: 'medium',
        width: 1200,
        // height: 800,
        position: 'center'
      },
      {
        name: 'medium_webp',
        width: 1200,
        // height: 800,
        position: 'center',
        formatOptions: {
          format: 'webp'
        }
      },
      {
        name: 'large',
        width: 2100,
        // height: 1400,
        position: 'center'
      },
      {
        name: 'large_webp',
        width: 2100,
        // height: 1400,
        position: 'center',
        formatOptions: {
          format: 'webp'
        }
      }
    ]
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      localized: true,
      admin: {
        description: 'Enter an optional title for this image.'
      }
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description:
          'Enter alternative text for this image. Alt text is important for individuals using assistive technology such as screen readers.'
      }
    },
    {
      name: 'caption',
      type: "textarea",
      required: true,
      localized: true,
      admin: {
        description:
          'Enter a descriptive caption for this image.'
      }
    },
  ]
}
