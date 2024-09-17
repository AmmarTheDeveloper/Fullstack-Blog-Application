"use client";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useTheme } from "next-themes";
import "./editor.css";

interface EditorType {
  value: string;
  setValue: (value: string) => void;
}

const Editor = ({ value, setValue }: EditorType) => {
  const { theme } = useTheme();

  const toolbarOptions = [
    [{ header: [false, 1, 2, 3, 4, 5, 6] }],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: 1 }, { header: 2 }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ align: [] }],
    ["link", "image", "video", "formula"],
    ["clean"],
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={setValue}
      modules={{ toolbar: toolbarOptions }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "list",
        "bullet",
        "indent",
        "align",
        "link",
        "image",
        "video",
        "color",
        "background",
        "code-block",
        "blockquote",
        "script",
        "formula",
        "clean",
      ]}
      className={theme == "dark" ? "dark-mode" : ""}
    />
  );
};

export default Editor;
