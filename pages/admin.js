import { useEffect, useState } from 'react'
import ImageUploader from '../components/ImageUploader'

export default function Admin() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [agenda, setAgenda] = useState('')
  const [coverImage, setCoverImage] = useState(null)
  const [eventImages, setEventImages] = useState([])
  const [allImages, setAllImages] = useState([])
  const [submit, setSubmit] = useState(false)
  const [eventData, setEventData] = useState(null)
  const [category, setCategory] = useState('entertainment')

  useEffect(() => {
    const submitEvent = async () => {
      await fetch('/api/event', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(eventData),
      })
    }

    if (submit) {
      submitEvent()
    }
  }, [submit])

  const handleSubmit = async (event) => {
    event.preventDefault()

    setEventData({
      title,
      date,
      description,
      agenda,
      category,
      images: [],
    })

    setAllImages([coverImage, ...eventImages])
  }

  const handleImageUpload = (imageData, altText) => {
    const images = [...eventData.images, { imageData, altText }]
    setEventData((previousData) => ({ ...previousData, images }))
  }

  if (
    eventData?.images.length &&
    eventData.images.length === allImages.length &&
    !submit
  ) {
    setSubmit(true)
  }

  if (submit) {
    return (
      <main className="page-admin">
        <h2>Your event has been submit!</h2>
      </main>
    )
  }

  return (
    <main className="page-admin">
      <h2>Create new event</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          title="title"
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />

        <label htmlFor="description">Short description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="10"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>

        <label htmlFor="agenda">Agenda</label>
        <textarea
          name="agenda"
          id="agenda"
          cols="30"
          rows="10"
          value={agenda}
          onChange={(event) => setAgenda(event.target.value)}
        ></textarea>

        <label htmlFor="cover-image">Cover image</label>
        <input
          type="file"
          name="cover-image"
          id="cover-image"
          accept="image/*"
          onChange={(event) => setCoverImage(event.target.files[0])}
        />

        <label htmlFor="images">Event images</label>
        <input
          type="file"
          name="images"
          id="images"
          accept="image/*"
          multiple
          onChange={(event) => setEventImages(event.target.files)}
        />

        <label htmlFor="category"></label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="entertainment">Entertainment</option>
          <option value="after-work">After work</option>
          <option value="education">Education</option>
        </select>

        <button type="submit">Skapa event</button>
      </form>
      <ImageUploader images={allImages} callback={handleImageUpload} />
    </main>
  )
}
