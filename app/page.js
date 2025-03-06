"use client";

import Spinner from "../components/Spinner.jsx";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { useState } from "react";
import { CgList } from "react-icons/cg";
import { getMeetingSummary } from "../services/summaryApi";
import Button from "../components/Button.js";
import CopyIcon from "../public/CopyIcon.jsx";
import ClearIcon from "../public/ClearIcon.jsx";
import ListIcon from "../public/ListIcon.jsx";
import SummarySpinner from "../components/SummarySpinner.jsx";

const Page = () => {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [buttonLoading, setButtonLoading] = useState({
    isLoading: false,
    isCopying: false,
    isClearing: false,
  });

  const handleSummarize = async (inputFile) => {
    setButtonLoading({ ...buttonLoading, isLoading: true });

    const formData = new FormData();
    formData.append("file", inputFile);

    getMeetingSummary(formData)
      .then((data) => {
        setSummary(data.choices[0].message.content);
      })
      .finally(() => {
        setButtonLoading({ ...buttonLoading, isLoading: false });
      });
  };

  const handleCopy = async () => {
    setButtonLoading({ ...buttonLoading, isCopying: true });
    try {
      await navigator.clipboard.writeText(summary);
      setTimeout(
        () => setButtonLoading({ ...buttonLoading, isCopying: false }),
        500
      );
    } catch (err) {
      console.error("Failed to copy text:", err);
      setButtonLoading({ ...buttonLoading, isCopying: false });
    }
  };

  const handleClear = () => {
    setButtonLoading({ ...buttonLoading, isClearing: true });
    setTimeout(() => {
      setSummary("");
      setButtonLoading({ ...buttonLoading, isClearing: false });
    }, 1000);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-gray-900 text-center md:text-left">
          Text Summarizer
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Input Text</h2>

            <div className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <RiUploadCloud2Fill
                    size={60}
                    className="mb-2 text-gray-600"
                  />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">.vtt files only</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept=".vtt"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </label>
            </div>

            <div className={`mt-4 flex justify-between items-center`}>
              <Button
                name={buttonLoading.isLoading ? "Summarizing..." : "Summarize"}
                onButtonClick={() => handleSummarize(file)}
                isButtonDisabled={buttonLoading.isLoading || !file}
                icon={
                  buttonLoading.isLoading ? <Spinner /> : <CgList size={18} />
                }
              />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="w-full h-64 border border-gray-300 rounded-lg bg-white">
              {buttonLoading.isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <SummarySpinner />
                </div>
              ) : summary ? (
                <div className="h-full p-4 overflow-auto">
                  <p className="text-gray-800 text-sm leading-relaxed font-sans whitespace-pre-wrap">
                    {summary}
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p className="flex items-center gap-2">
                    <ListIcon />
                    Your summary will appear here
                  </p>
                </div>
              )}
            </div>
            <div className={`mt-4 flex justify-end gap-3`}>
              <Button
                name={buttonLoading.isCopying ? "Copying..." : "Copy"}
                onButtonClick={handleCopy}
                isButtonDisabled={!summary || buttonLoading.isCopying}
                icon={buttonLoading.isCopying ? <Spinner /> : <CopyIcon />}
              />

              <Button
                name={buttonLoading.isClearing ? "Clearing..." : "Clear"}
                onButtonClick={handleClear}
                isButtonDisabled={!summary || buttonLoading.isClearing}
                icon={buttonLoading.isClearing ? <Spinner /> : <ClearIcon />}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
