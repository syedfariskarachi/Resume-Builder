"use client"
import { useState } from "react";
import Image from "next/image";
export default function InputForm({ onSubmit }) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [careerSummary, setCareerSummary] = useState("");
    const [skills, setSkills] = useState("");
    const [education, setEducation] = useState("");
    const [workExperience, setWorkExperience] = useState("");
    
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        
        if (file) {
           
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ 
            profileImage: imagePreview,
            name, 
            email, 
            phone, 
            careerSummary, 
            skills, 
            education, 
            workExperience 
        });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-md space-y-4 text-black">
           <div className="text-center">
    {imagePreview && (
        <div className="w-32 h-32 relative mx-auto mb-2 rounded-full overflow-hidden">
            <Image 
                src={imagePreview}
                alt="Profile preview"
                layout="fill"     
                objectFit="cover"           
                className="rounded-full"     
            />
        </div>
    )}
    <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />
</div>


            <div>
                <label>Name:</label>
                <input  type="text"  value={name}  onChange={(e) => setName(e.target.value)}  className="border rounded w-full p-2" 
                />
            </div>
            <div>
                <label>Email:</label>
                <input  type="email"  value={email}  onChange={(e) => setEmail(e.target.value)}  className="border rounded w-full p-2" 
                />
            </div>
            <div>
                <label>Phone:</label>
                <input  type="tel"  value={phone}  onChange={(e) => setPhone(e.target.value)}  className="border rounded w-full p-2" 
                />
            </div>
            <div>
                <label>Career Summary:</label>
                <textarea  value={careerSummary}  onChange={(e) => setCareerSummary(e.target.value)}  className="border rounded w-full p-2"  rows={4}
                />
            </div>
            <div>
                <label>Skills (comma separated):</label>
                <input  type="text"  value={skills}  onChange={(e) => setSkills(e.target.value)}  className="border rounded w-full p-2" 
                />
            </div>
            <div>
                <label>Education:</label>
                <textarea  value={education}  onChange={(e) => setEducation(e.target.value)}  className="border rounded w-full p-2"  rows={4}
                />
            </div>

            <div>
                <label>Work Experience:</label>
                <textarea value={workExperience} onChange={(e) => setWorkExperience(e.target.value)} className="border rounded w-full p-2" rows={4}
                />
            </div>
            <button 
                type="submit" 
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                View Resume
            </button>
        </form>
    );
}