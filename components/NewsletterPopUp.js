import { useRef, useState, useEffect } from 'react'

import siteMetadata from '@/data/siteMetadata'
import NewsletterIcons from '@/components/newsletter-icons'

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
      <div className="rounded-md bg-slate-50 p-8 dark:bg-gray-700" ref={popUpRef}>
        <h2 className="mb-4 justify-center text-lg font-semibold capitalize">
          By subscribing to the PHP Guides Newsletter you:{' '}
        </h2>
        <div>
          {/* <p className="mb-4 text-md"> 
            By subscribing to the PHP Guides Newsletter you agree to{' '}
          </p> */}
        </div>
        <div className="mt-6 mb-10 grid grid-flow-row grid-rows-2 gap-4">
          <div className="flex flex-row gap-4">
            <NewsletterIcons kind="at" size="6" />
            <p>Agree to share your email with PHP Guides</p>
          </div>
          <div className="flex flex-row gap-4">
            <NewsletterIcons kind="privacy" size="6" />
            <p>Have read and agree to the Privacy Policy</p>
          </div>
          <h2 className="my-4 text-lg font-semibold capitalize">What you can expect from us:</h2>
          <div className="flex flex-row gap-4">
            <NewsletterIcons kind="userSlash" size="6" />
            <p>
              No spam, ever. Your email address will only ever be used for PHP Guides Newsletter
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <NewsletterIcons kind="inbox" size="6" />
            <p>Monthly recaps of our latest posts delivered directly to your inbox</p>
          </div>
          <div className="flex flex-row gap-4">
            <NewsletterIcons kind="sparkles" size="6" />
            <p>A sprinkle of PHP tips, tricks, and commentary</p>
          </div>
          <h2 className="mt-4 text-lg font-semibold">
            If that still sounds good, fill out the form below :)
          </h2>
        </div>
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
              I have read and agree with the Privacy Policy and consent to share my email with PHP
              Guides.
            </label>
          </div>
          <div className="flex justify-end">
            <button
              className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none dark:text-slate-400 dark:hover:text-slate-50"
              type="submit"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-primary-500 px-4 py-2 text-slate-50 hover:bg-primary-700 focus:outline-none"
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
