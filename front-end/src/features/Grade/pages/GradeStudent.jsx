import React, { useEffect, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { GRADE_PAGE_STUDENT_TAB_ENUM, GRADE_PAGE_TAB_ENUM } from 'constant';
import { GradeListStudent, ListReviewRequest } from '../components';
const GradeStudent = () => {
  // end query
  const getSelectedTab = () => {
    const storedTab = localStorage.getItem('selectedGradeStudentTab');
    return JSON.parse(storedTab) || GRADE_PAGE_TAB_ENUM.GRADE_STRUCTURE;
  };

  const [activeTab, setActiveTab] = useState(getSelectedTab());

  useEffect(() => {
    localStorage.setItem('selectedGradeStudentTab', JSON.stringify(activeTab));
  }, [activeTab]);
  const items = [
    {
      label: 'Grade List Of Student',
      icon: 'pi pi-fw pi-sitemap',
      command: () => {
        setActiveTab(GRADE_PAGE_STUDENT_TAB_ENUM.GRADE_LIST_STUDENT);
      },
    },
    {
      label: 'List review request',
      icon: 'pi pi-fw pi-sitemap',
      command: () => {
        setActiveTab(GRADE_PAGE_STUDENT_TAB_ENUM.GRADE_LIST_REVIEW_REQUEST);
      },
    },
  ];

  return (
    <div>
      <TabMenu model={items} activeIndex={Number(activeTab)} />
      <div>
        {activeTab === GRADE_PAGE_STUDENT_TAB_ENUM.GRADE_LIST_STUDENT && <GradeListStudent />}
        {activeTab === GRADE_PAGE_STUDENT_TAB_ENUM.GRADE_LIST_REVIEW_REQUEST && (
          <ListReviewRequest />
        )}
      </div>
    </div>
  );
};

export default GradeStudent;
