import { nanoid } from 'nanoid'
import { sanityClient, slugify } from '../../lib/sanity'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const result = await sanityClient.create(prepareEvent(req.body))
    return res.json(result)
  }

  return res.send(405)
}

const prepareEvent = (body) => {
  const mainImage = {
    _type: 'image',
    altText: body.images[0].altText,
    asset: {
      _ref: body.images[0].imageData._id,
      _type: 'reference',
    },
  }

  const images = body.images.slice(1).map((image) => ({
    _key: nanoid(),
    _type: 'eventImage',
    altText: image.altText,
    asset: {
      _ref: image.imageData._id,
      _type: 'reference',
    },
  }))

  const event = {
    _type: 'event',
    slug: { _type: 'slug', current: slugify(body.title) },
    featured: false,
    ...body,
    agenda: [
      {
        _type: 'block',
        _key: nanoid(),
        style: 'normal',
        markDefs: [],
        children: [
          {
            _type: 'span',
            _key: nanoid(),
            text: body.agenda,
            marks: [],
          },
        ],
      },
    ],
    mainImage,
    images,
  }
  return event
}
