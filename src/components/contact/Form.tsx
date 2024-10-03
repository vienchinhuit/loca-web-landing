"use client";
import { http } from "@/utils/http";
import { useState } from "react";

interface TDataContacts {
  name: string;
  phone: string;
  email: string;
  address: string;
  content: string;
}

interface TErorr {
  field: string;
  message: string;
}

export default function Form() {
  const [contacts, setContacts] = useState<TDataContacts>({
    name: "",
    phone: "",
    email: "",
    address: "",
    content: "",
  });

  const [errors, setErrors] = useState<TErorr>({
    field: "",
    message: "",
  });

  const handleSubmit = async () => {
    try {
      const response = (
        await http({
          url: "contact",
          method: "POST",
          data: contacts,
        } as any)
      ).data;
      if (response.statusCode === 200) {
        setContacts({
          name: "",
          phone: "",
          email: "",
          address: "",
          content: "",
        });
        alert("Gửi thành công");
      } else {
        setErrors(response?.errors[0]);
      }
    } catch (error) {
      alert("Gửi thất bại");
    }
  };
  return (
    <div className="lg:col-span-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="lg:col-span-1">
          <div>
            <input
              value={contacts?.name}
              onChange={(e: any) =>
                setContacts((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Họ và tên"
              type="text"
              className="w-full border-[1px] border-gray-300 rounded-md py-2 px-4 outline-none"
            />
          </div>
          <input
            value={contacts?.email}
            onChange={(e: any) =>
              setContacts((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Email"
            type="text"
            className="mt-3 w-full border-[1px] border-gray-300 rounded-md py-2 px-4 outline-none"
          />
        </div>
        <div className="lg:col-span-1">
          <input
            value={contacts?.address}
            onChange={(e: any) =>
              setContacts((prev) => ({ ...prev, address: e.target.value }))
            }
            placeholder="Địa chỉ"
            type="text"
            className="w-full border-[1px] border-gray-300 rounded-md py-2 px-4 outline-none"
          />
          <input
            value={contacts?.phone}
            onChange={(e: any) =>
              setContacts((prev) => ({ ...prev, phone: e.target.value }))
            }
            placeholder="Điện thoại"
            type="text"
            className="mt-3 w-full border-[1px] border-gray-300 rounded-md py-2 px-4 outline-none"
          />
        </div>
      </div>
      <textarea
        value={contacts?.content}
        onChange={(e: any) =>
          setContacts((prev) => ({ ...prev, content: e.target.value }))
        }
        placeholder="Nội dung"
        className="mt-3 w-full border-[1px] border-gray-300 rounded-md py-2 px-4 outline-none h-[150px]"
        defaultValue={""}
      />
      <div className="mt-5 lg:flex">
        {/* <button className="lg:mr-5 w-full py-3 bg-gray-200 text-black rounded-sm">
          Capcha
        </button> */}
        <button
          onClick={handleSubmit}
          className="lg:mt-0 mt-5 w-full py-3 bg-yellowCustom text-white rounded-sm font-bold"
        >
          Gửi nội dung
        </button>
      </div>
    </div>
  );
}
