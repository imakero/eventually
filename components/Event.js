import { useState } from 'react'
import { urlFor } from '../lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import { EVENT_MAIN_IMAGE_DIMENSIONS } from '../constants'

export default function Event({ event }) {
  const [showInfo, setShowInfo] = useState(false)
  const { width, height } = EVENT_MAIN_IMAGE_DIMENSIONS

  return (
    <article>
      <Image
        src={urlFor(event.mainImage).width(width).height(height).url()}
        alt={event.mainImage.altText}
        width={width}
        height={height}
      />
      <h2>{event.title}</h2>
      <div>{event.category}</div>
      <div>{event.date}</div>
      {showInfo ? <p>{event.description}</p> : null}
      <button onClick={() => setShowInfo((previous) => !previous)}>
        More info
      </button>
      <Link href={`/events/${event.slug.current}`}>
        <a>Go to details</a>
      </Link>
    </article>
  )
}
