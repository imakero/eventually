import Event from '../components/Event'
import { sanityClient } from '../lib/sanity'

export default function Events({ events }) {
  return (
    <main className="page-events">
      <h2>All Events</h2>
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
