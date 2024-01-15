// @ts-nocheck
import React, { useCallback } from 'react';
import { useEffect, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { Dialog } from 'primereact/dialog';
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Tooltip } from 'primereact/tooltip';
import { footerComfirm } from 'utils/func';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { uploadFileUserList } from 'apis/admin.api';
import { toast } from 'layout';
import { TOAST } from 'constant';
import AddFileUserListDialog from '../components/Mapping/AddFileUserListDialog';

function HomePageAdmin() {
  // Items for the tab menu
  const items = [
    { label: 'Manage Accounts', icon: 'pi pi-users', command: () => setActiveItem(0) },
    { label: 'Manage Classes', icon: 'pi pi-server', command: () => setActiveItem(1) },
    { label: 'Mapping', icon: 'pi pi-code', command: () => setActiveItem(2) },
  ];

  // Options for the filter dropdown
  const Options = [
    { name: 'All', code: 'all' },
    { name: 'Active', code: 'active' },
    { name: 'Inactive', code: 'inactive' },
  ];

  // Local state
  const [userList, setUserList] = useState([]);
  const [classList, setClassList] = useState([]);
  const [activeItem, setActiveItem] = useState(0);
  const [filterOption, setFilterOption] = useState(null);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [studentIdInput, setStudentIdInput] = useState('');
  const [visibleAddFileUserListDialog, setVisibleAddFileUserListDialog] = useState(false);
  const { mutate: uploadFileUserListMutate, isLoading: isUploadFileUserListLoading } =
    useMutation(uploadFileUserList);
  const fetchUserList = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/all-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setUserList(response.data.users);
      } else {
        console.log('Error occurred while fetching user list');
      }
    } catch (error) {
      console.error('An error occurred while fetching the user list:', error);
    }
  }, []);
  const fetchClassList = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin/all-classes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          filterOption: filterOption
            ? filterOption.map((option) => option.code).join(',')
            : undefined,
        },
      });
      if (response.status === 200) {
        setClassList(response.data);
      } else {
        console.log('Error occurred while fetching class list');
      }
    } catch (error) {
      console.error('An error occurred while fetching the class list:', error);
    }
  }, []);
  // Fetch the user list and class list when the component is mounted
  useEffect(() => {
    fetchUserList();
    fetchClassList();
    if (filterOption) {
      fetchClassList();
    }
  }, [filterOption]);

  //Header for each tab
  const headerAccounts = (
    <div className='flex flex-wrap align-items-center justify-content-between gap-2'>
      <span className='text-xl text-900 font-bold'>Acounts</span>
    </div>
  );
  const headerClasses = (
    <div className='flex flex-wrap align-items-center justify-content-between gap-2'>
      <span className='text-xl text-900 font-bold'>Classes</span>
      <div className='card flex justify-content-center'>
        <MultiSelect
          value={filterOption}
          onChange={(e) => setFilterOption(e.value)}
          options={Options}
          optionLabel='name'
          placeholder='Select a filter option'
          maxSelectedLabels={2}
          className='w-full md:w-20rem'
        />
      </div>
    </div>
  );
  //form
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  function headerMapping() {
    return (
      <div className='flex align-items-center justify-content-between'>
        <div className='text-xl'>Grade List</div>
        <div className='card'>
          <Tooltip target='.add-grade-composition' className='text-sm' />
          <Button
            className='add-grade-composition'
            icon='pi pi-plus '
            data-pr-tooltip='Mapping user'
            data-pr-position='left'
            onClick={() => setVisibleAddFileUserListDialog(true)}
          />
        </div>
      </div>
    );
  }
  const footerComfirmAddFileUserList = footerComfirm({
    setVisible: setVisibleAddFileUserListDialog,
    handleSubmit: handleSubmit(onAddUserExcelFileSubmit),
    isLoading: isUploadFileUserListLoading,
  });

  async function onAddUserExcelFileSubmit(data) {
    const addUserListExcelFileSubmitFormData = new FormData();
    addUserListExcelFileSubmitFormData.append('excelFile', data.userListFile);
    uploadFileUserListMutate(addUserListExcelFileSubmitFormData, {
      onSuccess() {
        toast(TOAST.SUCCESS, 'User list upload successfully!');
        setVisibleAddFileUserListDialog(false);
        reset();
        fetchUserList();
      },
      onError() {
        toast(TOAST.ERROR, 'User list upload srror!');
      },
    });
  }
  //Template for active status account
  const activeStatusTemplateAccount = (rowData) => {
    return (
      <Button
        className={rowData.active ? 'p-button-success' : 'p-button-danger'}
        label={rowData.active ? 'Active' : 'Inactive'}
        onClick={() => toggleActiveStatusAccount(rowData)}
      />
    );
  };
  const toggleActiveStatusAccount = async (rowData) => {
    const url = rowData.active
      ? `${process.env.REACT_APP_API_URL}/admin/inactivate-account/${rowData._id}`
      : `${process.env.REACT_APP_API_URL}/admin/activate-account/${rowData._id}`;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Update the local state to reflect the new status
        setUserList(
          userList.map((user) =>
            user._id === rowData._id ? { ...user, active: !user.active } : user
          )
        );
      }
    } catch (error) {
      console.error('An error occurred while toggling the active status:', error);
    }
  };

  //Template for active status class
  const activeStatusTemplateClass = (rowData) => {
    return (
      <Button
        className={rowData.active ? 'p-button-success' : 'p-button-danger'}
        label={rowData.active ? 'Active' : 'Inactive'}
        onClick={() => toggleActiveStatusClass(rowData)}
      />
    );
  };
  const toggleActiveStatusClass = async (rowData) => {
    const url = rowData.active
      ? `${process.env.REACT_APP_API_URL}/admin/inactivate-class/${rowData._id}`
      : `${process.env.REACT_APP_API_URL}/admin/activate-class/${rowData._id}`;
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Update the local state to reflect the new status
        setClassList(
          classList.map((user) =>
            user._id === rowData._id ? { ...user, active: !user.active } : user
          )
        );
      }
    } catch (error) {
      console.error('An error occurred while toggling the active status:', error);
    }
  };

  //Template for action mapping
  const renderActionMapping = (rowData) => {
    const handleUnmapClick = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/admin/unmap-student/${rowData._id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log('data', response.data);
        }
        // Thêm mã xử lý sau khi gọi API thành công tại đây
      } catch (error) {
        console.error(error);
        // eslint-disable-next-line no-undef
        fetchUserList();
      }
    };
    const handleAddClick = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/admin/map-student/${rowData._id}/${studentIdInput}`,
          { studentId: studentIdInput },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          console.log('data', response.data);
          setDialogVisible(false);
          // eslint-disable-next-line no-undef
          fetchUserList(); // Update the user list
        }
      } catch (error) {
        console.error(error);
      }
    };
    return rowData.studentId ? (
      <Button className={'p-button-success'} onClick={handleUnmapClick}>
        Maped
      </Button>
    ) : (
      <>
        <Button className={'p-button-danger'} onClick={() => setDialogVisible(true)}>
          Unmap
        </Button>
        <Dialog
          header='Add Student ID'
          visible={dialogVisible}
          onHide={() => setDialogVisible(false)}
        >
          <InputText
            type='text'
            className='w-full'
            value={studentIdInput}
            onChange={(e) => setStudentIdInput(e.target.value)}
          />
          <Button onClick={handleAddClick} className='mt-4'>
            Add
          </Button>
        </Dialog>
      </>
    );
  };

  //Format date
  const formatDate = (rowData) => {
    let date = new Date(rowData.createdAt);
    return `${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  return (
    <>
      <div className='card'>
        <TabMenu model={items} activeItem={activeItem} />
        {activeItem === 0 && (
          <DataTable value={userList} header={headerAccounts} scrollable scrollHeight='450px'>
            <Column field='fullname' header='User Name'></Column>
            <Column field='email' header='Email'></Column>
            <Column field='phone' header='Phone Number'></Column>
            <Column field='role' header='Role'></Column>
            <Column field='active' header='Active' body={activeStatusTemplateAccount}></Column>
          </DataTable>
        )}
        {activeItem === 1 && (
          <DataTable value={classList} header={headerClasses} scrollable scrollHeight='450px'>
            <Column field='name' header='Class Name'></Column>
            <Column field='owner.fullname' header='Owner'></Column>
            <Column field='classCode' header='Class Code'></Column>
            <Column field='createdAt' sortable header='Create Time' body={formatDate}></Column>
            <Column field='active' header='Active' body={activeStatusTemplateClass}></Column>
          </DataTable>
        )}
        {activeItem === 2 && (
          <DataTable value={userList} header={headerMapping} scrollable scrollHeight='450px'>
            <Column field='fullname' header='Username'></Column>
            <Column field='email' header='Email'></Column>
            <Column field='studentId' header='Student ID'></Column>
            <Column header='Action' body={renderActionMapping}></Column>
          </DataTable>
        )}
      </div>
      <AddFileUserListDialog
        visible={visibleAddFileUserListDialog}
        setVisible={setVisibleAddFileUserListDialog}
        control={control}
        errors={errors}
        footer={footerComfirmAddFileUserList}
      />
    </>
  );
}

export default HomePageAdmin;
