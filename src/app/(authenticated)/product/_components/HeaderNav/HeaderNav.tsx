import React from "react";

const HeaderNav = () => {
  return (
    <div className="flex items-center gap-x-3 h-full">
      <p>i1</p>
      <p>i2</p>
      <p>i3</p>
      <div className="flex items-center gap-x-2">
        <div className="w-12 h-12 rounded-full bg-blue-200" />
        <div className="flex flex-col">
          <p className="leading-6 font-semibold">Nama</p>
          <p className="leading-6 text-xs">Roles</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
