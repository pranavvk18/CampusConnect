// // "use client";

// // import { useState } from "react";
// // import { MainLayout } from "@/components/layout/main-layout";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Button } from "@/components/ui/button";
// // import { Progress } from "@/components/ui/progress";
// // import { Input } from "@/components/ui/input";

// // export default function PlagiarismChecker() {
// //   const [textInput, setTextInput] = useState("");
// //   const [fileText, setFileText] = useState("");
// //   const [checking, setChecking] = useState(false);
// //   const [plagiarismResult, setPlagiarismResult] = useState<number | null>(null);

// //   const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
// //     const file = e.target.files?.[0];
// //     if (!file) return;

// //     const reader = new FileReader();

// //     reader.onload = async (event) => {
// //       const content = event.target?.result;
// //       if (typeof content === "string") {
// //         setFileText(content);
// //         setTextInput(""); // Clear manual input if file uploaded
// //       }
// //     };

// //     if (file.type === "text/plain") {
// //       reader.readAsText(file);
// //     } else if (
// //       file.type ===
// //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
// //     ) {
// //       const { default: mammoth } = await import("mammoth");
// //       const arrayBuffer = await file.arrayBuffer();
// //       const result = await mammoth.extractRawText({ arrayBuffer });
// //       setFileText(result.value);
// //       setTextInput(""); // Clear manual input if file uploaded
// //     } else {
// //       alert("Unsupported file type. Please upload a .txt or .docx file.");
// //     }
// //   };

// //   const handleCheckPlagiarism = () => {
// //     const contentToCheck = fileText || textInput;

// //     if (!contentToCheck.trim()) {
// //       alert("Please enter or upload some content.");
// //       return;
// //     }

// //     setChecking(true);

// //     setTimeout(() => {
// //       // Mock result: random number to simulate result
// //       const mockScore = Math.floor(Math.random() * 51) + 50;
// //       setPlagiarismResult(mockScore);
// //       setChecking(false);
// //     }, 1500); // simulate delay
// //   };

// //   return (
// //     <MainLayout>
// //       <div className="space-y-6">
// //         <div>
// //           <h1 className="text-3xl font-bold">Plagiarism Checker</h1>
// //           <p className="text-muted-foreground mt-1">
// //             Upload your document or paste content to check for plagiarism
// //           </p>
// //         </div>

// //         <Card className="socse-card">
// //           <CardHeader>
// //             <CardTitle>Submit Content</CardTitle>
// //             <CardDescription>
// //               Upload a <code>.docx</code> or <code>.txt</code> file, or paste your text below.
// //             </CardDescription>
// //           </CardHeader>
// //           <CardContent className="space-y-4">
// //             <Input type="file" accept=".txt,.docx" onChange={handleFileUpload} />
// //             <div className="text-center text-muted-foreground text-sm">OR</div>
// //             <Textarea
// //               placeholder="Paste your content here..."
// //               rows={10}
// //               value={textInput}
// //               onChange={(e) => {
// //                 setTextInput(e.target.value);
// //                 setFileText(""); // Clear uploaded file text if manual input used
// //               }}
// //             />

// //             <Button onClick={handleCheckPlagiarism} disabled={checking}>
// //               {checking ? "Checking..." : "Check Plagiarism"}
// //             </Button>

// //             {plagiarismResult !== null && (
// //               <div className="mt-4 space-y-2">
// //                 <p className="text-lg font-medium">
// //                   Plagiarism Detected: {plagiarismResult}%
// //                 </p>
// //                 <Progress
// //                   value={plagiarismResult}
// //                   indicatorClassName={
// //                     plagiarismResult < 50
// //                       ? "bg-green-500"
// //                       : plagiarismResult < 80
// //                       ? "bg-yellow-500"
// //                       : "bg-red-500"
// //                   }
// //                 />
// //               </div>
// //             )}
// //           </CardContent>
// //         </Card>
// //       </div>
// //     </MainLayout>
// //   );
// // }


// const fs = require("fs");
// const pdfParse = require("pdf-parse");

// // Function to read and extract text from a PDF file
// const readPDF = async (filePath) => {
//     const pdfBuffer = fs.readFileSync(filePath);
//     const data = await pdfParse(pdfBuffer);
//     return data.text; // Return extracted text
// };

