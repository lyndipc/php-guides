import EnvelopeOpen from '@/components/newsletter-icons/envelope-open-text-thin.svg'
import AtSymbol from '@/components/newsletter-icons/at-thin.svg'
import Privacy from '@/components/newsletter-icons/blinds-raised-thin.svg'
import Sparkles from '@/components/newsletter-icons/sparkles-thin.svg'
import UserSlash from '@/components/newsletter-icons/user-slash-thin.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  at: AtSymbol,
  inbox: EnvelopeOpen,
  privacy: Privacy,
  sparkles: Sparkles,
  userSlash: UserSlash,
}

const NewsletterIcons = ({ kind, href, size = 8 }) => {
  const IconSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <IconSvg className={`fill-current text-gray-800 dark:text-slate-50 h-${size} w-${size}`} />
    </a>
  )
}

export default NewsletterIcons
