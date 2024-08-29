import type { Page } from '@backend/types'

export type ArchiveBlockProps = Extract<Page['layout'][0], { blockType: 'archive' }>
