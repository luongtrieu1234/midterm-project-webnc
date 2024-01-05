import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';
import { useForm } from 'react-hook-form';
import GradeStructureTable from '../components/GradeStructureTable';
import { GRADE_PAGE_TAB_ENUM } from 'constant';
import AddGradeCompositionDialog from '../components/GradeStructureTable/AddGradeCompositionDialog';
import { FooterComfirm } from 'components/FormControl';
// import { Toast } from 'primereact/toast';
const CurrentGradeStructure = () => {
  // eslint-disable-next-line no-unused-vars
  const { classId } = useParams();
  const getSelectedTab = () => {
    const storedTab = localStorage.getItem('selectedTab');
    return JSON.parse(storedTab) || GRADE_PAGE_TAB_ENUM.GRADE_STRUCTURE;
  };

  const [activeTab, setActiveTab] = useState(getSelectedTab());
  const [
    visibleAddGradeCompositionDialog,
    setVisibleAddGradeCompositionDialog,
  ] = useState(false);

  useEffect(() => {
    localStorage.setItem('selectedTab', JSON.stringify(activeTab));
  }, [activeTab]);
  const items = [
    {
      label: 'Grade Structure',
      icon: 'pi pi-fw pi-sitemap',
      command: () => {
        setActiveTab(GRADE_PAGE_TAB_ENUM.GRADE_STRUCTURE);
      },
    },
    {
      label: 'Grade List',
      icon: 'pi pi-fw pi-table',
      command: () => {
        setActiveTab(GRADE_PAGE_TAB_ENUM.GRADE_LIST);
      },
    },
  ];

  const {
    control,
    handleSubmit,
    // reset,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Data:', data);
  };

  const footerComfirm = (
    <FooterComfirm
      action='Save'
      setVisible={setVisibleAddGradeCompositionDialog}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
  return (
    <div>
      <TabMenu model={items} activeIndex={Number(activeTab)} />
      <div>
        {activeTab === GRADE_PAGE_TAB_ENUM.GRADE_STRUCTURE && (
          <GradeStructureTable
            setVisibleAddGradeCompositionDialog={
              setVisibleAddGradeCompositionDialog
            }
          />
        )}
        {activeTab === GRADE_PAGE_TAB_ENUM.GRADE_LIST && <div>abc</div>}
      </div>
      <AddGradeCompositionDialog
        visible={visibleAddGradeCompositionDialog}
        setVisible={setVisibleAddGradeCompositionDialog}
        control={control}
        footer={footerComfirm}
      />
    </div>
  );
};

export default CurrentGradeStructure;
