import { useRef, useState, useEffect } from 'react'

import siteMetadata from '@/data/siteMetadata'

const NewsletterPopUp = ({ onClose }) => {
  const email = useRef(null)
  const gdprConsent = useRef(null)
  const popUpRef = useRef(null)
  const [error, setError] = useState(false)
  const [message, setMessage] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const subscribe = async (e) => {
    e.preventDefault()

    if (gdprConsent.current.checked === false) {
      setError(true)
      setMessage('You need to agree to our Privacy Policy and GDPR regulations to subscribe.')
      return
    }

    const res = await fetch(`/api/${siteMetadata.newsletter.provider}`, {
      body: JSON.stringify({
        email: email.current.value,
        consent: gdprConsent.current.checked,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { error } = await res.json()
    if (error) {
      setError(true)
      setMessage('Your e-mail address is invalid or you are already subscribed!')
      return
    }

    email.current.value = ''
    setError(false)
    setSubscribed(true)
    setMessage('Successfully! 🎉 You are now subscribed.')

    onClose()
  }

  const handleClickOutside = (e) => {
    if (popUpRef.current && !popUpRef.current.contains(e.target)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-gray-700 p-8" ref={popUpRef}>
        <h2 className="mb-4 text-lg font-semibold">Subscribe to PHP Guides</h2>
        <form onSubmit={subscribe}>
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block">
              Email Address:
            </label>
            <input
              id="email-input"
              className="w-full rounded-md px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder={subscribed ? "You're subscribed !  🎉" : 'Enter your email'}
              ref={email}
              required
              type="email"
              disabled={subscribed}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="gdpr-consent" className="flex items-center">
              <input
                className="mr-2"
                id="gdpr-consent"
                name="gdpr-consent"
                ref={gdprConsent}
                required
                type="checkbox"
                disabled={subscribed}
              />
              I consent to receive the newsletter and understand that my email will be handled in
              accordance with GDPR regulations.
            </label>
          </div>
          <div className="flex justify-end">
            <button
              className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              type="submit"
              // disabled={subscribed}
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-700 focus:outline-none"
            >
              Subscribe
            </button>
          </div>
        </form>
        {error && (
          <div className="w-72 pt-2 text-sm text-red-500 dark:text-red-400 sm:w-96">{message}</div>
        )}
      </div>
    </div>
  )
}

export default NewsletterPopUp
