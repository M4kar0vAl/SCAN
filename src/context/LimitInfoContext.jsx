import { createContext, useContext, useReducer } from "react";

const LimitInfoContext = createContext(null)
const LimitInfoDispatchContext = createContext(null)

export function useLimitInfo() {
    return useContext(LimitInfoContext)
}

export function useLimitInfoDispatch() {
    return useContext(LimitInfoDispatchContext)
}

export function LimitInfoProvdider({children}) {
    const [limitInfo, dispatch] = useReducer(limitInfoReducer, JSON.parse(localStorage.getItem('limitInfo')))
    
    return (
        <LimitInfoContext.Provider value={limitInfo}>
            <LimitInfoDispatchContext.Provider value={dispatch}>
                {children}
            </LimitInfoDispatchContext.Provider>
        </LimitInfoContext.Provider>
    )
}

function limitInfoReducer(state, action) {
    const {type} = action

    switch (type) {
        case 'setLimitInfo':
            localStorage.setItem('limitInfo', JSON.stringify(action.limitInfo))
            return action.limitInfo
        case 'clearLimitInfo':
            localStorage.removeItem('limitInfo')
            return null
    }
    throw Error(`Unknown action type: ${action.type}`);
}

