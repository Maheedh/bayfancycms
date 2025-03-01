import { Editor } from "@tinymce/tinymce-react"
import { useRef } from "react"

interface WysiwygEditorProps {
  initialValue: string
  onChange: (content: string) => void
}

export default function WysiwygEditor({ initialValue, onChange }: WysiwygEditorProps) {
  const editorRef = useRef<any>(null)

  return (
    <Editor
      apiKey="your-tinymce-api-key"
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={initialValue}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      onEditorChange={(content) => onChange(content)}
    />
  )
}

