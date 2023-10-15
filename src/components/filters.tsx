import React from 'react';
import { FilterOptions } from '../constants/interfaces';

interface FiltersProps {
    filters: FilterOptions;
    setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
}

const Filters: React.FC<FiltersProps> = ({ filters, setFilters }) => {
    return (
        <div className="flex gap-4">
            <div className="">
                <label className="inline-block text-sm font-semibold mb-2">Sort by:</label>
                <select
                    className="px-3 py-2 w-full border rounded"
                    value={filters.sorting}
                    onChange={(e) => setFilters({ ...filters, sorting: e.target.value })}
                >
                    <option value="relevance">Relevance</option>
                    <option value="date">Date</option>
                    <option value="viewCount">View Count</option>
                </select>
            </div>
            <div className="">
                <label className="inline-block text-sm font-semibold mb-2">Show:</label>
                <select
                    className="px-3 py-2 w-full border rounded"
                    value={filters.videoType}
                    onChange={(e) => setFilters({ ...filters, videoType: e.target.value as "live" | "standard" })}
                >
                    <option value="live">Live</option>
                    <option value="standard">Standard</option>
                </select>
            </div>
        </div>
    );
};

export default Filters;
