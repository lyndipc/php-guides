import { createContext, useContext, useState } from 'react'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null)

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => {
      setToast(null)
    }, 7000)
  }

  return <ToastContext.Provider value={{ toast, showToast }}>{children}</ToastContext.Provider>
}

export const useToast = () => useContext(ToastContext)
