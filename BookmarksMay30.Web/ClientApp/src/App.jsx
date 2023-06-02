import React from 'react';
import { Route, Routes } from 'react-router';
import Layout from './Layout';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import { AuthContextComponent } from './AuthContext';
import Bookmarks from './Bookmarks';
import PrivateRoute from './PrivateRoute';
import AddBookmark from './AddBookmark';

const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Home />} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/logout' element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>} />
                    <Route exact path='/bookmarks' element={
                        <PrivateRoute>
                            <Bookmarks />
                        </PrivateRoute>} />
                    <Route exact path='/AddBookmark' element={
                        <PrivateRoute>
                            <AddBookmark />
                        </PrivateRoute>} />
                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;