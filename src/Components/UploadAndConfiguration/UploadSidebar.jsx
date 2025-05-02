import { useState } from "react";

// Components
import UploadDocument from "./UploadDocuments/UploadDocument";
import LinkDrive from "./LinkDrive";
import EmailDb from "./EmailDb";
import CrmApiSetup from "./CrmApiSetup";

export default function UploadSidebar() {
  const [activeTab, setActiveTab] = useState("Upload Document");

  const sidebarItems = [
    { label: "Upload Document" },
    { label: "Link Google Drive Folder" },
    { label: "Enter Email & DB Credentials" },
    { label: "CRM API Setup" },
    { label: "Configure Payment Gateway" },
    { label: "Enable Slack Notifications" },
    { label: "Configure Reviewer Email Integration" },
    { label: "API Key / Secret Key (for Payments)" },
    { label: "Notification Email for Payment Errors" },
  ];

  const renderItemContent = () => {
    switch (activeTab) {
      case "Upload Document":
        return <UploadDocument />;
      case "Link Google Drive Folder":
        return <LinkDrive />;
      case  "Enter Email & DB Credentials":
        return <EmailDb />
      case 'CRM API Setup':
        return <CrmApiSetup />  
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500 text-lg">
              {activeTab} content coming soon
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-74 bg-white p-6 border-l border-r border-gray-200">
        <ul className="space-y-3">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              onClick={() => setActiveTab(item.label)}
              className={`px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors ${
                activeTab === item.label
                  ? "bg-[#e8eff7] text-[#1B61AD] font-semibold"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {renderItemContent()}
      </main>
    </div>
  );
}