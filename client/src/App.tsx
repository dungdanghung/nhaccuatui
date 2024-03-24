import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Loader from './components/loading'
import NotFound from './pages/not-found'
import Login from './pages/login'
import { QueryClient, QueryClientProvider } from "react-query"
import Register from './pages/register'
import { Suspense, lazy } from "react"
const Home = lazy(() => import("./pages/home/index"))
import LayoutDashBoard from './layout/Layout_dashboard'
import "./grid.css"

const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    children: [
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          },
        ]
      },
      {
        path: '/',
        element: <LayoutDashBoard />,
        children: [
          {
            index: true,
            element: <Suspense fallback={<Loader display={true} />}><Home /></Suspense>,
          },
        ]
      }
    ]
  }
])



const queryClient = new QueryClient()
function App() {
  return (
    <div className="main">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </div>
  )
}

export default App
