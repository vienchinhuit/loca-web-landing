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
      if (contacts?.name == "") {
        return setErrors({ field: "name", message: "Trường này là bắt buộc" });
      }
      if (contacts?.address == "") {
        return setErrors({
          field: "address",
          message: "Trường này là bắt buộc",
        });
      }
      if (contacts?.email == "") {
        return setErrors({ field: "email", message: "Trường này là bắt buộc" });
      }
      if (contacts?.phone == "") {
        return setErrors({ field: "phone", message: "Trường này là bắt buộc" });
      }
      if (contacts?.content == "") {
        return setErrors({
          field: "content",
          message: "Trường này là bắt buộc",
        });
      }

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
      console.log(error);

      // alert("Gửi thất bại");
    }
  };
  return (
    <div className="lg:col-span-1">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="lg:col-span-1">
          <div>
            <input
              value={contacts?.name}
              onChange={(e: any) => {
                setErrors({ field: "", message: "" });
                setContacts((prev) => ({ ...prev, name: e.target.value }));
              }}
              placeholder="Họ và tên"
              type="text"
              className="w-full border-[1px] border-gray-300 rounded-md py-2 px-4 outline-none"
            />
            {errors.field === "name" && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
          <div>
            <input
              value={contacts?.email}
              onChange={(e: any) => {
                setErrors({ field: "", message: "" });
                setContacts((prev) => ({ ...prev, email: e.target.value }));
              }}
              placeholder="Email"
              type="text"
              className="mt-3 w-full border-[1px] border-gray-300 rounded-md py-2 px-4 outline-none"
            />
            {errors.field === "email" && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div>
            <input
              value={contacts?.address}
              onChange={(e: any) => {
                setErrors({ field: "", message: "" });
                setContacts((prev) => ({ ...prev, address: e.target.value }));
              }}
              placeholder="Địa chỉ"
              type="text"
              className="w-full border-[1px] border-gray-300 rounded-md py-2 px-4 outline-none"
            />
            {errors.field === "address" && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
          <div>
            <input
              value={contacts?.phone}
              onChange={(e: any) => {
                setErrors({ field: "", message: "" });
                setContacts((prev) => ({ ...prev, phone: e.target.value }));
              }}
              placeholder="Điện thoại"
              type="text"
              className="mt-3 w-full border-[1px] border-gray-300 rounded-md py-2 px-4 outline-none"
            />
            {errors.field === "phone" && (
              <p className="text-red-500 text-sm">{errors.message}</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <textarea
          value={contacts?.content}
          onChange={(e: any) => {
            setErrors({ field: "", message: "" });
            setContacts((prev) => ({ ...prev, content: e.target.value }));
          }}
          placeholder="Nội dung"
          className="mt-3 w-full border-[1px] border-gray-300 rounded-md py-2 px-4 outline-none h-[150px]"
        />
        {errors.field === "content" && (
          <p className="text-red-500 text-sm">{errors.message}</p>
        )}
      </div>
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
