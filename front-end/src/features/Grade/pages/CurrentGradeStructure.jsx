import React, { useEffect, useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { GRADE_PAGE_TAB_ENUM } from 'constant';
import { GradeList, GradeStructureTable } from '../components';
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

  return (
    <div>
      <TabMenu model={items} activeIndex={Number(activeTab)} />
      <div>
        {activeTab === GRADE_PAGE_TAB_ENUM.GRADE_STRUCTURE && (
          <GradeStructureTable />
        )}
        {activeTab === GRADE_PAGE_TAB_ENUM.GRADE_LIST && <GradeList />}
      </div>
    </div>
  );
};

export default CurrentGradeStructure;
