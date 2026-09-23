import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import AppButton from '../components/AppButton'
import { useAuth } from '../contexts/AuthContext'
import './Createproduct.css'

const Createproduct = ( {dark} ) => {
  const { token } = useAuth()
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'
  const [product, setProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: null,
  })
  const [submitting, setSubmitting] = useState(false)
  const imagePreview = useMemo(
    () => (product.image ? URL.createObjectURL(product.image) : ''),
    [product.image],
  )

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

  const handleChange = (event) => {
    const { name, value, files } = event.target
    setProduct((currentProduct) => ({
      ...currentProduct,
      [name]: name === 'image' ? files[0] : value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!product.image) {
      toast.error('Please choose a product image before publishing.')
      return
    }

    const formData = new FormData()
    formData.append('title', product.title)
    formData.append('price', product.price)
    formData.append('description', product.description)
    formData.append('product_image', product.image)

    setSubmitting(true)

    try {
      await axios.post(`${apiUrl}/product/createproduct`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      toast.success('Product published successfully.')
    } catch (requestError) {
      const responseData = requestError?.response?.data
      const message = responseData?.message
        || responseData?.error?.message
        || (typeof responseData?.error === 'string' ? responseData.error : '')
        || requestError?.message
        || 'Product could not be published. Please try again.'
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className={`create-product-page${dark ? ' dark' : ''}`}>
      <section className="create-product-intro">
        <p className="eyebrow">Product studio</p>
        <h1>Create a product</h1>
        <p>Give your next favourite product a clear, beautiful home in your store.</p>
      </section>

      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-fields">
          <div className="form-heading">
            <h2>Product details</h2>
            <p>Fields marked with * are required.</p>
          </div>

          <label htmlFor="title">
            Title <span>*</span>
            <input
              id="title"
              name="title"
              type="text"
              value={product.title}
              onChange={handleChange}
              placeholder="e.g. Hydrating face serum"
              required
            />
          </label>

          <label htmlFor="price">
            Price <span>*</span>
            <div className="price-input">
              <span>$</span>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={product.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
          </label>

          <label htmlFor="description">
            Description <span>*</span>
            <textarea
              id="description"
              name="description"
              rows="6"
              value={product.description}
              onChange={handleChange}
              placeholder="Tell customers what makes this product special..."
              required
            />
          </label>

          <div className="form-actions">
            <AppButton
              text={submitting ? 'Publishing...' : 'Publish product'}
              type="submit"
              bgColor="#222"
              textColor="#fff"
              useBorder="8px"
              disabled={submitting}
            />
          </div>
        </div>

        <div className="image-panel">
          <div>
            <p className="eyebrow">Visual identity</p>
            <h2>Add a product image</h2>
            <p className="image-help">Use a clear JPG, PNG, or WEBP image up to 5MB.</p>
          </div>

          <label className={`image-upload${imagePreview ? ' has-preview' : ''}`} htmlFor="image">
            {imagePreview ? (
              <img src={imagePreview} alt="Product preview" />
            ) : (
              <>
                <span className="upload-icon">+</span>
                <strong>Choose an image</strong>
                <span>or drag and drop it here</span>
              </>
            )}
            <input id="image" name="image" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleChange} required />
          </label>
          {imagePreview && <span className="replace-image">Click the preview to replace it</span>}
        </div>
      </form>
    </main>
  )
}

export default Createproduct