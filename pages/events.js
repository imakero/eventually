import Event from '../components/Event'
import { sanityClient } from '../sanity'

export default function Events({ events }) {
  return (
    <main>
      <h1>All Events</h1>
      <section className="event-grid">
        {events.map((event) => (
          <Event event={event} key={event._id} />
        ))}
      </section>
    </main>
  )
}

export const getStaticProps = async () => {
  const query = '*[ _type == "event"]'
  const events = await sanityClient.fetch(query)

  return {
    props: {
      events,
    },
  }
}
