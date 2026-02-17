import { Filter } from 'lucide-react'

function FilterSidebar({ filters, onFilterChange }) {
    const dietaryOptions = ['vegetarian', 'gluten-free']
    const timeRanges = [
        { label: 'Quick (< 30 min)', value: 30 },
        { label: 'Medium (30-45 min)', value: 45 },
        { label: 'Long (45+ min)', value: 999 }
    ]

    return (
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                <div className="w-10 h-10 bg-white/30 backdrop-blur rounded-xl flex items-center justify-center">
                    <Filter className="w-6 h-6 text-white" />
                </div>
                Filters
            </h3>

            <div className="space-y-5">
                {/* Dietary */}
                <div>
                    <h4 className="text-sm font-bold text-white/90 mb-3">Dietary Preferences</h4>
                    <div className="space-y-3">
                        {dietaryOptions.map((option) => (
                            <label key={option} className="flex items-center gap-3 cursor-pointer bg-white/10 backdrop-blur p-3 rounded-lg hover:bg-white/20 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={filters.dietary.includes(option)}
                                    onChange={(e) => {
                                        const newDietary = e.target.checked
                                            ? [...filters.dietary, option]
                                            : filters.dietary.filter(d => d !== option)
                                        onFilterChange({ ...filters, dietary: newDietary })
                                    }}
                                    className="w-5 h-5 text-green-500 rounded border-2 border-white focus:ring-2 focus:ring-white"
                                />
                                <span className="text-sm text-white font-semibold capitalize">{option}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Time */}
                <div>
                    <h4 className="text-sm font-bold text-white/90 mb-3">Cooking Time</h4>
                    <select
                        value={filters.maxTime}
                        onChange={(e) => onFilterChange({ ...filters, maxTime: parseInt(e.target.value) })}
                        className="w-full px-4 py-3 border-2 border-white/30 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white bg-white/20 backdrop-blur text-white font-semibold cursor-pointer"
                    >
                        <option value={999} className="text-gray-900">Any duration</option>
                        {timeRanges.map((range) => (
                            <option key={range.value} value={range.value} className="text-gray-900">
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default FilterSidebar
