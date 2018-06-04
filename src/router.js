import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import authRedirects from './authRedirects'

export const history = createBrowserHistory()

class Router extends BrowserRouter {
  history
}

export default authRedirects(Router)
