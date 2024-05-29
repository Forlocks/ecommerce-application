import React from 'react';

export interface IModal {
  isShow: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}
