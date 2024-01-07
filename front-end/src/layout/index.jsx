import PropTypes from 'prop-types';
import React, { useContext, useLayoutEffect, useRef } from 'react';
import AppTopbar from './AppTopbar';
import AppSidebar from './AppSidebar';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { LayoutContext } from './context/layoutcontext';
import { useLocation } from 'react-router-dom';

export let toast;
export default function Layout({ children }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const toastRef = useRef(null);
  const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
  if (currentPath === '/' && layoutState.staticMenuDesktopInactive === false) {
    setLayoutState((prevLayoutState) => ({
      ...prevLayoutState,
      staticMenuDesktopInactive: true,
    }));
  }

  const containerClass = classNames('layout-wrapper', {
    'layout-theme-light': layoutConfig.colorScheme === 'light',
    'layout-theme-dark': layoutConfig.colorScheme === 'dark',
    'layout-overlay': layoutConfig.menuMode === 'overlay',
    'layout-static': layoutConfig.menuMode === 'static',
    'layout-static-inactive':
      layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive,
    'layout-mobile-active': layoutState.staticMenuMobileActive,
    'p-input-filled': layoutConfig.inputStyle === 'filled',
    'p-ripple-disabled': !layoutConfig.ripple,
  });

  useLayoutEffect(() => {
    toast = (mode, detail) =>
      toastRef.current.show({
        severity: mode,
        summary: mode,
        detail,
        life: 3000,
      });
  });
  return (
    <div className={containerClass}>
      <div className='layout-topbar'>
        <AppTopbar />
      </div>
      <div className='layout-sidebar'>
        <AppSidebar />
      </div>
      <div className='layout-main-container'>
        <div className='layout-main'>{children}</div>
      </div>
      <div
        className='layout-mask'
        onClick={() => {
          setLayoutState((prevLayoutState) => ({
            ...prevLayoutState,
            overlayMenuActive: false,
            staticMenuMobileActive: false,
            menuHoverActive: false,
          }));
        }}
      />

      <Toast ref={toastRef} />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
