import { useEffect } from "react"

import { isTokenExpired, useAuthDispatch } from "../context/AuthContext"
import { useLimitInfoDispatch } from "../context/LimitInfoContext"
import { useHistogramsDispatch } from "../context/HistogramsContext"
import { useDocumentsInfoDispatch } from "../context/DocumentsContext"

export function useHandleTokenExpired() {
    const tokenExpired = isTokenExpired()
    const authDispatch = useAuthDispatch()
    const limitInfoDispatch = useLimitInfoDispatch()
    const histogramsDispatch = useHistogramsDispatch()
    const documentsInfoDispatch = useDocumentsInfoDispatch()

    useEffect(() => {
        if (tokenExpired) {
            authDispatch({
                type: 'clearToken'
            })
            limitInfoDispatch({
                type: 'clearLimitInfo'
            })
            histogramsDispatch({
                type: 'clearHistograms'
            })
            documentsInfoDispatch({
                type: 'clearDocumentsInfo'
            })
        }
    }, [tokenExpired]) 
}
