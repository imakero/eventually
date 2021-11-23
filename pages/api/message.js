import { sanityClient, slugify } from '../../lib/sanity'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body

    const result = await sanityClient.create({
      _type: 'message',
      name,
      email,
      message,
    })

    return res.json(result)
  }

  return res.send(405)
}
