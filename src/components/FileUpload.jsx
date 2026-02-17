import { useState } from 'react'
import { Upload, Loader2 } from 'lucide-react'
import { analyzeImage } from '../lib/gemini'

function FileUpload({ onIngredientsExtracted, onError }) {
    const [isAnalyzing, setIsAnalyzing] = useState(false)

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = async () => {
            const base64String = reader.result

            setIsAnalyzing(true)
            try {
                const ingredients = await analyzeImage(base64String)
                onIngredientsExtracted(ingredients)
            } catch (err) {
                onError('Failed to analyze image. Make sure your API key is configured.')
            } finally {
                setIsAnalyzing(false)
            }
        }

        reader.readAsDataURL(file)
    }

    return (
        <div className="w-full">
            <label
                htmlFor="image-upload"
                className="flex flex-col items-center justify-center w-full h-56 border-4 border-dashed border-orange-300 rounded-2xl cursor-pointer bg-gradient-to-br from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 hover:border-orange-400 transition-all shadow-lg"
            >
                {isAnalyzing ? (
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-16 h-16 text-orange-600 animate-spin" />
                        <p className="mt-4 text-base font-bold text-orange-700">Analyzing Image...</p>
                        <p className="mt-2 text-sm text-orange-600">AI is detecting ingredients</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl mb-4">
                            <Upload className="w-10 h-10 text-white" />
                        </div>
                        <p className="text-base text-gray-800 font-semibold">
                            <span className="text-orange-600 font-bold">Click to upload</span> or drag and drop
                        </p>
                        <p className="mt-2 text-sm text-gray-600">PNG, JPG, WEBP up to 10MB</p>
                        <div className="mt-3 px-4 py-2 bg-orange-200 text-orange-800 rounded-full text-xs font-bold">
                            AI-Powered Detection
                        </div>
                    </div>
                )}

                <input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={isAnalyzing}
                />
            </label>
        </div>
    )
}

export default FileUpload
