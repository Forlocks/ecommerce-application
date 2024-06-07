import React from 'react';
import { IInputBase } from '../InputBase/IInputBase';
import { InputBase } from '../InputBase/InputBase';
import { SmallButton } from '../../buttons/SmallButton/SmallButton';

const editIcon = <img src="./assets/icons/Edit-Icon.png" alt="edit" />;
const saveIcon = (
  <img src="./assets/icons/Save-Icon.png" alt="save" style={{ width: 15, opacity: 0.6 }} />
);

export const DateInput: React.FC<IInputBase> = function (props) {
  return (
    <div className="input__wrapper">
      <InputBase {...props} type="date" />
      {props.editMode && (
        <SmallButton
          onClick={props.onEdit}
          icon={props.disabled ? editIcon : saveIcon}
          style={{ position: 'absolute', right: 40, top: 33 }}
        />
      )}
    </div>
  );
};
