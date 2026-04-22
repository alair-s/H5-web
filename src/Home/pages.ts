import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import Page4 from './Page4'
import Page5 from './Page5'
import Page6 from './Page6'
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
  {
    id: 'home-page-3',
    Component: Page3,
  },
  {
    id: 'home-page-4',
    Component: Page4,
  },
  {
    id: 'home-page-5',
    Component: Page5,
  },
  {
    id: 'home-page-6',
    Component: Page6,
  },
]
