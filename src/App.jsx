import logo from './logo.svg';
import './App.scss';
import '@picocss/pico'
//routing
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './layout/Layout';
import LayoutAdmin from './layout/admin/LayoutAdmin'
import Home from './views/Home'
import HomeAdmin from './views/admin/HomeAdmin'
import NotFound from './views/NotFound';
import WishList from './views/wishList/WishList'
import CreateWish from './views/admin/WishList/CreateWish';
import EditWish from './views/admin/WishList/EditWish';
import AdminWishListe from './views/admin/WishList/AdminWishList';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* PUBLIC */}

        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='/wishList' element={<WishList />} />
          <Route path='*' element={<NotFound />} />
        </Route>

        {/* ADMIN */}

        <Route path='/admin' element={<LayoutAdmin />}>
          <Route index element={<HomeAdmin />} />
          <Route path='/admin/createwish' element={<CreateWish />} />
          <Route path='/admin/adminwishlist' element={<AdminWishListe />} />
          <Route path='/admin/editwish/:id' element={<EditWish />} />
          <Route path='*' element={<NotFound />} />
        </Route>

      </>
    )
  )

  return (
    <main className='container'>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
