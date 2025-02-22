/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import GeminiComponent from "../api/gemini";

const HomePage = () => {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");
  const [keyConcepts, setKeyConcepts] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");
  const [learningObjectives, setLearningObjectives] = useState("");
  const [generate, setGenerate] = useState(false);

  const summaryData = [
    { label: "Subject", value: subject },
    { label: "Grade Level", value: gradeLevel },
    { label: "Key Concepts", value: keyConcepts },
  ];

  const handleGenerate = () => {
    setGenerate(true);
  };

  return (
    <div className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-around">
      <div className="w-full">
        <div className="w-[80%] md:w-[70%] mx-auto gap-20">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Label>Topic:</Label>
              <Input
                placeholder="Enter the topic here"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="border-b-2" />
            <div>
              <h2 className="p-1 pl-2 bg-gray-600 text-white">Summary</h2>
              <Table className="w-full border rounded-lg">
                <TableBody>
                  {summaryData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.label}:</TableCell>
                      <TableCell>
                        <Input
                          className="w-full"
                          value={row.value}
                          onChange={(e) => {
                            if (row.label === "Subject")
                              setSubject(e.target.value);
                            if (row.label === "Grade Level")
                              setGradeLevel(e.target.value);
                            if (row.label === "Key Concepts")
                              setKeyConcepts(e.target.value);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div>
              <h2 className="p-1 pl-2 bg-gray-600 text-white">
                Materials Needed
              </h2>
              <Textarea
                placeholder="Enter the materials needed"
                value={materialsNeeded}
                onChange={(e) => setMaterialsNeeded(e.target.value)}
              />
            </div>
            <div>
              <h2 className="p-1 pl-2 bg-gray-600 text-white">
                Learning Objectives
              </h2>
              <Textarea
                placeholder="List 3 learning objectives"
                value={learningObjectives}
                onChange={(e) => setLearningObjectives(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mx-16">
        <div className="text-center">
          <Button
            onClick={handleGenerate}
            className="bg-blue-500 w-fit text-gray-50 font-mono mt-3"
          >
            Generate Lesson Plan with AI
          </Button>
          <p className="text-center text-xs italic text-gray-400 mt-0.5">
            (Previous lesson plan is available, on clicking 'Generate with AI',
            a new lesson plan will be generated)
          </p>
        </div>
        {generate && (
          <div className="mt-5">
            <GeminiComponent
              topic={topic}
              subject={subject}
              gradeLevel={gradeLevel}
              keyConcepts={keyConcepts}
              materialsNeeded={materialsNeeded}
              learningObjectives={learningObjectives}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
