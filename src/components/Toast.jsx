import { useEffect } from 'react'
import { X, AlertCircle, CheckCircle } from 'lucide-react'

function Toast({ message, type = 'error', onClose }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 5000)

        return () => clearTimeout(timer)
    }, [onClose])

    const styles = {
        error: 'bg-red-50 border-red-200 text-red-800',
        success: 'bg-green-50 border-green-200 text-green-800'
    }

    const Icon = type === 'error' ? AlertCircle : CheckCircle

    return (
        <div className={`fixed bottom-4 right-4 max-w-md p-4 border rounded-lg shadow-lg ${styles[type]} flex items-start gap-3 animate-slide-up z-50`}>
            <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="flex-1 text-sm">{message}</p>
            <button
                onClick={onClose}
                className="flex-shrink-0 hover:opacity-70 transition-opacity"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}

export default Toast
