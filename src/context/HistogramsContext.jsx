import { createContext, useContext, useReducer } from "react";

const HistogramsContext = createContext(null)
const HistogramsDispatchContext = createContext(null)

export function useHistograms() {
    return useContext(HistogramsContext)
}

export function useHistogramsDispatch() {
    return useContext(HistogramsDispatchContext)
}

export function HistogramsProvider({ children }) {
    const [histograms, dispatch] = useReducer(histogramsReducer, JSON.parse(localStorage.getItem('histograms')))

    return (
        <HistogramsContext.Provider value={histograms}>
            <HistogramsDispatchContext.Provider value={dispatch}>
                {children}
            </HistogramsDispatchContext.Provider>
        </HistogramsContext.Provider>
    )
}

function histogramsReducer(state, action) {
    const {type} = action

    switch (type) {
        case 'setHistograms':
            localStorage.setItem('histograms', JSON.stringify(action.histograms))
            return action.histograms
    
        case 'clearHistograms':
            localStorage.removeItem('histograms')
            return null
    }
    throw Error(`Unknown action type: ${action.type}`);
}