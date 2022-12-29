import Logo from '@components/common/logo';
import React from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useUI } from 'src/context/uicontext';

function UserinfowithAvatar(props: any) {
  return (
    <div className="flex items-center mx-8">
      <div className="flex-col items-center justify-center mx-2">
        {/* welcome */}
        <p className="font-semibold text-sm text-coolGray-600">Welcome</p>
        {/* name */}
        <p className="font-semibold text-xs text-coolGray-400 text-center">{props.userDetails?.firstName + ' ' + props.userDetails?.lastName}</p>
      </div>
      {/* avatar */}
      <div className="shadow-md p-2 rounded-full mx-2">
        <img className="h-8 w-8 " src={`https://avatars.dicebear.com/api/open-peeps/${props.userDetails?.firstName + props.userDetails?.lastName}.svg`} alt="" />
      </div>
    </div>
  );
}

const Header = () => {
  const { userDetails } = useUI();

  return (
    <div className="h-16 w-full items-center flex px-4 shadow justify-between">
      <AiOutlineMenu size={26} />
      {/* user */}
      {userDetails && <UserinfowithAvatar userDetails={userDetails} />}
    </div>
  );
};

export default Header;
