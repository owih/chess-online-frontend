import * as React from 'react';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import ModalSettings from '../Modals/ModalSettings/ModalSettings';

export default function UserInfoPanel() {
  const { data, error, isLoading } = useGetUserInfo();

  return (
    <div>
      {error && 'Something went wrong'}
      {isLoading && 'Loading'}
      <div>
        {data && data.id}
      </div>
      <div>
        {data && data.name}
      </div>
      <div>
        Photo (future)
      </div>
      <ModalSettings />
    </div>
  );
}