// // Example usage
// (async () => {
//     const content = await readPDF("path_to_your_green_ai.pdf");
//     console.log(content); // Output the text extracted from the PDF
// })();
// const extractPDFs = async (pdfPaths) => {
//     const pdfContents = [];
//     for (const filePath of pdfPaths) {
//         const content = await readPDF(filePath);
//         pdfContents.push(content);
//     }
//     return pdfContents;
// };

// // Example usage
// (async () => {
//     const pdfPaths = ["public/1-s2.0-S0743731518308773-main.pdf", "public/1-s2.0-S0925231224008671-main.pdf", "public/1-s2.0-S0959652622049083-main.pdf"];
//     const pdfContents = await extractPDFs(pdfPaths);
//     console.log(pdfContents); // Array of extracted text
// })();
// // Function to clean and tokenize text
// const tokenize = (text) => {
//     return text
//         .toLowerCase()
//         .replace(/[^a-z0-9\s]/g, "") // Remove non-alphanumeric characters
//         .split(/\s+/); // Split by spaces
// };

// // Function to calculate term frequency (TF) vector
// const calculateTF = (words) => {
//     const tfMap = new Map();
//     words.forEach((word) => {
//         tfMap.set(word, (tfMap.get(word) || 0) + 1);
//     });
//     return tfMap;
// };

// // Function to calculate cosine similarity
// const cosineSimilarity = (tf1, tf2) => {
//     const allWords = new Set([...tf1.keys(), ...tf2.keys()]);
//     let dotProduct = 0;
//     let magnitude1 = 0;
//     let magnitude2 = 0;

//     allWords.forEach((word) => {
//         const tf1Value = tf1.get(word) || 0;
//         const tf2Value = tf2.get(word) || 0;
//         dotProduct += tf1Value * tf2Value;
//         magnitude1 += tf1Value * tf1Value;
//         magnitude2 += tf2Value * tf2Value;
//     });

//     if (magnitude1 === 0 || magnitude2 === 0) return 0;
//     return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
// };

// const checkPlagiarism = (userText, pdfContents) => {
//     const userWords = tokenize(userText);
//     const userTF = calculateTF(userWords);

//     pdfContents.forEach((pdfContent, index) => {
//         const pdfWords = tokenize(pdfContent);
//         const pdfTF = calculateTF(pdfWords);
//         const similarity = cosineSimilarity(userTF, pdfTF);
//         console.log(Similarity with PDF ${index + 1}: ${(similarity * 100).toFixed(2)}%);
//     });
// };

// // Example usage
// (async () => {
//     const pdfPaths = ["green_ai_1.pdf", "green_ai_2.pdf", "green_ai_3.pdf"];
//     const pdfContents = await extractPDFs(pdfPaths);

//     const userText = "Your text related to Green AI.";
//     checkPlagiarism(userText, pdfContents);
// })();

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { FileText, Upload, AlertCircle, Check } from "lucide-react";

interface DocumentInfo {
  id: string;
  title: string;
  content: string;
  type: 'reference' | 'upload';
}

interface SimilarityResult {
  documentId: string;
  documentTitle: string;
  similarityScore: number;
  similarSentences: Array<{
    original: string;
    matched: string;
    score: number;
  }>;
}

