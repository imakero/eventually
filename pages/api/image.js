import { sanityClient } from '../../lib/sanity'
import formidable from 'formidable'
import { createReadStream } from 'fs'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      // const {files} = await new Promise((resolve, reject) => {
      //   const form = formidable()

      //   form.parse(req, (err, fields, files) => {
      //     if (err) reject({ err })
      //     resolve({ err, fields, files })
      //   })
      // })
      const form = formidable()
      const { err, fields, files } = await form.parse(
        req,
        (err, fields, files) => {
          sanityClient.assets
            .upload('image', createReadStream(files['cover-image'].filepath), {
              filename: files['cover-image'].originalFilename,
            })
            .then((result) => console.log(result))
        }
      )
      break
  }

  res.end()
}
