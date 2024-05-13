import React, { useState, Navigate } from 'react';
import { searchCourses } from './services/course';

function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('tags');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearch = async () => {
        setIsLoading(true);
        try {
            const response = await searchCourses(searchTerm, searchType);
            const data = await response.json();
            console.log("search courses: ", data);
            setResults(data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDropdownClick = (courseId) => {
        <Navigate to={"/course/" + courseId} />
    }

    return (
        <div className="search-container">
            <input
                type="text"
                placeholder={`Search by ${searchType}...`}
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <div onChange={handleSearchTypeChange}>
                <input type="radio" value="name" name="searchType" checked={searchType === 'name'} /> Name
                <input type="radio" value="tags" name="searchType" checked={searchType === 'tags'} /> Tags
            </div>
            <button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? 'Searching...' : 'Search'}
            </button>
            {results.length > 0 && (
                <select>
                    {results.map((course, index) => (
                        <option key={course.course_id} value={course.course_name} onClick={handleDropdownClick}>
                            {course.course_name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}

export default SearchComponent;
