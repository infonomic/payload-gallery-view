export const formatPagePath = (
  collection: string,
  doc: any // eslint-disable-line @typescript-eslint/no-explicit-any
): string => {
  const { slug } = doc

  let prefix = ''

  if (collection.length > 0) {
    switch (collection) {
      case 'pages':
        prefix = ''
        break
      // case 'post':
      //   prefix = '/blog'
      //   break
      default:
        prefix = `/${collection}`
    }
  }

  return `${prefix}/${slug as string}`
}
