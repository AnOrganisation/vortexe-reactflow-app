import React, { useRef } from "react";
import { Button } from "@nextui-org/react";

const UploadButton = ({ onUpload }) => {
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    let selectedFile = event.target.files[0];
    const fileUrl = URL.createObjectURL(selectedFile);

    const formData = new FormData();
    formData.append("user_id", "default_user");
    formData.append("file", selectedFile);
    formData.append("workflow_id", "wrk1");

    // Pass both fileUrl and formData to the parent component
    onUpload(fileUrl, formData);
  };

  return (
    <Button
      radius="full"
      type="submit"
      className="w-[100px] h-[28px] bg-[#6366F1] text-white focus:outline-none"
    >
      <p>Upload</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
        />
      </svg>
      <input
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
      />
    </Button>
  );
};

export default UploadButton;
