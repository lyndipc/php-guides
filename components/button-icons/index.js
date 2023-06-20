import Envelope from './envelope-light.svg'

// Icons taken from: https://simpleicons.org/

const components = {
  envelope: Envelope,
}

const Icon = ({ kind, href, size = 8 }) => {
  const IconSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <IconSvg className={`fill-current text-gray-200 h-${size} w-${size}`} />
    </a>
  )
}

export default Icon
