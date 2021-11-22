import { urlFor } from '../lib/sanity'
import Image from 'next/image'
import { CONTACTS_IMAGE_DIMENSIONS } from '../constants'

export default function Contacts({ person }) {
  const { width, height } = CONTACTS_IMAGE_DIMENSIONS

  return (
    <section>
      <Image
        src={urlFor(person.image).width(width).height(height).url()}
        alt={person.image.altText}
        width={width}
        height={height}
      />
      <div>
        Email: <a href={`mailto:${person.email}`}>{person.email}</a>
      </div>
      <div>
        Phone number: <a href={`tel:${person.tel}`}>{person.tel}</a>
      </div>
    </section>
  )
}
