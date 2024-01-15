import React, { useEffect, useMemo, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { GRADE_PAGE_TAB_ENUM } from 'constant';
import { GradeList, GradeListStudent, GradeStructureTable } from '../components';
// import { Toast } from 'primereact/toast';
const CurrentGradeStructure = () => {
  // end query
  const getSelectedTab = () => {
    const storedTab = localStorage.getItem('selectedTab');
    return JSON.parse(storedTab) || GRADE_PAGE_TAB_ENUM.GRADE_STRUCTURE;
  };

  const [activeTab, setActiveTab] = useState(getSelectedTab());

  useEffect(() => {
    localStorage.setItem('selectedTab', JSON.stringify(activeTab));
  }, [activeTab]);

  const isStudent = useMemo(() => JSON.parse(localStorage.getItem('isStudent')), []);
  const items = [
    {
      label: 'Grade Structure',
      icon: 'pi pi-fw pi-sitemap',
      command: () => {
        setActiveTab(GRADE_PAGE_TAB_ENUM.GRADE_STRUCTURE);
      },
    },
  ];

  if (isStudent) {
    items.push({
      label: 'Grade List Student',
      icon: 'pi pi-fw pi-table',
      command: () => {
        setActiveTab(GRADE_PAGE_TAB_ENUM.GRADE_LIST_STUDENT);
      },
    });
  } else {
    items.push({
      label: 'Grade List',
      icon: 'pi pi-fw pi-table',
      command: () => {
        setActiveTab(GRADE_PAGE_TAB_ENUM.GRADE_LIST);
      },
    });
  }

  return (
    <div>
      <TabMenu model={items} activeIndex={Number(activeTab)} />
      <div>
        {activeTab === GRADE_PAGE_TAB_ENUM.GRADE_STRUCTURE && <GradeStructureTable />}
        {activeTab === GRADE_PAGE_TAB_ENUM.GRADE_LIST && !isStudent && <GradeList />}
        {activeTab === GRADE_PAGE_TAB_ENUM.GRADE_LIST_STUDENT && isStudent && <GradeListStudent />}
      </div>
    </div>
  );
};

export default CurrentGradeStructure;
