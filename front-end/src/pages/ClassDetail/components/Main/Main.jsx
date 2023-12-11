import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { TabMenu } from 'primereact/tabmenu';
import { useForm, Controller } from 'react-hook-form';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useMutation } from 'react-query';
import { inviteTeacherToClass, inviteStudentToClass } from 'apis/class.api';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
// import { Toast } from 'primereact/toast';
const Main = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('Infor Class');
  const [visibleAddTeacherDialog, setVisibleAddTeacherDialog] = useState(false);
  const [visibleAddStudentDialog, setVisibleAddStudentDialog] = useState(false);
  const { mutate: inviteTeacherMutate, isLoading: isInviteTeacherLoading } =
    useMutation(inviteTeacherToClass);
  const { mutate: inviteStudentMutate, isLoading: isInviteStudentLoading } =
    useMutation(inviteStudentToClass);
  const toast = useRef(null);
  const showSuccess = () => {
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Sent mail invite to user!',
      life: 3000,
    });
  };
  // const showError = () => {
  //   toast.current.show({
  //     severity: 'error',
  //     summary: 'Error',
  //     detail: 'Class created error',
  //     life: 3000,
  //   });
  // };
  const {
    control,
    handleSubmit,
    // reset,
    // formState: { errors },
  } = useForm();

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

  const addTeacherToClass = async (data) => {
    console.log(data);
    inviteTeacherMutate(
      { classId: id, name: course.name, email: data.email },
      {
        onSuccess() {
          showSuccess();
          setVisibleAddTeacherDialog(false);
        },
      }
    );
  };

  const addStudentToClass = async (data) => {
    console.log(data);
    inviteStudentMutate(
      { classId: id, name: course.name, email: data.email },
      {
        onSuccess() {
          console.log('success');
          showSuccess();
          setVisibleAddStudentDialog(false);
        },
      }
    );
  };

  const Action = (
    <div>
      <Button
        label='Cancel'
        icon='pi pi-times'
        onClick={() => setVisibleAddTeacherDialog(false)}
        className='p-button-text'
      />
      <Button
        label='Create'
        icon={classNames('pi pi-check', {
          'pi-spin pi-spinner': isInviteTeacherLoading,
          'pi pi-check': !isInviteTeacherLoading,
        })}
        onClick={handleSubmit(addTeacherToClass)}
        autoFocus
      />
    </div>
  );

  const Action2 = (
    <div>
      <Button
        label='Add'
        icon='pi pi-times'
        onClick={() => setVisibleAddStudentDialog(false)}
        className='p-button-text'
      />
      <Button
        label='Add'
        icon={classNames('pi pi-check', {
          'pi-spin pi-spinner': isInviteStudentLoading,
          'pi pi-check': !isInviteStudentLoading,
        })}
        onClick={handleSubmit(addStudentToClass)}
        autoFocus
      />
    </div>
  );
  return (
    <div>
      <Toast ref={toast} />

      <TabMenu model={items} />
      <div>
        {activeTab === 'Infor Class' && course && (
          <div>
            <h2>{course.name}</h2>
          </div>
        )}
        {activeTab === 'People' && (
          <div style={{ margin: '0 auto', maxWidth: '600px', fontFamily: 'Arial, sans-serif' }}>
            <h2
              className='flex align-items-center justify-content-between '
              style={{ color: '#333', borderBottom: '1px solid #ddd' }}
            >
              <span className=''>Teachers</span>
              <div className='card flex'>
                <Button size='small' label='Add' onClick={() => setVisibleAddTeacherDialog(true)} />
              </div>
            </h2>
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
            <h2
              className='flex align-items-center justify-content-between '
              style={{ color: '#333', borderBottom: '1px solid #ddd', marginTop: '20px' }}
            >
              <span className=''>Students</span>
              <div className='card flex'>
                <Button size='small' label='Add' onClick={() => setVisibleAddStudentDialog(true)} />
              </div>
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

      {/* <Toast ref={toast} /> */}
      <div className='card flex justify-content-center ml-6 mb-2'>
        <Dialog
          header='Add teacher'
          visible={visibleAddTeacherDialog}
          style={{ width: '50vw' }}
          onHide={() => setVisibleAddTeacherDialog(false)}
          footer={Action}
        >
          <p className='mb-3'>Email's Teacher</p>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            rules={{ required: 'This field is required' }}
            render={({ field }) => <InputText {...field} style={{ width: '70%' }} />}
          />
          {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
        </Dialog>
      </div>
      <div className='card flex justify-content-center ml-6 mb-2'>
        <Dialog
          header='Add Student'
          visible={visibleAddStudentDialog}
          style={{ width: '50vw' }}
          onHide={() => setVisibleAddStudentDialog(false)}
          footer={Action2}
        >
          <p className='mb-3'>Email's Student</p>
          <Controller
            name='email'
            control={control}
            defaultValue=''
            rules={{ required: 'This field is required' }}
            render={({ field }) => <InputText {...field} style={{ width: '70%' }} />}
          />
          {/* {errors.name && <p className='text-red-500'>{errors.name.message}</p>} */}
        </Dialog>
      </div>
    </div>
  );
};

export default Main;
