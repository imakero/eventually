import SanityBlockContent from '@sanity/block-content-to-react'

export default function Section({ section, children }) {
  return (
    <section className="text-section">
      <h2>{section.heading}</h2>
      <SanityBlockContent blocks={section.content} />
      {children}
    </section>
  )
}
