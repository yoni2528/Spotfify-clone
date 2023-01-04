import React, { useEffect, useState } from 'react';
import { IconType } from 'react-icons/lib';
import { Link, useLocation } from 'react-router-dom';

const MenuItem: React.FC<{
  Icon: IconType;
  title: string;
}> = ({ Icon, title }) => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (location.pathname === `/${title.toLowerCase()}`) {
      setIsActive(true);
    }
  }, [location]);

  return (
    <li className="flex gap-4 items-center">
      <Icon className=" w-6 h-6" />
      <Link className={`${isActive ? 'text-[#1ED760]' : 'hover:text-white'}  font-medium`} to={`/${title.toLowerCase()}`}>
        {title}
      </Link>
    </li>
  );
};

export default MenuItem;
