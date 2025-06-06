import { useTranslation } from 'react-i18next'
import useRouteElements from './useRouteElements'
import { useSelector } from 'react-redux'
import { RootState } from './redux/configureStore'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

function App() {
  const { i18n } = useTranslation()
  const language = useSelector((state: RootState) => state.language.language)
  const routeElements = useRouteElements()
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language, i18n])

  return (
    <div>
      {routeElements}
      <ToastContainer />
    </div>
  )
}

export default App
