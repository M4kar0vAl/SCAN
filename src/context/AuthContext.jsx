import axios from "axios";
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

export function useAuth() {
    let expired = isTokenExpired()
    if (!expired && !axios.defaults.headers.common['Authorization']) {
        axios.defaults.headers.common['Authorization'] = "Bearer " + JSON.parse(localStorage.getItem('token')).accessToken
    } 
    return useContext(AuthContext);
}

export function useAuthDispatch() {
    return useContext(AuthDispatchContext)
}

export function AuthProvider({ children }) {
    const [token, dispatch] = useReducer(authReducer, localStorage.getItem('token'))

    return (
        <AuthContext.Provider value={token}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthContext.Provider>
    )
}

function authReducer(state, action) {
    switch (action.type) {
        case 'setToken':
            axios.defaults.headers.common["Authorization"] = "Bearer " + action.token.accessToken
            localStorage.setItem('token', JSON.stringify(action.token))
            return action.token

        case 'clearToken':
            delete axios.defaults.headers.common["Authorization"]
            localStorage.removeItem('token');
            return null
    }
    throw Error(`Unknown action type: ${action.type}`);
}

export function isTokenExpired() {
    if (!localStorage.getItem('token')) {
        return true
    }
    return Date.parse(JSON.parse(localStorage.getItem('token')).expire) <= Date.now()
}
