import { useConfig } from 'payload/components/utilities'
import { Photo } from 'payload/generated-types'
import { SanitizedCollectionConfig } from 'payload/types'

import isImage from './isImage'

const absoluteURLPattern = /^(?:[a-z]+:)?\/\//i
const base64Pattern = /^data:image\/[a-z]+;base64,/

const useThumbnail = (collection: SanitizedCollectionConfig, doc: Photo): string | false | null => {
  const {
    upload: { staticURL, adminThumbnail }
  } = collection

  const { mimeType, sizes, filename, url } = doc

  const genericDoc = doc as unknown as Record<string, unknown>

  const { serverURL } = useConfig()

  if (isImage(mimeType as string)) {
    if (typeof adminThumbnail === 'undefined' && url != null) {
      return url as string
    }

    if (typeof adminThumbnail === 'function') {
      const thumbnailURL = adminThumbnail({ doc: genericDoc })

      if (
        absoluteURLPattern.test(thumbnailURL as string) ||
        base64Pattern.test(thumbnailURL as string)
      ) {
        return thumbnailURL
      }

      return `${serverURL}${thumbnailURL}`
    }

    // @ts-expect-error: TODO
    if (sizes?.[adminThumbnail]?.url != null) {
      // @ts-expect-error: TODO
      return sizes[adminThumbnail].url
    }

    // @ts-expect-error: TODO
    if (sizes?.[adminThumbnail]?.filename != null) {
      // @ts-expect-error: TODO
      return `${serverURL}${staticURL}/${sizes[adminThumbnail].filename}`
    }

    return `${serverURL}${staticURL}/${filename}`
  }

  return false
}

export default useThumbnail
