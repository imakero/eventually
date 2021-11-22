import Event from '../components/Event'
import { sanityClient, urlFor } from '../lib/sanity'
import Image from 'next/image'

export default function Home({ events, backgroundImage }) {
  return (
    <main className="page-home">
      <section className="home-image">
        <Image
          src={urlFor(backgroundImage).width(2000).height(1500).url()}
          alt={backgroundImage.altText}
          width={2000}
          height={1500}
        />
      </section>
      <section className="event-section">
        <h2>Featured Events</h2>
        <div className="event-grid">
          {events.map((event) => (
            <Event event={event} key={event._id} />
          ))}
        </div>
      </section>
    </main>
  )
}

export const getStaticProps = async () => {
  const eventsQuery = '*[ _type == "event" && featured]'
  const events = await sanityClient.fetch(eventsQuery)
  const backgroundImageQuery =
    '*[_type == "websiteImage" && name == "home-bg"]{image}'
  const [{ image }] = await sanityClient.fetch(backgroundImageQuery)

  console.log('image', image)
  return {
    props: {
      events,
      backgroundImage: image,
    },
  }
}
