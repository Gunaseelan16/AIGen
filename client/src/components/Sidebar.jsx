import { Protect, useClerk, useUser } from '@clerk/clerk-react';
import React from 'react';
import { House, SquarePen, Image as ImageIcon, Video, Eraser, Scissors, Users, LogOut } from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const navItems = [
  { to: '/ai', label: 'Dashboard', icon: House },
  { to: '/ai/Write-article', label: 'Write Article', icon: SquarePen },
  { to: '/ai/generate-image', label: 'Generate Images', icon: ImageIcon },
  { to: '/ai/video-Gen', label: 'Generate Video', icon: Video },
  { to: '/ai/remove-background', label: 'Remove Background', icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', icon: Scissors },
  { to: '/ai/community', label: 'Community', icon: Users }
];

const Sidebar = ({ Sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between max-sm:absolute top-14 bottom-0 ${
        Sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
      } transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full">
        <div className="flex flex-col items-center mb-6">
          <img src={user.imageUrl} alt="User" className="w-16 h-16 rounded-full" />
          <h1 className="mt-1 text-center text-sm font-medium">{user.fullName}</h1>
        </div>
        <div className="flex flex-col gap-1 px-2">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/ai'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3 py-2 flex items-center gap-2 rounded text-sm font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </div>
      </div>

  <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
      <div onClick={openUserProfile} className='flex gap-2 items-center cursor-pointer'>
        <img src={user.imageUrl} className='w-8 rounded-full' alt='' />
        <div>
            <h1 className='text-sm font-medium'>{user.fullName}</h1>
            <p className='text-xs text-gray-500'>
                <Protect plan='premium' fallback='free'>Premium</Protect>plan
            </p>
        </div>
      </div>
      <LogOut onClick={signOut} className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'/>
  </div>

    </div>
  );
};

export default Sidebar;
