"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import html2pdf from "html2pdf.js";

export default function ResumeTemplate({ data }) {
    const resumeRef = useRef(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data);

    const handleDownload = () => {
        setIsGeneratingPDF(true);
        const element = resumeRef.current;
        if (element) {
            html2pdf()
                .set({
                    margin: 1,
                    filename: `${editedData.name || "resume"}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { scale: 2 },
                    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
                })
                .from(element)
                .save()
                .finally(() => setIsGeneratingPDF(false));
        }
    };

    const handleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8 md:p-12 lg:p-16">
            <div ref={resumeRef} className="bg-gray-100 p-4">
                <div className="bg-green-500 p-4 rounded text-center">
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-white">
                        {editedData.profileImage ? (
                            <Image
                                src={editedData.profileImage}
                                alt="Profile"
                                width={150}
                                height={150}
                                className="w-full h-full object-cover"
                                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                    const image = e.currentTarget;
                                    image.src = "/api/placeholder/128/128";
                                }}
                            />
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
                                <div className="text-gray-400 text-4xl mb-2">📷</div>
                                <span className="text-sm text-gray-400">Photo</span>
                            </div>
                        )}
                    </div>

                    <div className="text-white">
                        {isEditing ? (
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={editedData.name || ""}
                                    onChange={handleChange}
                                    className="text-2xl font-bold"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={editedData.email || ""}
                                    onChange={handleChange}
                                    className="mt-2"
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    value={editedData.phone || ""}
                                    onChange={handleChange}
                                    className="mt-2"
                                />
                            </div>
                        ) : (
                            <div>
                                <h1 className="text-2xl font-bold">{editedData.name || "Your Name"}</h1>
                                <p>{editedData.email || "youremail@example.com"}</p>
                                <p>{editedData.phone || "Your phone number"}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <h2 className="text-xl font-bold">Career Summary</h2>
                    {isEditing ? (
                        <textarea
                            name="careerSummary"
                            value={editedData.careerSummary || ""}
                            onChange={handleChange}
                            className="mt-2 w-full"
                        />
                    ) : (
                        <p className="mt-2">{editedData.careerSummary || "Add Career Summary"}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    <div className="bg-gray-200 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-black">Skills</h3>
                        {isEditing ? (
                            <textarea
                                name="skills"
                                value={editedData.skills || ""}
                                onChange={handleChange}
                                className="mt-2 w-full"
                            />
                        ) : (
                            <ul className="mt-2 list-none pl-4">
                                {editedData.skills ? editedData.skills.split(",").map((skill, index) => (
                                    <li key={index} className="text-gray-700">{skill.trim()}</li>
                                )) : <li className="text-gray-700">No skills listed</li>}
                            </ul>
                        )}
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-black">Education</h3>
                        {isEditing ? (
                            <textarea
                                name="education"
                                value={editedData.education || ""}
                                onChange={handleChange}
                                className="mt-2 w-full"
                            />
                        ) : (
                            <p className="mt-2 text-gray-700">{editedData.education || "Add your Education"}</p>
                        )}
                    </div>

                    <div className="bg-gray-200 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold text-black">Work Experience</h3>
                        {isEditing ? (
                            <textarea
                                name="workExperience"
                                value={editedData.workExperience || ""}
                                onChange={handleChange}
                                className="mt-2 w-full"
                            />
                        ) : (
                            <p className="mt-2 text-gray-700">{editedData.workExperience || "Add your work history "}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex gap-4">
                <button
                    onClick={handleDownload}
                    disabled={isGeneratingPDF}
                    className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-200"
                >
                    {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
                </button>

                <button
                    onClick={handleEdit}
                    className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
                >
                    {isEditing ? "Save Changes" : "Edit Resume"}
                </button>
            </div>
        </div>
    );
}


