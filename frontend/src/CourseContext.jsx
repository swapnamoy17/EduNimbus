import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { enrollinCourse } from './services/course';

const CourseContext = createContext();

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const userId = localStorage.getItem('userId'); // Initially set userId

    const enrollCourse = async (courseId) => {
        console.log("UserId inside Context:", userId)
        if (!userId) {
            console.error('User ID is missing');
            return false; // Ensure userId is present before making API call
        }
        
        try {
            const response = await enrollinCourse(courseId, userId);
            console.log("Response after clicking enroll button",response);
            setEnrolledCourses([...enrolledCourses, courseId]);
            return true; // Indicate success
        } catch (error) {
            console.error('Failed to enroll in course:', error);
            return false; // Indicate failure
        }
    };

    return (
        <CourseContext.Provider value={{ enrolledCourses, enrollCourse, setEnrolledCourses }}>
            {children}
        </CourseContext.Provider>
    );
};
