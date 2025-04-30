"use client";

import React, { use, useEffect, useState } from "react";
interface FormData {
  name: string;
  age: number;
}

interface Options {
  code: string;
  name: string;
}

interface Options2 extends Options {
  age: number;
}

const data: Options2[] = [
  { code: "1", name: "John Doe", age: 20 },
  { code: "2", name: "Nack Doe", age: 20 },
];

const Component = () => {
    useEffect(() => {
        console.log("Component ถูก Mounted");
        return () => {
            console.log("Component ถูก UnMounted");
        }
    },[]);
  return <div>Component</div>;
}

// const options: string[] = [data];
export default function page() {
  const [number, setNumber] = useState<number>(0);
  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * React Page
   * @returns {JSX.Element}
   */
  /******  fcb16f2c-3a59-48a7-add6-422ec0d2bc5f  *******/
  const [text, setText] = useState<string>("text");
  const [isShow, setIsShow] = useState<boolean>(false);
  const [select, setSelect] = useState<string>();
  const [formdata, setFormData] = useState<FormData>({
    name: "",
    age: 0,
  });

  const [Users, setUsers] = useState<FormData[]>([]);
  const [componentShow, setComponentShow] = useState<boolean>(true);

  const handleClick = () => {
    setNumber(number + 1);
    console.log("เพิ่มเลขแล้ว", number);
  };

  const handleChangetext = () => {
    setText("textchange");
    console.log("เปลี่ยน text แล้ว", text);
  };

  const handleSwitch = () => {
    setIsShow(!isShow);
    console.log("เปลี่ยน switch", isShow);
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
    console.log("เลือกแล้ว", select);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
    // console.log("formdata", formdata);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsers([...Users, formdata]);
    const newusers = [...Users, formdata];
    localStorage.setItem("Users", JSON.stringify(newusers));
    // console.log("Users", Users);
  }

//   useEffect(() => {
//     console.log("ทำงานหลังจากที่ component render หรือ state มีการเปลี่ยนแปลง")
//   })

//   useEffect(() => {
//     console.log("ทำงานหลังจากที่ component render")
//   },[])

useEffect(() => {
    const datauser = localStorage.getItem("Users")
    setUsers(datauser ? JSON.parse(datauser) : [])
  },[])

  useEffect(() => {
    console.log("ทำงานหลังจากที่ component render หรือ isShow มีการเปลี่ยนแปลง")
  },[isShow, text])

  useEffect(() => {
    console.log("ทำงานหลังจากที่ component render หรือ formdata มีการเปลี่ยนแปลง", Users)
  },[Users])
  

  return (
    <div>
      <div>{number}</div>
      <button
        className="border p-1 rounded cursor-pointer"
        onClick={handleClick}
      >
        add count
      </button>

      <div>{text}</div>
      <button
        className="border p-1 rounded cursor-pointer"
        onClick={handleChangetext}
      >
        ChangeText
      </button>

      <div>{isShow ? "true" : "false"}</div>
      <button
        className="border p-1 rounded cursor-pointer"
        onClick={handleSwitch}
      >
        Switch
      </button>

      <div>
        <select
          className="border p-1 rounded"
          name=""
          id=""
          value={select}
          onChange={handleChangeSelect}
        >
          {data?.map((option, index) => (
            <option key={index} value={option.age}>
              {option.name} {option.age}
            </option>
          ))}
        </select>
        option select : {select}
      </div>

      <div>
        {formdata.name} {formdata.age}
      </div>
      <form action="" onSubmit={handleFormSubmit}>
        <input
          onChange={handleFormChange}
          value={formdata.name}
          className="bg-white rounded text-black  placeholder:text-gray-200"
          placeholder="name"
          type="text"
          name="name"
        />
        <input
          onChange={handleFormChange}
          value={formdata.age}
          className="bg-white rounded text-black placeholder:text-gray-200"
          placeholder="age"
          type="number"
          name="age"
        />
        <button type="submit">submit</button>
      </form>

      <div>
        {Users.map((user, index) => (
          <div className="text-white" key={index}>
            {user.name} {user.age}
          </div>
        ))}
      </div>

        {componentShow ? <Component/> : ""}
      <button className="text-white border p-2 cursor-pointer" onClick={() => setComponentShow(!componentShow)}>Click</button>
    </div>
  );
}
