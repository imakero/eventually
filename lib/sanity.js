import { createClient, createImageUrlBuilder } from 'next-sanity'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  apiVersion: '2021-10-21',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_WRITE_KEY,
}

export const urlFor = (source) => createImageUrlBuilder(config).image(source)

export const sanityClient = createClient(config)

export const slugify = (s) => s.toLowerCase().replace(/\s+/g, '-').slice(0, 50)
