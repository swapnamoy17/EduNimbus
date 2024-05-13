import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchCourses } from './services/course';
import './search.css'

function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('tags');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userId = localStorage.getItem('userId')
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleSearch = async () => {
        setIsLoading(true);
        setResults([])
        try {
            const response = await searchCourses(searchTerm, searchType, userId);
            const data = await response.courses;
            console.log("search courses: ", data);
            setResults(data);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDropdownClick = (event) => {
        console.log("cojdeiochdshcijdfvjikd ", event.target.value);
        navigate("/course/" + event.target.value, { state: { isRecommended: true } });
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
                <select onChange={handleDropdownClick} defaultValue="">
                    <option value="" disabled>Select a course</option>
                    {results.map((course) => (
                        <option key={course.course_id} value={course.course_id}>
                            {course.course_name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}

export default SearchComponent;
