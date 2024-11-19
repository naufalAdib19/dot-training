import React from "react";
import {
  MailOutlined,
  ClockCircleOutlined,
  BellOutlined,
  DownOutlined,
} from "@ant-design/icons";

const HeaderNav = () => {
  return (
    <div className="flex items-center gap-x-4 h-full">
      <span className="hidden md:flex md:items-center md:gap-x-4">
        <MailOutlined
          className="hover:cursor-pointer"
          style={{ fontSize: "150%" }}
        />
        <ClockCircleOutlined
          className="hover:cursor-pointer"
          style={{ fontSize: "150%" }}
        />
        <BellOutlined
          className="hover:cursor-pointer"
          style={{ fontSize: "150%" }}
        />
      </span>

      <div className="flex items-center gap-x-2">
        <div className="w-12 h-12 rounded-full bg-blue-200" />
        <div className="flex flex-col">
          <p className="leading-5 font-bold">PAMA OTC</p>
          <p className="leading-5 text-xs">admin</p>
        </div>
      </div>
      <DownOutlined
        className="hover:cursor-pointer"
        style={{ fontSize: "100%" }}
      />
    </div>
  );
};

export default HeaderNav;
