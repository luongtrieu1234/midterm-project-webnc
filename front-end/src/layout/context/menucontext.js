import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
export const MenuContext = React.createContext();

export function MenuProvider({ children }) {
  const [activeMenu, setActiveMenu] = useState('');

  const value = useMemo(
    () => ({
      activeMenu,
      setActiveMenu,
    }),
    [activeMenu]
  );

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
}

MenuProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
