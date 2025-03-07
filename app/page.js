"use client";

import Spinner from "../components/Spinner.jsx";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { useState } from "react";
import { CgList } from "react-icons/cg";
import { getMeetingSummary } from "../services/summaryApi";
import Button from "../components/Button.js";
import ListIcon from "../public/ListIcon.jsx";
import SummarySpinner from "../components/SummarySpinner.jsx";
import { FcRules, FcUpload, FcReading, FcTimeline } from "react-icons/fc";
import RoundButtonWithTooltip from "../components/RoundButtonWithTooltip.jsx";
import { PiCopySimpleLight } from "react-icons/pi";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { FaEye } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Page = () => {
  const [file, setFile] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [summary, setSummary] = useState("");
  const [tooltipContent, setTooltipContent] = useState({
    copy: "Copy",
    clear: "Clear",
    download: "Download",
  });
  const [buttonLoading, setButtonLoading] = useState({
    isLoading: false,
    isCopying: false,
    isClearing: false,
    isDownloading: false,
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
      setTooltipContent({ ...tooltipContent, copy: "Copied!" });
      setTimeout(() => {
        setTooltipContent({ ...tooltipContent, copy: "Copy" });
        setButtonLoading({ ...buttonLoading, isCopying: false });
      }, 1000);
    } catch (err) {
      console.error("Failed to copy text:", err);
      setTooltipContent({ ...tooltipContent, copy: "Failed to copy" });
      setButtonLoading({ ...buttonLoading, isCopying: false });
    }
  };

  const handleClear = () => {
    setButtonLoading({ ...buttonLoading, isClearing: true });
    setTooltipContent({ ...tooltipContent, clear: "Cleared!" });

    setTimeout(() => {
      setSummary("");
      setTooltipContent({ ...tooltipContent, clear: "Clear" });
      setButtonLoading({ ...buttonLoading, isClearing: false });
    }, 1000);
  };

  const handleDownload = () => {
    setButtonLoading({ ...buttonLoading, isDownloading: true });
    setTooltipContent({ ...tooltipContent, download: "Downloaded!" });

    const blob = new Blob([summary], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "meeting-summary.txt";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    setTimeout(() => {
      setTooltipContent({ ...tooltipContent, download: "Download" });
      setButtonLoading({ ...buttonLoading, isDownloading: false });
    }, 1000);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl font-semibold mb-8 text-gray-800 text-center md:text-left bg-white rounded-lg shadow-lg p-6 flex items-center gap-2">
          <FcReading size={28} />
          File Summarizer
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FcUpload />
              Upload File
            </h2>

            <div className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <label className="flex flex-col items-center justify-center h-full cursor-pointer">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <RiUploadCloud2Fill
                    size={60}
                    className="mb-2 text-gray-600"
                  />
                  {file ? (
                    <div className="text-center">
                      <p className="mb-2 text-sm text-green-600 font-semibold">
                        Selected file:
                      </p>
                      <p className="text-sm text-gray-600">{file.name}</p>
                    </div>
                  ) : (
                    <>
                      <p className="mb-2 text-sm text-gray-500 font-semibold">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 font-semibold">
                        .vtt files only
                      </p>
                    </>
                  )}
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

            <div className={`mt-4 flex justify-end items-center`}>
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
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FcRules />
              Summary
            </h2>
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
                  <p className="flex items-center gap-2 font-semibold">
                    <ListIcon />
                    Your summary will appear here
                  </p>
                </div>
              )}
            </div>
            <div className={`mt-4 flex justify-end gap-3`}>
              <Button
                name="Preview"
                onButtonClick={() => setPreviewMode(true)}
                isButtonDisabled={!summary}
                icon={<FaEye />}
              />
            </div>
          </div>

          {/* preview section */}
          {(previewMode && summary) && (
            <div className="col-span-1 md:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <FcTimeline />
                    Preview
                  </h2>

                  <div className="flex gap-2">
                    <div
                      data-tooltip-id="copy-tooltip"
                      data-tooltip-content={tooltipContent.copy}
                    >
                      <RoundButtonWithTooltip
                        icon={<PiCopySimpleLight size={12} />}
                        onClick={handleCopy}
                        tooltipFor="copy-tooltip"
                        tooltipMsg={tooltipContent.copy}
                        hoverColor="hover:text-green-700 hover:bg-green-100"
                      />
                    </div>
                    <div
                      data-tooltip-id="download-tooltip"
                      data-tooltip-content={tooltipContent.download}
                    >
                      <RoundButtonWithTooltip
                        icon={<PiDownloadSimpleBold size={12} />}
                        onClick={handleDownload}
                        tooltipFor="download-tooltip"
                        hoverColor="hover:text-blue-700 hover:bg-blue-100"
                        tooltipMsg={tooltipContent.download}
                      />
                    </div>
                    <div
                      data-tooltip-id="clear-tooltip"
                      data-tooltip-content={tooltipContent.clear}
                    >
                      <RoundButtonWithTooltip
                        icon={<RiDeleteBin6Line size={12} />}
                        hoverColor="hover:text-red-700 hover:bg-red-100"
                        onClick={handleClear}
                        tooltipFor="clear-tooltip"
                        tooltipMsg={tooltipContent.clear}
                      />
                    </div>
                  </div>
                </div>

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
                      <p className="flex items-center gap-2 font-semibold">
                        <ListIcon />
                        Your Summarized Preview will appear here
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;
