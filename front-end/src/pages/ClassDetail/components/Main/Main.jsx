import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { TabMenu } from 'primereact/tabmenu';

const Main = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('Infor Class');
  const items = [
    {
      label: 'Infor Class',
      icon: 'pi pi-fw pi-users',
      command: () => {
        setActiveTab('Infor Class');
      },
    },
    {
      label: 'People',
      icon: 'pi pi-fw pi-users',
      command: () => {
        setActiveTab('People');
      },
    },
    {
      label: 'Classwork',
      icon: 'pi pi-fw pi-file',
      command: () => {
        setActiveTab('Classwork');
      },
    },
  ];

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const token = localStorage.getItem('token'); // get token from local storage
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/class/class-detail?classId=${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCourse(response.data);
      } catch (error) {
        console.error('Failed to fetch course details:', error);
      }
    };

    fetchCourseDetail();
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TabMenu model={items} />
      <div>
        {activeTab === 'Infor Class' && course && (
          <div>
            <h2>{course.name}</h2>
          </div>
        )}
        {activeTab === 'People' && (
          <div style={{ margin: '0 auto', maxWidth: '600px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ color: '#333', borderBottom: '1px solid #ddd' }}>Teachers</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {course.teachers.length > 0 ? (
                course.teachers.map((teacher, index) => (
                  <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
                    <span style={{ fontSize: '18px', color: '#555' }}>{teacher.user.fullname}</span>
                  </li>
                ))
              ) : (
                <h2 style={{ color: '#555', fontSize: '18px' }}>There are no teachers</h2>
              )}
            </ul>
            <h2 style={{ color: '#333', borderBottom: '1px solid #ddd', marginTop: '20px' }}>
              Students
            </h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {course.students.length > 0 ? (
                course.students.map((student, index) => (
                  <li key={index} style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
                    <span style={{ fontSize: '18px', color: '#555' }}>{student.user.fullname}</span>
                  </li>
                ))
              ) : (
                <h2 style={{ color: '#555', fontSize: '18px' }}>There are no students</h2>
              )}
            </ul>
          </div>
        )}
        {activeTab === 'Classwork' && (
          <div>
            <h2>Classwork</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
