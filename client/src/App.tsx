import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { urls } from './utils/urls'

import { PrivateRoute } from './PrivateRoute'

import { ControlCenter } from './layouts/ControlCenter'

import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { NotFound } from './pages/NotFound'

import { Dashboard } from './pages/Dashboard'
import { Settings } from './pages/Settings'

const App = () => {
    return (
        <>
            <Routes>
                <Route path={urls.app.LOGIN} element={<Login />} />
                <Route path="/" element={<Login />} />
                <Route path={urls.app.REGISTER} element={<Register />} />
                <Route
                    path={urls.app.CONTROL_CENTER}
                    element={
                        <PrivateRoute>
                            <ControlCenter />
                        </PrivateRoute>
                    }
                >
                    <Route
                        path={urls.app.DASHBOARD}
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path={urls.app.SETTINGS}
                        element={
                            <PrivateRoute>
                                <Settings />
                            </PrivateRoute>
                        }
                    />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App
