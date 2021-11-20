import Event from '../components/Event'
import { sanityClient } from '../sanity'

export default function Home({ events }) {
  return (
    <main>
      {events.map((event) => (
        <Event event={event} key={event._id} />
      ))}
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
