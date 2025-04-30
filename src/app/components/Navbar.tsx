"use client";
import Link from "next/link";
import React from "react";
import { Switch } from "antd";
import LocaleSwitcher from "./LocaleSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

export const Navbar = () => {

  return (
    <div className="w-full bg-white">
      <div className="bg-[#08468A] flex justify-center items-center gap-3 h-14">
        <div className="w-full grid grid-cols-1 md:grid-cols-3">
          <div>
            
          </div>
          <div className="w-full flex justify-center items-center gap-4">
            <Link href="/">Home</Link>
            <Link href="/zicure">Zicure</Link>
            <Link href="/testapi">testapi</Link>
          </div>
          <div className="flex items-center gap-3">
            {/* <span>ไทย</span>
            <Switch
              className="ant-switch-checked:bg-transparent ant-switch:bg-transparent"
              defaultChecked={localStorage.getItem('lang') === 'en'}
              onChange={onChange}
            />
            <span>English</span> */}
            <ThemeSwitcher/>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};