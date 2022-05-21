import React from 'react'
import { Link } from 'react-router-dom'

import { urls } from '../utils/urls'

export const NotFound: React.FC = () => (
    <div className="w-screen h-screen relative bg-slate-200 text-p-2 text-xl transition-colors">
        <div className="h-full flex flex-col items-center justify-center">
            <div className="text-center text-slate-800">
                <div className="text-4xl my-4">Error 404</div>
                <div className="text-2xl my-4">Page not found</div>
                <Link
                    to={urls.app.DASHBOARD}
                    className="block p-4 my-5 rounded-full text-slate-50 bg-green-500 hover:bg-green-600 transition-colors"
                >
                    Accueil
                </Link>
            </div>
        </div>
    </div>
)
