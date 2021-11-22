import Event from '../components/Event'
import { sanityClient } from '../lib/sanity'

export default function Home({ events }) {
  return (
    <main className="home">
      <section className="event-grid">
        {events.map((event) => (
          <Event event={event} key={event._id} />
        ))}
      </section>
    </main>
  )
}

export const getStaticProps = async () => {
  const query = '*[ _type == "event" && featured]'
  const events = await sanityClient.fetch(query)

  return {
    props: {
      events,
    },
  }
}
