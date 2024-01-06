import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';
import { useForm } from 'react-hook-form';
import { GRADE_PAGE_TAB_ENUM, TOAST } from 'constant';
import AddGradeCompositionDialog from '../components/GradeStructureTable/AddGradeCompositionDialog';
import { FooterComfirm } from 'components/FormControl';
import { useMutation, useQuery } from 'react-query';
import { addGradeComposition, getGradeStructure } from 'apis/grade.api';
import { toast } from 'layout';
import { GradeList, GradeStructureTable } from '../components';
// import { Toast } from 'primereact/toast';
const CurrentGradeStructure = () => {
  const { classId } = useParams();
  // query
  const {
    mutate: addGradeCompositionMutate,
    isLoading: isAddGradeCompositionLoading,
    isSuccess: isAddGradeCompositionSuccess,
  } = useMutation({
    mutationFn: addGradeComposition,
  });
  const {
    data: gradeStructureData,
    // isLoading: isGradeStructureLoading,
    refetch,
  } = useQuery(
    ['gradeStructureData', classId],
    () => getGradeStructure(classId),
    { enabled: !!classId }
  );
  const gradeStructure = useMemo(
    () => gradeStructureData?.data,
    [gradeStructureData]
  );
  console.log('gradeStructure:', gradeStructure);
  // end query
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
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log('Data:', data);
    addGradeCompositionMutate(
      {
        classId: classId,
        name: data?.gradeComposition,
        gradeScale: data?.gradeScale,
      },
      {
        onSuccess() {
          toast(TOAST.SUCCESS, 'Add grade composition successfully!');
        },
        onError() {
          toast(TOAST.ERROR, 'Server error!');
        },
      }
    );
  };

  const footerComfirm = (
    <FooterComfirm
      isLoading={isAddGradeCompositionLoading}
      action='Save'
      setVisible={setVisibleAddGradeCompositionDialog}
      handleSubmit={handleSubmit(onSubmit)}
    />
  );
  useEffect(() => {
    if (isAddGradeCompositionSuccess) {
      setVisibleAddGradeCompositionDialog(false);
      refetch();
    }
  }, [isAddGradeCompositionSuccess]);
  return (
    <div>
      <TabMenu model={items} activeIndex={Number(activeTab)} />
      <div>
        {activeTab === GRADE_PAGE_TAB_ENUM.GRADE_STRUCTURE && (
          <GradeStructureTable
            data={gradeStructure}
            setVisibleAddGradeCompositionDialog={
              setVisibleAddGradeCompositionDialog
            }
          />
        )}
        {activeTab === GRADE_PAGE_TAB_ENUM.GRADE_LIST && (
          <GradeList
            data={gradeStructure}
            setVisibleAddGradeCompositionDialog={
              setVisibleAddGradeCompositionDialog
            }
          />
        )}
      </div>

      {/*begin AddGradeCompositionDialog  */}
      <AddGradeCompositionDialog
        visible={visibleAddGradeCompositionDialog}
        setVisible={setVisibleAddGradeCompositionDialog}
        control={control}
        errors={errors}
        footer={footerComfirm}
      />
      {/*end AddGradeCompositionDialog  */}
    </div>
  );
};

export default CurrentGradeStructure;