const GreenAIPlagiarismChecker: React.FC = () => {
  // State variables
  const [referenceDocuments, setReferenceDocuments] = useState<DocumentInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedContent, setUploadedContent] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);
  const [similarityResults, setSimilarityResults] = useState<SimilarityResult[]>([]);
  const [overallSimilarity, setOverallSimilarity] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Simulated reference documents - in a real app, these would be fetched from a database or API
  const mockReferenceDocuments: DocumentInfo[] = [
    {
      id: "doc1",
      title: "Green AI: Energy Efficiency in Machine Learning",
      content: "Green AI refers to AI research and development that is environmentally friendly and resource-efficient. It focuses on reducing the carbon footprint of training and deploying machine learning models. Techniques include model compression, efficient architecture design, and sustainable computing practices.",
      type: 'reference'
    },
    {
      id: "doc2",
      title: "Sustainable Approaches to Deep Learning",
      content: "Modern deep learning models require significant computational resources, leading to high energy consumption. Sustainable approaches include knowledge distillation, pruning, quantization, and early stopping. These methods aim to create models that perform well while minimizing environmental impact and resource usage.",
      type: 'reference'
    },
    {
      id: "doc3",
      title: "The Future of Environmentally Conscious AI Development",
      content: "Future AI development must prioritize environmental sustainability alongside performance metrics. This includes reporting energy consumption and carbon emissions, optimizing training procedures, and developing hardware specifically designed for energy-efficient AI operations. Carbon-aware computing will become a standard practice.",
      type: 'reference'
    }
  ];

  // Load reference documents on component mount
  useEffect(() => {
    // Simulating API call to fetch documents
    setTimeout(() => {
      setReferenceDocuments(mockReferenceDocuments);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Function to handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploadedFile(file);
    
    // Read file content
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setUploadedContent(event.target.result as string);
      }
    };
    reader.readAsText(file);
  };

  // Function to calculate cosine similarity between two texts
  // This is a simplified version - in a real implementation you'd use NLP libraries
  const calculateCosineSimilarity = (text1: string, text2: string): number => {
    // Convert texts to lowercase and split into words
    const words1 = text1.toLowerCase().split(/\W+/).filter(word => word.length > 0);
    const words2 = text2.toLowerCase().split(/\W+/).filter(word => word.length > 0);
    
    // Create word frequency maps
    const freqMap1: Record<string, number> = {};
    const freqMap2: Record<string, number> = {};
    
    words1.forEach(word => {
      freqMap1[word] = (freqMap1[word] || 0) + 1;
    });
    
    words2.forEach(word => {
      freqMap2[word] = (freqMap2[word] || 0) + 1;
    });
    
    // Get all unique words
    const uniqueWords = new Set([...Object.keys(freqMap1), ...Object.keys(freqMap2)]);
    
    // Calculate dot product and magnitudes
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;
    
    uniqueWords.forEach(word => {
      const val1 = freqMap1[word] || 0;
      const val2 = freqMap2[word] || 0;
      
      dotProduct += val1 * val2;
      magnitude1 += val1 * val1;
      magnitude2 += val2 * val2;
    });
    
    // Calculate cosine similarity
    if (magnitude1 === 0 || magnitude2 === 0) return 0;
    return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2));
  };

  // Find similar sentences between two texts
  const findSimilarSentences = (text1: string, text2: string, similarityThreshold = 0.6) => {
    // Split texts into sentences (simple splitting, could be improved)
    const sentences1 = text1.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentences2 = text2.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const similarPairs = [];
    
    // Compare each sentence from text1 with each sentence from text2
    for (const s1 of sentences1) {
      for (const s2 of sentences2) {
        const similarity = calculateCosineSimilarity(s1, s2);
        if (similarity > similarityThreshold) {
          similarPairs.push({
            original: s1.trim(),
            matched: s2.trim(),
            score: similarity
          });
        }
      }
    }
    
    // Sort by similarity score (highest first) and take top 5
    return similarPairs.sort((a, b) => b.score - a.score).slice(0, 5);
  };

  // Function to analyze the uploaded document
  const analyzeDocument = async () => {
    if (!uploadedContent || uploadedContent.trim() === "") {
      setError("Please upload a document to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setSimilarityResults([]);
    setError(null);
    
    try {
      const results: SimilarityResult[] = [];
      let totalSimilarity = 0;
      
      // Process each reference document
      for (let i = 0; i < referenceDocuments.length; i++) {
        const doc = referenceDocuments[i];
        
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Calculate similarity score
        const similarityScore = calculateCosineSimilarity(doc.content, uploadedContent);
        
        // Find similar sentences
        const similarSentences = findSimilarSentences(doc.content, uploadedContent);
        
        // Add to results
        results.push({
          documentId: doc.id,
          documentTitle: doc.title,
          similarityScore,
          similarSentences
        });
        
        totalSimilarity += similarityScore;
        
        // Update progress
        setAnalysisProgress(Math.round(((i + 1) / referenceDocuments.length) * 100));
      }
      
      // Calculate overall similarity
      const avgSimilarity = totalSimilarity / referenceDocuments.length;
      setOverallSimilarity(avgSimilarity);
      
      // Sort results by similarity score (highest first)
      setSimilarityResults(results.sort((a, b) => b.similarityScore - a.similarityScore));
      
    } catch (err) {
      setError("An error occurred during analysis. Please try again.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
      setAnalysisProgress(100);
    }
  };

  // Function to get color based on similarity score
  const getSimilarityColor = (score: number): string => {
    if (score < 0.3) return "text-green-600";
    if (score < 0.6) return "text-yellow-600";
    return "text-red-600";
  };

  // Function to get plagiarism status
  const getPlagiarismStatus = (score: number): string => {
    if (score < 0.3) return "Low similarity - Likely original";
    if (score < 0.6) return "Moderate similarity - Some concern";
    return "High similarity - Potential plagiarism";
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Green AI Plagiarism Checker</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column: Reference documents */}
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Reference Documents</CardTitle>
                <CardDescription>
                  These documents will be used as the reference database for plagiarism detection.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="py-4 text-center text-gray-500">Loading reference materials...</div>
                ) : (
                  <ul className="space-y-3">
                    {referenceDocuments.map((doc) => (
                      <li key={doc.id} className="border rounded-md p-3">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-blue-500 mt-1" />
                          <div>
                            <h3 className="font-medium">{doc.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                              {doc.content.substring(0, 100)}...
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Middle column: Upload and analyze */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Document</CardTitle>
                <CardDescription>
                  Upload your document on Green AI to check for potential plagiarism.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-3">
                    Drag and drop or click to upload your document
                  </p>
                  <Input
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="max-w-xs mx-auto"
                  />
                </div>

                {uploadedFile && (
                  <div className="bg-gray-50 p-3 rounded-md">
                    <p className="text-sm font-medium">
                      File loaded: {uploadedFile.name}
                    </p>
                    <div className="mt-2">
                      <Button onClick={analyzeDocument} disabled={isAnalyzing}>
                        {isAnalyzing ? "Analyzing..." : "Check for Plagiarism"}
                      </Button>
                    </div>
                  </div>
                )}

                {isAnalyzing && (
                  <div className="space-y-2">
                    <p className="text-sm">Analyzing document...</p>
                    <Progress value={analysisProgress} className="h-2" />
                  </div>
                )}

                {error && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Results card */}
            {similarityResults.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Plagiarism Analysis Results</CardTitle>
                  <CardDescription>
                    Overall similarity score: 
                    <span className={`font-bold ml-2 ${getSimilarityColor(overallSimilarity)}`}>
                      {(overallSimilarity * 100).toFixed(1)}%
                    </span>
                    <span className="ml-2">
                      ({getPlagiarismStatus(overallSimilarity)})
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {similarityResults.map((result) => (
                      <div key={result.documentId} className="border-b pb-4">
                        <h3 className="font-medium text-lg">
                          {result.documentTitle}
                        </h3>
                        <p className="flex items-center gap-2 my-2">
                          <span>Similarity score:</span>
                          <span className={`font-bold ${getSimilarityColor(result.similarityScore)}`}>
                            {(result.similarityScore * 100).toFixed(1)}%
                          </span>
                        </p>

                        {result.similarSentences.length > 0 && (
                          <div className="mt-3">
                            <h4 className="text-sm font-medium mb-2">Similar content found:</h4>
                            <ul className="space-y-3 bg-gray-50 p-3 rounded-md">
                              {result.similarSentences.map((pair, idx) => (
                                <li key={idx} className="text-sm">
                                  <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white p-2 rounded border">
                                      <span className="block text-xs text-gray-500 mb-1">Reference:</span>
                                      {pair.original}
                                    </div>
                                    <div className="bg-white p-2 rounded border">
                                      <span className="block text-xs text-gray-500 mb-1">Your document:</span>
                                      {pair.matched}
                                    </div>
                                  </div>
                                  <div className="text-right text-xs mt-1">
                                    <span className={getSimilarityColor(pair.score)}>
                                      {(pair.score * 100).toFixed(1)}% similar
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GreenAIPlagiarismChecker;