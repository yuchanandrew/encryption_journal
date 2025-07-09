import { useRef } from "react";

interface AutoResizeTextProps {
  onTextChange: (text: string) => void;
  value: string;
  placeholder: string;
}

const AutoResizeText = ({
  onTextChange,
  value,
  placeholder,
}: AutoResizeTextProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value);

    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  };

  return (
    <textarea
      ref={textAreaRef}
      onChange={handleInput}
      value={value}
      className="home-textbox"
      rows={2}
      placeholder={placeholder}
      autoComplete="off"
    ></textarea>
  );
};

export default AutoResizeText;
