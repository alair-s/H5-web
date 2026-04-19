import Page1 from './Page1'
import Page2 from './Page2'
import type { HomePageDefinition } from './types'

export const homePages: HomePageDefinition[] = [
  {
    id: 'home-page-1',
    Component: Page1,
  },
  {
    id: 'home-page-2',
    Component: Page2,
  },
]
