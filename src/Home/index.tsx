import { useEffect, useState } from 'react'
import { homePages } from './pages'

export default function Home() {
  const [activePageId, setActivePageId] = useState(homePages[0]?.id ?? '')

  useEffect(() => {
    const pageElements = homePages
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry) {
          setActivePageId(visibleEntry.target.id)
        }
      },
      {
        threshold: [0.45, 0.65, 0.85],
      },
    )

    pageElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const goToPage = (pageId: string) => {
    document.getElementById(pageId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory bg-[linear-gradient(180deg,#f7f9ff,#eef3ff)]">
      {homePages.map(({ id, Component }) => (
        <Component
          key={id}
          goToPage={goToPage}
          activePageId={activePageId}
        />
      ))}
    </main>
  )
}
