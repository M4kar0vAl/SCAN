import { createContext, useContext, useReducer } from "react";

const documentsInfoContext = createContext(null)
const documentsInfoDispatchContext = createContext(null)

export function useDocumentsInfo() {
    return useContext(documentsInfoContext)
}

export function useDocumentsInfoDispatch() {
    return useContext(documentsInfoDispatchContext)
}

export function DocumentsInfoProvider({ children }) {
    const [documentsInfo, dispatch] = useReducer(documentsInfoReducer, JSON.parse(localStorage.getItem('documentsInfo')))
    // documentsInfo = {documentsIds: ['', ''], documents: [{}, {}], startIndex: 0, hasMore: true}
    return (
        <documentsInfoContext.Provider value={documentsInfo}>
            <documentsInfoDispatchContext.Provider value={dispatch}>
                {children}
            </documentsInfoDispatchContext.Provider>
        </documentsInfoContext.Provider>
    )
}

function documentsInfoReducer(state, action) {
    const { type } = action
    let nextState

    switch (type) {
        case 'setDocumentsIds':
            nextState = {
                ...state,
                documentsIds: action.documentsIds
            }
            localStorage.setItem('documentsInfo', JSON.stringify(nextState))
            return nextState
    
        case 'setDocuments':
            nextState = {
                ...state,
                documents: action.documents
            }
            localStorage.setItem('documentsInfo', JSON.stringify(nextState))
            return nextState
    
        case 'setStartIndex':
            nextState = {
                ...state,
                startIndex: action.startIndex
            }
            localStorage.setItem('documentsInfo', JSON.stringify(nextState))
            return nextState
        
        case 'setHasMore':
            nextState = {
                ...state,
                hasMore: !action.isLast
            }
            localStorage.setItem('documentsInfo', JSON.stringify(nextState))
            return nextState
            
        case 'clearDocumentsInfo':
            localStorage.removeItem('documentsInfo')
            return null
    }
}
