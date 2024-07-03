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
const Create_song = lazy(() => import('./pages/create/create_song'))
const Create_mv = lazy(() => import('./pages/create/create_MV'))
const Add_audio = lazy(() => import("./pages/create/add_audio"))
const Add_artwork = lazy(() => import("./pages/create/add_artwork"))
const Manager_stores = lazy(() => import("./pages/create/manager_stores"))
const Manager_music = lazy(() => import("./pages/manager/music"))
const Manager_mv = lazy(() => import("./pages/manager/mv"))
const Library = lazy(() => import("./pages/Library/index"))
const MV_detail = lazy(() => import('./pages/create/mv_detail'))
const Follow = lazy(() => import('./pages/follow/index'))
const Radio = lazy(() => import('./pages/radio/index'))
const Zingchart = lazy(() => import('./pages/zingchart/index'))
const Search = lazy(() => import('./pages/search/index'))
const MV_detail_manager = lazy(() => import('./pages/manager/mv_detail'))
const Dashboard = lazy(() => import('./pages/manager/dashboard'))
const Profile = lazy(() => import('./pages/profile/index'))
const Add_mv = lazy(() => import('./pages/create/add_mv'))
const Song_detail = lazy(() => import('./pages/song-detail/index'))
import LayoutDashBoard from './layout/Layout_dashboard'
import LayoutOnlyHearder from "./layout/only_header"
import Add_lyric from "./pages/create/add_lyric"
import LayoutManager from "./layout/layout_manager"
import "./grid.css"
import Detail from "./pages/manager/detail"
import LayoutProfile from "./layout/Layout_profile"


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
            path: 'library',
            element: <Suspense fallback={<Loader display={true} />}><Library /></Suspense>,
          },
          {
            path: 'zingchart',
            element: <Suspense fallback={<Loader display={true} />}><Zingchart /></Suspense>,
          },
          {
            path: 'radio',
            element: <Suspense fallback={<Loader display={true} />}><Radio /></Suspense>,
          },
          {
            path: 'follow',
            element: <Suspense fallback={<Loader display={true} />}><Follow /></Suspense>,
          },
          {
            path: 'search?',
            element: <Suspense fallback={<Loader display={true} />}><Search /></Suspense>,
          },
          {
            path: 'song-detail?',
            element: <Suspense fallback={<Loader display={true} />}><Song_detail /></Suspense>,
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
            path: 'song',
            element: <Suspense fallback={<Loader display={true} />}><Create_song /></Suspense>,
          }, {
            path: 'mv',
            element: <Suspense fallback={<Loader display={true} />}><Create_mv /></Suspense>,
          }, {
            path: 'mv_detail',
            element: <Suspense fallback={<Loader display={true} />}><MV_detail /></Suspense>,
          }, {
            path: 'add_mv',
            element: <Suspense fallback={<Loader display={true} />}><Add_mv /></Suspense>,
          }, {
            path: 'album_detail',
            element: <Suspense fallback={<Loader display={true} />}><Album_detail /></Suspense>,
          }, {
            path: 'add_audio',
            element: <Suspense fallback={<Loader display={true} />}><Add_audio /></Suspense>,
          }, {
            path: 'add_artwork_song',
            element: <Suspense fallback={<Loader display={true} />}><Add_artwork type={'song'} /></Suspense>,
          },
          {
            path: 'add_artwork_mv',
            element: <Suspense fallback={<Loader display={true} />}><Add_artwork type={'mv'} /></Suspense>,
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
            path: 'music',
            element: <Suspense fallback={<Loader display={true} />}><Manager_music /></Suspense>,
          },
          {
            path: 'mv',
            element: <Suspense fallback={<Loader display={true} />}><Manager_mv /></Suspense>,
          },
          {
            path: 'dashboard',
            element: <Suspense fallback={<Loader display={true} />}><Dashboard /></Suspense>,
          },
        ]
      },
      {
        path: 'manager',
        element: <LayoutManager play_controller={true} />,
        children: [
          {
            path: 'music/detail/:id',
            element: <Suspense fallback={<Loader display={true} />}><Detail /></Suspense>,
          },
          {
            path: 'mv/detail/:id',
            element: <Suspense fallback={<Loader display={true} />}><MV_detail_manager /></Suspense>,
          }
        ]
      },
      {
        path: 'profile',
        element: <LayoutProfile />,
        children: [
          {
            index: true,
            element: <Suspense fallback={<Loader display={true} />}><Profile /></Suspense>,
          },
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
