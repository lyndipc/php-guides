import { useState } from 'react'
import NewsletterPopUp from '@/components/NewsletterPopUp'
import Icon from '@/components/button-icons'

const NewsletterPopUpButton = ({ title = 'Subscribe to the newsletter' }) => {
  const [isPopUpOpen, setPopUpOpen] = useState(false)

  const openPopUp = () => {
    setPopUpOpen(true)
  }

  const closePopUp = () => {
    setPopUpOpen(false)
  }

  return (
    <div>
      <button
        className="flex flex-row items-center justify-end rounded-md bg-primary-500 px-4 py-2  font-medium text-white hover:bg-primary-600 dark:hover:bg-primary-400"
        onClick={openPopUp}
      >
        Subscribe To The Newsletter &nbsp; <Icon kind="envelope" size="6" />
      </button>
      {isPopUpOpen ? <NewsletterPopUp onClose={closePopUp} /> : null}
    </div>
  )
}

export default NewsletterPopUpButton
