import React, { useState } from "react";
import { ProjectRequirements } from "../types";
import {
  Settings,
  Code,
  Users,
  Clock,
  Coins,
  Scale,
  FileText,
} from "lucide-react";

interface Props {
  onSubmit: (requirements: ProjectRequirements) => void;
  disabled?: boolean;
}

export default function RequirementsForm({
  onSubmit,
  disabled = false,
}: Props) {
  const [requirements, setRequirements] = useState<ProjectRequirements>({
    type: "",
    scale: "",
    performance: "",
    budget: "",
    timeline: "",
    team: "",
    description: "",
  });

  const handleInputChange = (
    field: keyof ProjectRequirements,
    value: string
  ) => {
    setRequirements((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled) {
      console.log("Form data:", requirements); // Debug için log
      onSubmit(requirements);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
      <header className="flex items-center space-x-2">
        <Settings className="w-5 h-5 text-blue-500" />
        <h2 className="text-xl font-semibold">Project Requirements</h2>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            label: "Project Type",
            icon: <Code className="w-4 h-4 text-gray-600" />,
            field: "type",
            options: [
              { value: "", text: "Select type" },
              { value: "web", text: "Web Application" },
              { value: "mobile", text: "Mobile App" },
              { value: "backend", text: "Backend Service" },
              { value: "desktop", text: "Desktop Application" },
              { value: "ai", text: "AI/ML Project" },
            ],
          },
          {
            label: "Project Scale",
            icon: <Scale className="w-4 h-4 text-gray-600" />,
            field: "scale",
            options: [
              { value: "", text: "Select scale" },
              { value: "small", text: "Small" },
              { value: "medium", text: "Medium" },
              { value: "large", text: "Large" },
            ],
          },
          {
            label: "Team Size",
            icon: <Users className="w-4 h-4 text-gray-600" />,
            field: "team",
            options: [
              { value: "", text: "Select team size" },
              { value: "small", text: "Small (1-5)" },
              { value: "medium", text: "Medium (6-15)" },
              { value: "large", text: "Large (15+)" },
            ],
          },
          {
            label: "Timeline",
            icon: <Clock className="w-4 h-4 text-gray-600" />,
            field: "timeline",
            options: [
              { value: "", text: "Select timeline" },
              { value: "short", text: "Short (1-3 months)" },
              { value: "medium", text: "Medium (3-6 months)" },
              { value: "long", text: "Long (6+ months)" },
            ],
          },
          {
            label: "Budget",
            icon: <Coins className="w-4 h-4 text-gray-600" />,
            field: "budget",
            options: [
              { value: "", text: "Select budget" },
              { value: "limited", text: "Limited" },
              { value: "moderate", text: "Moderate" },
              { value: "high", text: "High" },
            ],
          },
        ].map(({ label, icon, field, options }) => (
          <div className="space-y-2" key={field}>
            <label className="flex items-center space-x-2">
              {icon}
              <span>{label}</span>
            </label>
            <select
              className="w-full p-2 border rounded-md disabled:bg-gray-100 disabled:cursor-not-allowed"
              value={requirements[field as keyof ProjectRequirements]}
              onChange={(e) =>
                handleInputChange(
                  field as keyof ProjectRequirements,
                  e.target.value
                )
              }
              disabled={disabled}
              required
            >
              {options.map((opt, idx) => (
                <option key={idx} value={opt.value}>
                  {opt.text}
                </option>
              ))}
            </select>
          </div>
        ))}
      </section>

      <div className="space-y-2 col-span-full">
        <label className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-gray-600" />
          <span>Project Description</span>
        </label>
        <textarea
          className="w-full p-3 border rounded-md h-32 disabled:bg-gray-100 disabled:cursor-not-allowed"
          placeholder="Please describe your project in detail..."
          value={requirements.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          disabled={disabled}
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
        disabled={disabled}
      >
        {disabled ? "Getting Recommendations..." : "Get Recommendations"}
      </button>
    </form>
  );
}
