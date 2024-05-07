import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Loader from './components/loading'
import NotFound from './pages/not-found'
import Login from './pages/login'
import { QueryClient, QueryClientProvider } from "react-query"
import Register from './pages/register'
import { Suspense, lazy } from "react"
const Home = lazy(() => import("./pages/home/index"))
const Create = lazy(() => import("./pages/create/index"))
const Album_detail = lazy(() => import("./pages/create/album_detail"))
const Add_audio = lazy(() => import("./pages/create/add_audio"))
const Add_artwork = lazy(() => import("./pages/create/add_artwork"))
const Manager_stores = lazy(() => import("./pages/create/manager_stores"))
const Manager = lazy(() => import("./pages/manager/index"))
const Explore = lazy(() => import("./pages/explore/index"))
import LayoutDashBoard from './layout/Layout_dashboard'
import LayoutOnlyHearder from "./layout/only_header"
import Add_lyric from "./pages/create/add_lyric"
import LayoutManager from "./layout/layout_manager"
import "./grid.css"
import Detail from "./pages/manager/detail"

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
          {
            path: 'explore',
            element: <Suspense fallback={<Loader display={true} />}><Explore /></Suspense>,
          },
        ]
      },
      {
        path: 'create',
        element: <LayoutOnlyHearder />,
        children: [
          {
            index: true,
            element: <Suspense fallback={<Loader display={true} />}><Create /></Suspense>,
          }, {
            path: 'album_detail',
            element: <Suspense fallback={<Loader display={true} />}><Album_detail /></Suspense>,
          }, {
            path: 'add_audio',
            element: <Suspense fallback={<Loader display={true} />}><Add_audio /></Suspense>,
          }, {
            path: 'add_artwork',
            element: <Suspense fallback={<Loader display={true} />}><Add_artwork /></Suspense>,
          }, {
            path: 'add_lyric',
            element: <Suspense fallback={<Loader display={true} />}><Add_lyric /></Suspense>,
          }, {
            path: 'manager_stores',
            element: <Suspense fallback={<Loader display={true} />}><Manager_stores /></Suspense>,
          },
        ]
      },
      {
        path: 'manager',
        element: <LayoutManager />,
        children: [
          {
            index: true,
            element: <Suspense fallback={<Loader display={true} />}><Manager /></Suspense>,
          },
          {
            path: 'detail/:id',
            element: <Suspense fallback={<Loader display={true} />}><Detail /></Suspense>,
          }
        ]
      }
    ]
  }
])



const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>

  )
}

export default App
