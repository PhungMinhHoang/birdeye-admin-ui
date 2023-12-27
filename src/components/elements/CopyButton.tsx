import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import {  useState } from "react";

export const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [_, copyToClipboard] = useCopyToClipboard();
  const [isCopy, setIsCopy] = useState(false);

  const handleCopy = () => {
    setIsCopy(true);
    copyToClipboard(text);

    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };

  return (
    <>
      {isCopy ? (
        <CheckOutlined style={{ color: "#52c41a" }} />
      ) : (
        <CopyOutlined onClick={handleCopy} />
      )}
    </>
  );
};
