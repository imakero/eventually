import { sanityClient } from '../../lib/sanity'
import formidable from 'formidable'
import { createReadStream } from 'fs'
import { resolve } from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = formidable()
    const { err, fields, files } = await new Promise((resolve, reject) =>
      form.parse(req, (err, fields, files) => {
        resolve({ err, fields, files })
      })
    )
    const uploadedImage = await sanityClient.assets.upload(
      'image',
      createReadStream(files['image'].filepath),
      {
        filename: files['image'].originalFilename,
      }
    )
    return res.json(uploadedImage)
  }

  return res.send(405)
}
