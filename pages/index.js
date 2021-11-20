import Event from '../components/Event'
import { sanityClient } from '../sanity'

export default function Home({ events }) {
  return (
    <main className="home">
      {events.map((event) => (
        <Event event={event} key={event._id} />
      ))}
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
