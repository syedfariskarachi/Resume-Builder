"use client"
import { useState } from "react";
import InputForm from "./components/resume_builder/Inputform";
import ResumeData from "./components/resume_builder/Interface";
import ResumeTemplate from "./components/resume_builder/ResumeTemplate";
import Template from "./components/resume_builder/My_resume";

export default function Home() {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);
    const [showForm, setShowForm] = useState(false);

    const handleFormSubmit = (data: ResumeData) => {
        setResumeData(data);
        setShowForm(false); 
    };

    const handleCreateResumeClick = () => {
        setShowForm(true);
        setResumeData(null);
    };

   
    

    return (
        <>  
        <div className="container mx-auto p-4 bg-white">

         <h1 className="text-3xl font-bold text-center mb-8 text-black">Resume Builder</h1>
            <Template/>           
        </div>
         <div className="container mx-auto p-4 items-center bg-white ">
         
         {!showForm && !resumeData && (
             <button
                 onClick={handleCreateResumeClick}
                 className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md mx-4 hover:bg-green-600 transition duration-300"
                >
                 Create Your Resume
             </button>
         )}

         {showForm && <InputForm onSubmit={handleFormSubmit} />}

         {resumeData && <ResumeTemplate data={resumeData} />}
     </div>
     </>

    );
}
