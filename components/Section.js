import SanityBlockContent from '@sanity/block-content-to-react'

export default function Section({ section }) {
  return (
    <section>
      <h2>{section.heading}</h2>
      <SanityBlockContent blocks={section.content} />
    </section>
  )
}
