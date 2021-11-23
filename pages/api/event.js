import { nanoid } from 'nanoid'
import { sanityClient, slugify } from '../../lib/sanity'

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      const result = await sanityClient.create(prepareEvent(req.body))
      break
  }

  res.end()
}

const prepareEvent = (body) => {
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
  }
  return event
}
