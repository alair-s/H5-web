import type { ReactElement } from 'react'

export type HomePageProps = {
  goToPage?: (pageId: string) => void
}

export type HomePageDefinition = {
  id: string
  Component: (props: HomePageProps) => ReactElement
}
