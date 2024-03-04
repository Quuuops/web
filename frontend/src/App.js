import React from 'react';
import Header from './components/Base/js/Header';
import Footer from './components/Base/js/Footer';
import { LoginRoutes, ProductRoutes } from './routes';
import './App.css';
import {ModalProvider} from "./components/Base/ModalContext";

function App() {
    return (
        <ModalProvider>
            <div className="App">
                <Header />
                <div className="content">
                    <LoginRoutes />
                    <ProductRoutes />
                </div>
                <Footer />
            </div>
        </ModalProvider>
    );
}


export default App;
