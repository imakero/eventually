import { sanityClient, urlFor } from '../../lib/sanity'
import BlockContent from '@sanity/block-content-to-react'
import Image from 'next/image'
import { EVENT_IMAGE_DIMENSIONS } from '../../constants'

export default function Event({ event }) {
  const { width, height } = EVENT_IMAGE_DIMENSIONS

  return (
    <main>
      <h1>{event.title}</h1>
      <div>{event.category}</div>
      <div>{event.date}</div>
      <p>{event.description}</p>
      <BlockContent blocks={event.agenda} />
      <div>
        {event.images.map((image) => (
          <div key={image._key}>
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
