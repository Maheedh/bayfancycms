"use client"
import dynamic from "next/dynamic"
import "react-quill/dist/quill.snow.css"

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

interface WysiwygEditorProps {
  initialValue: string
  onChange: (content: string) => void
}

export default function WysiwygEditor({ initialValue, onChange }: WysiwygEditorProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  }

  const formats = ["header", "bold", "italic", "underline", "strike", "blockquote", "list", "bullet", "link", "image"]

  return <ReactQuill theme="snow" value={initialValue} onChange={onChange} modules={modules} formats={formats} />
}

