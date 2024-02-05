'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { Pill } from 'payload/components'
import { Gutter, Button } from 'payload/components/elements'
import { Meta } from 'payload/components/utilities'
import { ListControls } from 'payload/dist/admin/components/elements/ListControls'
import DefaultList from 'payload/dist/admin/components/views/collections/List/Default'
import ListSelection from 'payload/dist/admin/components/elements/ListSelection'
import Paginator from 'payload/dist/admin/components/elements/Paginator'
import PerPage from 'payload/dist/admin/components/elements/PerPage'
import { StaggeredShimmers } from 'payload/dist/admin/components/elements/ShimmerEffect'
import ViewDescription from 'payload/dist/admin/components/elements/ViewDescription'
import { RelationshipProvider } from 'payload/dist/admin/components/views/collections/List/RelationshipProvider'
import { SelectionProvider } from 'payload/dist/admin/components/views/collections/List/SelectionProvider'
import { getTranslation } from 'payload/utilities'

import { useWindowInfo } from '@faceless-ui/window-info'

import { ThumbnailCard } from './thumbnail-card'
import { Props } from './types'
import { formatBytes } from './utils/format-file-size'

import './index.scss'

const baseClass = 'collection-list'
const galleryClass = 'upload-gallery'

export function UploadGallery(props: Props): JSX.Element {
  const {
    breakpoints: { s: smallBreak }
  } = useWindowInfo()
  const { i18n, t } = useTranslation('general')
  const {
    collection: {
      admin: { description } = {},
      labels: { plural: pluralLabel, singular: singularLabel }
    },
    collection,
    customHeader,
    data,
    handlePageChange,
    handlePerPageChange,
    handleSearchChange,
    handleSortChange,
    handleWhereChange,
    hasCreatePermission,
    limit,
    modifySearchParams,
    newDocumentURL,
    resetParams,
    titleField
  } = props

  // See: https://github.com/payloadcms/payload/issues/4990 
  // if (customHeader != null) {
  //   return <DefaultList {...props} />
  // }
  
  let formattedDocs = data?.docs

  if (collection.upload != null && formattedDocs != null && formattedDocs.length > 0) {
    formattedDocs = formattedDocs?.map((doc) => {
      return {
        ...doc,
        filesize: formatBytes(doc.filesize)
      }
    })
  }

  // TODO: paddingRight for mobile should be taken care of in the main layout?
  return (
    <div className={baseClass} style={{ paddingRight: '16px' }}>
      <Meta title={getTranslation(collection.labels.plural, i18n)} />
      <SelectionProvider docs={data.docs} totalDocs={data.totalDocs}>
        <Gutter className={`${baseClass}__wrap`}>
        <header className={`${baseClass}__header`} style={{ marginBottom: '1rem' }}>
            {customHeader != null && customHeader}
            {customHeader == null && (
              <>
                <h1>{getTranslation(pluralLabel, i18n)}</h1>
                {hasCreatePermission && (
                  <Pill
                    aria-label={t('createNewLabel', { label: getTranslation(singularLabel, i18n) })}
                    to={newDocumentURL}
                  >
                    {t('createNew')}
                  </Pill>
                )}
                {!smallBreak && (
                  <ListSelection label={getTranslation(collection.labels.plural, i18n)} />
                )}
                {description != null && (
                  <div className={`${baseClass}__sub-header`}>
                    <ViewDescription description={description} />
                  </div>
                )}
              </>
            )}
          </header>
          <ListControls
            enableColumns={false}
            collection={collection}
            handleSearchChange={handleSearchChange}
            handleSortChange={handleSortChange}
            handleWhereChange={handleWhereChange}
            modifySearchQuery={modifySearchParams}
            resetParams={resetParams}
            titleField={titleField}
          />
          {formattedDocs == null && (
            <StaggeredShimmers
              className={[`${baseClass}__shimmer`, `${baseClass}__shimmer--rows`].join(' ')}
              count={6}
            />
          )}
          {formattedDocs != null && formattedDocs.length > 0 && (
            <RelationshipProvider>
              <div className={galleryClass}>
                {formattedDocs.map((doc) => (
                  <div key={String(doc.id)} className={`${galleryClass}__thumbnail-container`}>
                    <ThumbnailCard doc={doc} collection={collection} />
                  </div>
                ))}
              </div>
            </RelationshipProvider>
          )}
          {formattedDocs != null && formattedDocs.length === 0 && (
            <div className={`${baseClass}__no-results`}>
              <p>{t('noResults', { label: getTranslation(pluralLabel, i18n) })}</p>
              {hasCreatePermission && newDocumentURL != null && (
                <Button el="link" to={newDocumentURL}>
                  {t('createNewLabel', { label: getTranslation(singularLabel, i18n) })}
                </Button>
              )}
            </div>
          )}
          {formattedDocs != null && formattedDocs?.length > 0 && (
            <div className={`${baseClass}__page-controls`}>
              <Paginator
                disableHistoryChange={modifySearchParams === false}
                hasNextPage={data.hasNextPage}
                hasPrevPage={data.hasPrevPage}
                limit={data.limit}
                nextPage={data.nextPage ?? undefined}
                numberOfNeighbors={1}
                onChange={handlePageChange}
                page={data.page}
                prevPage={data.prevPage ?? undefined}
                totalPages={data.totalPages}
              />
              {data?.totalDocs > 0 && (
                <>
                  <div className={`${baseClass}__page-info`}>
                    {(data.page as number) * data.limit - (data.limit - 1)}-
                    {data.totalPages > 1 && data.totalPages !== data.page
                      ? data.limit * (data.page as number)
                      : data.totalDocs}{' '}
                    {t('of')} {data.totalDocs}
                  </div>
                  <PerPage
                    handleChange={handlePerPageChange}
                    limit={limit}
                    limits={collection?.admin?.pagination?.limits}
                    modifySearchParams={modifySearchParams}
                    resetPage={data.totalDocs <= data.pagingCounter}
                  />
                  {smallBreak && (
                    <div className={`${baseClass}__list-selection`}>
                      <>
                        <ListSelection label={getTranslation(collection.labels.plural, i18n)} />
                        {/* <div className={`${baseClass}__list-selection-actions`}>
                          <EditMany collection={collection} resetParams={resetParams} />
                          <PublishMany collection={collection} resetParams={resetParams} />
                          <UnpublishMany collection={collection} resetParams={resetParams} />
                          <DeleteMany collection={collection} resetParams={resetParams} />
                        </div> */}
                      </>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </Gutter>
      </SelectionProvider>
    </div>
  )
}
