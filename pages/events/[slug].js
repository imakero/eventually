import { sanityClient, urlFor } from '../../lib/sanity'
import BlockContent from '@sanity/block-content-to-react'
import Image from 'next/image'
import { EVENT_IMAGE_DIMENSIONS } from '../../constants'
import Date from '../../components/Date'

export default function Event({ event }) {
  const { width, height } = EVENT_IMAGE_DIMENSIONS

  return (
    <main className="page-details">
      <h2>{event.title}</h2>
      <Date date={event.date} />
      <span className="badge">{event.category}</span>
      <p>{event.description}</p>
      <BlockContent blocks={event.agenda} />
      <div className="event-images">
        {event.images.map((image) => (
          <div key={image._key} className="event-image-container">
            <Image
              src={urlFor(image).width(width).height(height).url()}
              alt={image.altText}
              width={width}
              height={height}
            />
          </div>
        ))}
      </div>
    </main>
  )
}

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[ _type == "event" && slug.current == "${slug}"]`
  const events = await sanityClient.fetch(query)
  const event = events[0]

  return {
    props: {
      event,
    },
  }
}

export const getStaticPaths = async () => {
  const query = '*[ _type == "event"]'
  const events = await sanityClient.fetch(query)

  return {
    paths: events.map((event) => ({
      params: {
        slug: event.slug.current,
      },
    })),
    fallback: false,
  }
}
