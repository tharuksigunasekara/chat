import React from "react";

function UserOnline({ nickname }) {
  return (
    <li className='w-full flex justify-start pl-1 py-2 hover:bg-purple-50 hover:text-black cursor-pointer '>
      <div className='flex items-center'>
        <div className='block pr-2'>
          <img
            alt='avatar'
            src='https://openclipart.org/image/2400px/svg_to_png/181856/1376606916.png'
            className='rounded-full h-10 w-10 '
          />
        </div>
        <p className='w-36 truncate text-left'>{nickname}</p>
      </div>
    </li>
  );
}

export default UserOnline;
