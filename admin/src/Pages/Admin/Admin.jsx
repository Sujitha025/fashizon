
import AddProduct from '../../Components/Addproduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import Sidebar from '../../Components/Sidebar/Sidebar'
import './Admin.css'
import {Routes,Route} from 'react-router-dom'
const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar></Sidebar>
      <Routes>
        <Route path='/addproduct' element={<AddProduct></AddProduct>}></Route>
        <Route path="/listproduct" element={<ListProduct></ListProduct>}></Route>
      </Routes>
    </div>
  )
}

export default Admin