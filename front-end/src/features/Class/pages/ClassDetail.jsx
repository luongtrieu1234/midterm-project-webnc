import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link, useParams } from 'react-router-dom';
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
const ClassDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [link, setLink] = useState(null);
  const [open, setOpen] = useState(false);
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
      label: 'Stream',
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
    const fetchLink = async () => {
      try {
        const token = localStorage.getItem('token'); // get token from local storage
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/class/class-link?classId=${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLink(response.data);
      } catch (error) {
        console.error('Failed to fetch course details:', error);
      }
    };

    fetchCourseDetail();
    fetchLink();
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
        label='Add'
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
      <div className='card flex mt-3 mb-3 gap-3'>
        <Button label='Class invitation' icon='pi pi-external-link' onClick={() => setOpen(true)} />
        <Link to={`/course/${id}/grade`}>
          <Button label='Grade' icon='pi pi-external-link' />
        </Link>
        <Dialog
          header='Class invitation'
          visible={open}
          style={{ width: '40vw' }}
          onHide={() => setOpen(false)}
        >
          <CopyToClipboard text={link}>
            <Button className='ml-4'>Copy Link </Button>
          </CopyToClipboard>
        </Dialog>
      </div>

      <TabMenu model={items} />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        {/* Infor class */}
        {activeTab === 'Infor Class' && course && (
          <div className='mr-8'>
            <div
              style={{
                backgroundColor: 'rgba(110, 107, 241, 0.2)',
                width: '70vw',
                height: '40vh',
                border: '1px solid #',
                borderRadius: '5px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: '2rem',
              }}
            >
              <h2 className='mx-4 my-3'>{course.name}</h2>
              <h3 className='mx-4 my-3'>
                Course Code: <span style={{ color: '#555' }}>{course.classCode}</span>
              </h3>
              <h3 className='mx-4 my-3'>
                Course description: <span style={{ color: '#555' }}>{course.description}</span>
              </h3>
            </div>
            <h3 className='mx-4 my-3'>List post of class</h3>
          </div>
        )}

        {/* People */}
        {activeTab === 'People' && (
          <div
            style={{
              // margin: '0 auto',
              maxWidth: '100%',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            <h2
              className='flex align-items-center justify-content-between '
              style={{ color: '#333', borderBottom: '1px solid #6E6BF1' }}
            >
              <span style={{ fontSize: '25px', color: '#6E6BF1' }}>Teachers</span>
              <div className='card flex ' style={{ marginLeft: '30rem' }}>
                <Button
                  size='small'
                  label='Add Teacher'
                  onClick={() => setVisibleAddTeacherDialog(true)}
                />
              </div>
            </h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {course.teachers.length > 0 ? (
                course.teachers.map((teacher, index) => (
                  <li
                    key={index}
                    style={{
                      padding: '10px 0',
                      borderBottom: '1px solid #ddd',
                      marginBottom: '20px',
                    }}
                  >
                    <span style={{ fontSize: '18px', color: '#555' }}>
                      {teacher.user?.fullname}
                    </span>
                  </li>
                ))
              ) : (
                <h2 style={{ color: '#555', fontSize: '18px' }}>There are no teachers</h2>
              )}
            </ul>
            <h2
              className='flex align-items-center justify-content-between '
              style={{
                color: '#333',
                borderBottom: '1px solid #6E6BF1',
                marginTop: '20px',
              }}
            >
              <span style={{ fontSize: '25px', color: '#6E6BF1' }}>Students</span>
              <div className='card flex'>
                <Button
                  size='small'
                  label='Add Student'
                  onClick={() => setVisibleAddStudentDialog(true)}
                />
              </div>
            </h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {course.students.length > 0 ? (
                course.students.map((student, index) => (
                  <li
                    key={index}
                    style={{
                      padding: '10px 0',
                      borderBottom: '1px solid #ddd',
                    }}
                  >
                    <span style={{ fontSize: '18px', color: '#555' }}>
                      {student.user?.fullname}
                    </span>
                  </li>
                ))
              ) : (
                <h2 style={{ color: '#555', fontSize: '18px' }}>There are no students</h2>
              )}
            </ul>
          </div>
        )}

        {/* Class work */}
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

export default ClassDetail;
