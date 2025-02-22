/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { useReactToPrint } from "react-to-print";
import { SkeletonCard } from "@/components/custom/Skeleton";

const GeminiComponent = ({
  topic,
  subject,
  gradeLevel,
  keyConcepts,
  materialsNeeded,
  learningObjectives,
}) => {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const contentRef = useRef(null);

  const handlePdf = useReactToPrint({
    contentRef,
    pageStyle: `
      @page {
        size: auto;
        margin: 25mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact; 
        }
        p, li {
          font-size: 12pt;
        }
      }
    `,
  });

  useEffect(() => {
    const savedOutput = localStorage.getItem("lessonPlanOutput");
    if (savedOutput) {
      setOutput(savedOutput);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lessonPlanOutput", output);
  }, [output]);

  const handleClick = async () => {
    try {
      setLoading(true);
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
        The following details are given to you:
        Subject: ${subject}
        Topic: ${topic}
        Grade Level: ${gradeLevel}
        Key Concepts: ${keyConcepts}
        Materials Needed: ${materialsNeeded}
        Learning Objectives: ${learningObjectives}
        
        Generate the following sections based on the above information:
        1. <strong>Lesson Content</strong> – <em>a detailed explanation of the topic within 200 words.</em>
        2. <strong>Classroom Activities</strong> – <em>3 engaging tasks to reinforce learning.</em>
        3. <strong>Assessment Questions</strong> – <em>6 short questions </em>
        
        Format the response with clear headings for each section using the HTML tags.
        Make the headings bold, subheadings italic, list elements shall be numbered like the world depends on it!!
      `;

      const result = await model.generateContent(prompt);
      setOutput(result.response.text());
    } catch (error) {
      console.error("Error generating content:", error);
      setOutput("An error occurred while generating content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={handleClick}
        className="px-6 py-2 rounded-xl w-fit bg-blue-500 text-white text-sm font-mono shadow hover:bg-blue-600 transition"
      >
        Generate with AI
      </button>
      <p className="text-center text-xs italic text-gray-400 mt-0.5">
        (You can EDIT the document before downloading)
      </p>

      {loading && (
        <div className="my-3">
          <SkeletonCard />
        </div>
      )}

      {output && (
        <div
          id="planner"
          className="w-[85%] lg:w-full flex flex-col items-center"
        >
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            {isEditing ? (
              <p className="text-xs">Preview</p>
            ) : (
              <p className="text-xs">Edit</p>
            )}
          </button>
          <div ref={contentRef} className="w-full flex flex-col items-center">
            <Card className="mt-2 w-[96%] md:w-[80%] lg:w-full border border-gray-400">
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg md:text-xl text-center">
                  Generated Lesson Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <textarea
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    className="w-full h-96 p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 resize-none"
                  />
                ) : (
                  <div
                    className="w-full min-h-fit p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-900 overflow-auto"
                    dangerouslySetInnerHTML={{ __html: output }}
                  />
                )}
              </CardContent>
            </Card>
          </div>
          <button
            onClick={() => handlePdf()}
            className="w-fit bg-blue-500 px-6 py-1 rounded-lg my-1"
          >
            Download PDF
          </button>
          <p className="text-xs text-gray-300 italic mb-4">
            (Click on 'Preview' before downloading PDF)
          </p>
        </div>
      )}
    </div>
  );
};

export default GeminiComponent;
