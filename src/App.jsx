import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Home/Header'
import SideNav from './components/Home/SideNav'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Home/Footer'
import HeaderMain from './components/Home/HeaderMain'
import ProductPage from './pages/ProductPage'
import Banner from './components/Home/Banner'
import CatPage from './pages/CatPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ScrollToTop from './components/Home/ScrollToTop'
import HeaderNavMobile from './components/Home/HeaderNavMobile'
import OrderConfirmPage from './pages/OrderConfirmPage'
import WishlistPage from './pages/WishlistPage'
import { CartProvider } from './context/CartContext'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import DashboardDash from './components/Dashboard/DashboardDash'
import CategoryDash from './components/Dashboard/Category/CategoryDash'
import BrandDash from './components/Dashboard/Brand/BrandDash'
import CategoryAddForm from './components/Dashboard/Category/CategoryAddForm'
import CategoryTable from './components/Dashboard/Category/CategoryTable'
import CategoryEditDash from './components/Dashboard/Category/CategoryEditDash'
import BrandTable from './components/Dashboard/Brand/BrandTable'
import BrandAddForm from './components/Dashboard/Brand/BrandAddForm'
import BrandEditDash from './components/Dashboard/Brand/BrandEditForm'
import ProductDash from './components/Dashboard/Product/ProductDash'
import ProductTable from './components/Dashboard/Product/ProductTable'
import SideMenuDash from './components/Dashboard/SideMenu/SideMenuDash'
import SideMenuTable from './components/Dashboard/SideMenu/SideMenuTable'
import SideMenuAddForm from './components/Dashboard/SideMenu/SideMenuAddForm'
import SideMenuEditDash from './components/Dashboard/SideMenu/SideMenuEditForm'
import ProductAddForm from './components/Dashboard/Product/ProductAddForm'
import ProductEditDash from './components/Dashboard/Product/ProductEditDashForm'
import KeyFeatureDash from './components/Dashboard/KeyFeature/KeyFeatureDash'
import KeyFeatureTable from './components/Dashboard/KeyFeature/KeyFeatureTable'
import KeyFeatureEditDash from './components/Dashboard/KeyFeature/KeyFeatureEditDash'
import SpecificationDash from './components/Dashboard/Specification/SpecificationDash'
import SpecificationTable from './components/Dashboard/Specification/SpecificationTable'
import SpecificationEditDash from './components/Dashboard/Specification/SpecificationEditDash'
import SliderDash from './components/Dashboard/Slider/SliderDash'
import SliderTable from './components/Dashboard/Slider/SliderTable'
import SliderAddForm from './components/Dashboard/Slider/SliderAddForm'
import SliderEditDash from './components/Dashboard/Slider/SliderEditDash'
import OrderDash from './components/Dashboard/Order/OrderDash'
import OrderTable from './components/Dashboard/Order/OrderTable'
import OrderSingleUserDash from './components/Dashboard/Order/OrderSingleUserDash'
import Profile from './pages/Profile'
import ProfileInfo from './components/ProfilePage/ProfileInfo'
import ProfileOrder from './components/ProfilePage/ProfileOrder'
import { useAuthContext } from './context/AuthContext'
import QuickView from './components/Modal/QuickView'


