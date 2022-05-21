import React from 'react'
import { Navigate } from 'react-router-dom'

import { urls } from './utils/urls'

export const PrivateRoute: any = ({ children }: any) => {
    const token = localStorage.getItem('rpiManager-token')

    if (!token) {
        return <Navigate to={urls.app.LOGIN} replace />
    }

    return children
}
