import { useState } from 'react'

export default function ImageUploader({ images = [], callback }) {
  const [altText, setAltText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [uploading, setUploading] = useState(false)

  if (!images.length || currentIndex === images.length) return null

  const handleSubmit = async (event) => {
    event.preventDefault()
    setUploading(true)

    const formData = new FormData()
    formData.append('image', images[currentIndex])
    formData.append('altText', altText)
    const response = await fetch('/api/image', {
      method: 'POST',
      body: formData,
    })
    const imageData = await response.json()
    setUploading(false)
    setAltText('')
    setCurrentIndex((index) => index + 1)
    callback(imageData, altText)
  }

  return (
    <div className="image-uploader">
      <div className="container">
        <h2>Image upload</h2>
        <img
          src={URL.createObjectURL(images[currentIndex])}
          alt="image to be uploaded"
        />
        <form onSubmit={handleSubmit}>
          <label htmlFor="alt-text-input">Enter alt text</label>
          <input
            type="text"
            name="alt"
            id="alt-text-input"
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
          />
          <button type="submit" disabled={uploading ? true : false}>
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
