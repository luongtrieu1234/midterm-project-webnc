import { FooterComfirm } from 'components/FormControl';
import { TOAST } from 'constant';
import { toast } from 'layout';
import React from 'react';

export function handleDownloadSuccess(res, fileName = 'default.txt') {
  const contentDispositionHeader = res.headers['content-disposition'];
  const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(contentDispositionHeader);
  const filename = matches && matches[1] ? matches[1] : fileName;
  if (res?.data) {
    const file = new Blob([res.data]);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = filename || fileName;
    document.body.appendChild(link);
    link.click();
  }
}

export function handleDownloadError() {
  toast(TOAST.ERROR, 'API Error ');
}

export function footerComfirm({ setVisible, handleSubmit, isLoading }) {
  return (
    <FooterComfirm
      isLoading={isLoading || false}
      action='Save'
      setVisible={setVisible}
      handleSubmit={handleSubmit}
    />
  );
}
