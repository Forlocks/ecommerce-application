import React from 'react';
import { InputBase } from '../InputBase/InputBase';
import { IPasswordInput } from './IPasswordInput';
import { SmallButton } from '../../buttons/SmallButton/SmallButton';

const hideEyeIcon = <img src="./assets/icons/eye-hide.svg" alt="Big image" />;
const showEyeIcon = <img src="./assets/icons/eye-open.svg" alt="Big image" />;
const editIcon = <img src="./assets/icons/Edit-Icon.png" alt="edit" />;
const saveIcon = (
  <img src="./assets/icons/Save-Icon.png" alt="save" style={{ width: 15, opacity: 0.6 }} />
);

export const PasswordInput: React.FC<IPasswordInput> = function ({
  showPassword,
  togglePasswordVisibility,
  oldPassword,
  newPassword,
  onOldPasswordChange,
  onNewPasswordChange,
  newPasswordError,
  showNewPassword,
  toggleNewPasswordVisibility,
  ...props
}) {
  if (!props.editMode) {
    return (
      <>
        <div className="password">
          <InputBase {...props} type={showPassword ? 'text' : 'password'} />
          {props.disabled || (
            <SmallButton
              onClick={togglePasswordVisibility}
              icon={showPassword ? hideEyeIcon : showEyeIcon}
              style={{ position: 'absolute', right: 16, top: 33 }}
            />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <>
        <div className="password">
          <InputBase
            {...props}
            placeholder={!props.disabled ? 'old password' : '********'}
            type={showPassword ? 'text' : 'password'}
            value={oldPassword as string}
            onChange={onOldPasswordChange as () => void}
          />
          {props.disabled || (
            <SmallButton
              onClick={togglePasswordVisibility}
              icon={showPassword ? hideEyeIcon : showEyeIcon}
              style={{ position: 'absolute', right: 36, top: 33 }}
            />
          )}
          {props.editMode && props.disabled && (
            <SmallButton
              onClick={props.onEdit}
              icon={props.disabled ? editIcon : saveIcon}
              style={{ position: 'absolute', right: 16, top: 33 }}
            />
          )}
        </div>
      </>
      {!props.disabled && props.editMode && (
        <>
          <div className="password">
            <InputBase
              {...props}
              placeholder="new password"
              type={showNewPassword ? 'text' : 'password'}
              value={newPassword as string}
              onChange={onNewPasswordChange as () => void}
              error={newPasswordError}
            />
            <SmallButton
              onClick={toggleNewPasswordVisibility}
              icon={showNewPassword ? hideEyeIcon : showEyeIcon}
              style={{ position: 'absolute', right: 36, top: 33 }}
            />
            {props.editMode && (
              <SmallButton
                onClick={props.onEdit}
                icon={props.disabled ? editIcon : saveIcon}
                style={{ position: 'absolute', right: 10, top: 33 }}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};