function App() {

  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showDpt, setShowDpt] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const { pathname } = useLocation()

  const {user, onAuth} = useAuthContext()


  useEffect(() => {
    const hideDpt = () => {
      setShowDpt(false)
    }
    window.addEventListener('scroll', hideDpt)

    return () => {
      window.removeEventListener('scroll', hideDpt)
    }
  },[showDpt])

  useEffect(() => {

    // show sub menu on mobile
    const submenu = document.querySelectorAll('.has-child a')

    function toggle (e) {
      e.preventDefault()
      submenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand') : null)
      if (this.closest('.has-child').classList != 'expand') {
          this.closest('.has-child').classList.toggle('expand')
      }
    }
    
    
    submenu.forEach((menu) => menu.addEventListener('click', toggle))
    
  },[])

  useEffect(() => {
    const localAuth = localStorage.getItem('glc_t')
    if (localAuth && localAuth != 'undefined') {
      onAuth(JSON.parse(localAuth))
    }
  }, [pathname])


  return (
    <div 
      className={`app ${showMenu ? `showmenu`: ``} ${showSearch ? `showsearch`: ``} ${showDpt ? `showdpt`: ``}`}
    >
      

      <CartProvider>
        {
          pathname !== '/signup' && pathname !== '/login' && pathname.slice(0,10) !== '/dashboard' &&
          <>
            <SideNav setShowMenu={setShowMenu} />
            <Header />
          </>
        }

        {/* header nav mobile sticky */}
        {
          pathname.slice(0,10) !== '/dashboard' &&
          <HeaderNavMobile 
            showCart={showCart} 
            setShowMenu={setShowMenu} 
            setShowCart={setShowCart} 
            />
        }
        
        {/* sticky header */}
        {
          pathname !== '/signup' && pathname !== '/login' && pathname.slice(0,10) !== '/dashboard' &&
          <HeaderMain
            showDpt={showDpt}
            setShowDpt={setShowDpt}
          />
        }
        <ScrollToTop />

        <main>
          <Routes>

            <Route path='/' element={<Home />}></Route>

            <Route path='/product/:id' element={<ProductPage />}></Route>

            <Route path='/category' element={<CatPage />}></Route>
            <Route path='/category/:cat/:page' element={<CatPage />}></Route>
            <Route path='/menu/:cat/:page' element={<CatPage />}></Route>
            <Route path='/menu/:name/:code/:brand/:page' element={<CatPage />}></Route>
            <Route path='/search/:query/:page' element={<CatPage />}></Route>
            <Route path='/featured/:page' element={<CatPage />}></Route>
            {/* <Route path='/related' element={<CatPage />}></Route> */}

            <Route path='/wishlist' element={<WishlistPage />}></Route>

            <Route path='/cart' element={<CartPage />}></Route>

            <Route path='/checkout' element={<CheckoutPage />}></Route>

            <Route path='/confirmation' element={<OrderConfirmPage />}></Route>

            {
              user.length == 0 &&
              <>
                <Route path='/signup' element={<SignUp />}></Route>
                <Route path='/login' element={<Login />}></Route>              
              </>
            }



            {
              user && 
              <Route path='/profile' element={<Profile />}>
                <Route path='info' element={<ProfileInfo />} />
                <Route path='order' element={<ProfileOrder />} />
              </Route>
            }


            {/* dashboard */}
            {
              user && user.is_staff &&
                <Route path='/dashboard' element={<Dashboard />}>
                  <Route path='home' element={<DashboardDash/>} />
                  <Route path='category' element={<CategoryDash/>} >
                    <Route path='' element={<CategoryTable />} />
                    <Route path='add' element={<CategoryAddForm />} />
                    <Route path='edit/:id' element={<CategoryEditDash />} />
                  </Route>
                  <Route path='brand' element={<BrandDash/>} >
                    <Route path='' element={<BrandTable />} />
                    <Route path='add' element={<BrandAddForm />} />
                    <Route path='edit/:id' element={<BrandEditDash />} />
                  </Route>
                  <Route path='product' element={<ProductDash/>}>
                    <Route path='' element={<ProductTable />} />
                    <Route path='add' element={<ProductAddForm />} />
                    <Route path='edit/:id' element={<ProductEditDash />} />
                  </Route>
                  <Route path='key-feature' element={<KeyFeatureDash/>} >
                    <Route path='' element={<KeyFeatureTable />} />
                    <Route path='edit/:id' element={<KeyFeatureEditDash />} />
                  </Route>
                  <Route path='specification' element={<SpecificationDash/>} >
                    <Route path='' element={<SpecificationTable />} />
                    <Route path='edit/:id' element={<SpecificationEditDash />} />
                  </Route>
                  <Route path='slider' element={<SliderDash/>} >
                    <Route path='' element={<SliderTable />} />
                    <Route path='add' element={<SliderAddForm />} />
                    <Route path='edit/:id' element={<SliderEditDash />} />
                  </Route>
                  <Route path='side-menu' element={<SideMenuDash />} >
                    <Route path='' element={<SideMenuTable />} />
                    <Route path='add' element={<SideMenuAddForm />} />
                    <Route path='edit/:id' element={<SideMenuEditDash />} />
                  </Route>
                  <Route path='order' element={<OrderDash/>} >
                    <Route path='' element={<OrderTable />} />
                    <Route path=':id' element={<OrderSingleUserDash />} />
                  </Route>
                </Route>
            }

          </Routes>

          {/* {
            pathname !== '/confirmation' && pathname !== '/signup' && pathname !== '/login' && 
              <Banner />
          } */}
          <QuickView />
        </main>

        
        {
          pathname !== '/confirmation' && pathname !== '/signup' && pathname !== '/login' && pathname.slice(0,10) !== '/dashboard' &&
          <Footer 
            setShowMenu={setShowMenu}
            setShowSearch={setShowSearch} 
            setShowCart={setShowCart} 
          />
        }

      </CartProvider>

      
    </div>
  )
}



export default App