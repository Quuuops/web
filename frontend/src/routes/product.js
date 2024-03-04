import {Routes, Route} from 'react-router-dom';
import List from '../components/Product/js/List';
import Detail from '../components/Product/js/View';

const ProductRoutes = () => (
    <Routes>
        <Route path="/product" element={<List/>}/>
        <Route path="/product/:id" element={<Detail/>}/>
    </Routes>
);

export default ProductRoutes;
