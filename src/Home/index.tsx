import { homePages } from './pages'

export default function Home() {
  const goToPage = (pageId: string) => {
    document.getElementById(pageId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main className="h-screen overflow-y-auto snap-y snap-mandatory bg-[linear-gradient(180deg,#f7f9ff,#eef3ff)]">
      {homePages.map(({ id, Component }) => (
        <Component key={id} goToPage={goToPage} />
      ))}
    </main>
  )
}
