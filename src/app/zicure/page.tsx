"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Pagination from "../components/Pagination";
import { User, OptionsSex } from "./type";
import { useTranslations } from "next-intl";
// import { getTranslations } from "next-intl/server";

export default function page() {
  const t = useTranslations();

  // const t = getTranslations();
  const [formData, setFormData] = useState<User>({
    id: 0,
    firstname: "",
    lastname: "",
    age: "",
    job: "",
    sex: "",
  });

  const [optionsSex, setOptionsSex] = useState<OptionsSex[]>([]);

  useEffect(() => {
    const newSexOptions: OptionsSex[] = [
      { sex: "", name: `${t("select-default")}` },
      { sex: "Male", name: `${t("select-male")}` },
      { sex: "Female", name: `${t("select-female")}` },
      { sex: "LGBTQ", name: `${t("select-lgbtq")}` },
    ];

    setOptionsSex(newSexOptions); // รีเซ็ตค่าเมื่อ locale เปลี่ยน
  }, [t]); // จะรีเฟรชค่าเมื่อ locale หรือ t เปลี่ยน

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("user") || "[]")
    setUsers(userdata);
  }, []);

  const [editId, setEditId] = useState<number | null>(null); // ใช้เก็บ `id` ของข้อมูลที่กำลังแก้ไข
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "age" && !validateAge(value)) {
      // alert('กรุณากรอกอายุเป็นตัวเลขและไม่มีเลข 0 ด้านหน้า');
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = () => {
    setFormData({
      id: 0,
      firstname: "",
      lastname: "",
      age: "",
      job: "",
      sex: "",
    });
    setEditId(null); // ออกจากโหมดแก้ไข
  };

  const handleEdit = (id: number) => {
    const userToEdit = users.find((user) => user.id === id);
    if (userToEdit) {
      setFormData(userToEdit);
      setEditId(id); // บันทึก id ที่กำลังแก้ไข
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "เมื่อกดลบแล้วจะไม่สามารถกู้คืนได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        localStorage.setItem("user", JSON.stringify(updatedUsers));

        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลสำเร็จ!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.firstname ||
      !formData.lastname ||
      !formData.age ||
      !formData.job
      // || formData.sex === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบ!",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    if (editId !== null) {
      const updatedUsers = users.map((user) =>
        user.id === editId ? formData : user
      );
      setUsers(updatedUsers);
      localStorage.setItem("user", JSON.stringify(updatedUsers));

      Swal.fire({
        icon: "success",
        title: "อัปเดตข้อมูลเรียบร้อย!",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      const newEntry = {
        ...formData,
        id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
      }; // สร้าง ID ใหม่
      const newdata = [...users, newEntry];
      setUsers(newdata);
      localStorage.setItem("user", JSON.stringify(newdata));

      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ!",
        timer: 2000,
        showConfirmButton: false,
      });
    }
    // รีเซ็ตฟอร์ม
    setFormData({
      id: 0,
      firstname: "",
      lastname: "",
      age: "",
      job: "",
      sex: "",
    });
    setEditId(null); // ออกจากโหมดแก้ไข
  };

  //   useEffect(() => {
  //     console.log(formData);
  //   }, [formData]);

  const validateAge = (value: string): boolean => {
    if (value === "") return true;
    const regex = /^[1-9]\d*$/;
    return regex.test(value);
  };

  return (
    <div className="w-screen h-screen bg-[#F6F9FC] dark:bg-gray-800">
      <div className="max-w-3xl mx-auto pt-10">
        <div className="flex justify-center py-10">
          <div>
            {/* <h1>{t("save", { name: "แน็ก" })}</h1> */}
            <h1></h1>
          </div>
          <form
            className="flex flex-col sm:flex-row gap-2 px-2"
            action=""
            onSubmit={handleSave}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-row items-center gap-2">
                <label className="w-2/6 sm:w-2/6 text-right text-base text-black dark:text-slate-300">
                  {t("firstname")}
                </label>
                <input
                  className="h-9 w-4/6 sm:w-4/6 border border-gray-300 rounded-lg bg-white shadow px-2 placeholder:text-gray-400 text-black dark:text-gray-400 dark:bg-slate-800"
                  placeholder={t("firstname")}
                  name="firstname"
                  type="text"
                  value={formData.firstname}
                  required
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <label className="w-2/6 sm:w-2/6 text-right text-base text-black dark:text-slate-300">
                  {t("lastname")}
                </label>
                <input
                  className="h-9 w-4/6 sm:w-4/6 border border-gray-300 rounded-lg bg-white shadow px-2 placeholder:text-gray-400 text-black dark:text-gray-400 dark:bg-slate-800"
                  placeholder={t("lastname")}
                  name="lastname"
                  type="text"
                  value={formData.lastname}
                  required
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <label className="w-2/6 sm:w-2/6 text-right text-base text-black dark:text-slate-300">
                  {t("age")}
                </label>
                <input
                  className="h-9 w-4/6 sm:w-4/6 border border-gray-300 rounded-lg bg-white shadow px-2 placeholder:text-gray-400 text-black dark:text-gray-400 dark:bg-slate-800"
                  placeholder={t("age")}
                  name="age"
                  type="text"
                  value={formData.age}
                  required
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <label className="w-2/6 sm:w-2/6 text-right text-base text-black dark:text-slate-300">
                  {t("job")}
                </label>
                <input
                  className="h-9 w-4/6 sm:w-4/6 border border-gray-300 rounded-lg bg-white shadow px-2 placeholder:text-gray-400 text-black dark:text-gray-400 dark:bg-slate-800"
                  placeholder={t("job")}
                  name="job"
                  type="text"
                  value={formData.job}
                  required
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <label className="w-2/6 sm:w-2/6 text-right text-base text-black dark:text-slate-300">
                  {t("sex")}
                </label>
                <select
                  className="h-9 w-4/6 sm:w-4/6 border border-gray-300 rounded-lg bg-white shadow px-2 placeholder:text-gray-400 text-black dark:text-gray-400 dark:bg-slate-800"
                  name="sex"
                  id=""
                  value={formData.sex}
                  // required
                  onChange={handleChangeSelect}
                >
                  {optionsSex?.map((option, index) => (
                    <option key={index} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-end mt-4 md:mt-0 gap-2 justify-end md:justify-start">
              <button className="bg-[#08468A] dark:text-slate-300 dark:bg-slate-700 dark:border-slate-700 text-white border border-[#08468A] hover:scale-105 duration-300 cursor-pointer text-sm h-9 rounded-lg w-24">
                {editId !== null ? `${t("update")}` : `${t("save")}`}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-white border border-black text-black dark:text-slate-300 dark:bg-[#151515] hover:bg-black hover:text-white hover:scale-105 duration-300 cursor-pointer text-sm h-9 rounded-lg w-24"
              >
                {t("cancel")}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-2 md:px-5">
        <Pagination data={users} pages={5}>
          {(currentItems, currentPage, rowsPerPage) => {
            const startIndex = (currentPage - 1) * rowsPerPage; // คำนวณ index เริ่มต้น

            return (
              <div className="bg-white mt-6 rounded-xl border border-gray-300 overflow-x-auto ">
                <table className="table-auto min-w-[700px] w-full text-xs md:text-base text-left border-collapse">
                  <thead className="bg-[#F7F9FC] dark:bg-slate-700 text-white border-b border-gray-300 text-center">
                    <tr>
                      <th className="py-3 px-5 text-center text-gray-500 dark:text-[#A9B5C2]">
                        {t("No")}
                      </th>
                      <th className="py-3 px-5 text-center text-gray-500 dark:text-[#A9B5C2]">
                        {t("firstname")}
                      </th>
                      <th className="py-3 px-5 text-center text-gray-500 dark:text-[#A9B5C2]">
                        {t("lastname")}
                      </th>
                      <th className="py-3 px-5 text-center text-gray-500 dark:text-[#A9B5C2]">
                        {t("age")}
                      </th>
                      <th className="py-3 px-5 text-center text-gray-500 dark:text-[#A9B5C2]">
                        {t("job")}
                      </th>
                      <th className="py-3 px-5 text-center text-gray-500 dark:text-[#A9B5C2]">
                        {t("sex")}
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700 dark:text-slate-400 divide-y divide-gray-300">
                    {currentItems.map((user, index) => (
                      <tr
                        key={index}
                        className="bg-[#FFFFFF] dark:bg-slate-800"
                      >
                        <td className="py-4 px-5 text-center">
                          {startIndex + index + 1}
                        </td>
                        <td className="py-4 px-5 text-center">
                          {user.firstname}
                        </td>
                        <td className="py-4 px-5 text-center">
                          {user.lastname}
                        </td>
                        <td className="py-4 px-5 text-center">{user.age}</td>
                        <td className="py-4 px-5 text-center">{user.job}</td>
                        <td className="py-4 px-5 text-center">
                          {user?.sex ?? "-"}
                        </td>
                        <td>
                          <button
                            onClick={() => handleEdit(user.id)}
                            className="bg-[#08468A] dark:bg-slate-600 text-white dark:text-slate-200 px-4 py-1 rounded-lg cursor-pointer hover:scale-105 duration-200"
                          >
                            {t("edit")}
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="bg-[#D24610] dark:bg-slate-600 text-white dark:text-slate-200 px-4 py-1 ml-2 rounded-lg cursor-pointer hover:scale-105 duration-200"
                          >
                            {t("delete")}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          }}
        </Pagination>
      </div>
    </div>
  );
}
