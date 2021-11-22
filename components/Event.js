import { useState } from 'react'
import { urlFor } from '../lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { EVENT_MAIN_IMAGE_DIMENSIONS } from '../constants'
import { FaRegCalendarAlt } from 'react-icons/fa'

export default function Event({ event }) {
  const [showInfo, setShowInfo] = useState(false)
  const { width, height } = EVENT_MAIN_IMAGE_DIMENSIONS

  return (
    <article className="event-card">
      <div className="image-container">
        <Link href={`/events/${event.slug.current}`}>
          <a>
            <Image
              src={urlFor(event.mainImage).width(width).height(height).url()}
              alt={event.mainImage.altText}
              width={width}
              height={height}
            />
            <h2>{event.title}</h2>
          </a>
        </Link>
      </div>
      <div className="event-info">
        <span className="date">
          <FaRegCalendarAlt /> {event.date}
        </span>
        <span className="badge">{event.category}</span>
      </div>
      {showInfo ? <p>{event.description}</p> : null}
      <div className="more-info-container">
        <button onClick={() => setShowInfo((previous) => !previous)}>
          {showInfo ? 'Hide info' : 'More info'}
        </button>
        <div className="details-link">
          <Link href={`/events/${event.slug.current}`}>
            <a className="details-link">Go to details</a>
          </Link>
        </div>
      </div>
    </article>
  )
}
