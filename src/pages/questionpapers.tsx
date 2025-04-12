// import { useState, useEffect } from 'react';
// import { MainLayout } from "@/components/layout/main-layout";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { BookOpen, Download, FileUp, Filter, Trash2 } from "lucide-react";
// import { uploadPaper, fetchPapers, downloadPaper, deletePaper } from '../lib/fileService';

// interface PaperFile {
//   id: string;
//   fileName: string;
//   fileUrl: string;
//   uploadDate: string;
//   semesterId: string;
//   subjectId: string;
// }

// const semesters = [
//   { id: 'sem1', name: 'Semester 1' },
//   { id: 'sem2', name: 'Semester 2' },
//   { id: 'sem3', name: 'Semester 3' },
// ];

// const subjects = [
//   { id: 'agile', name: 'Agile', semesterId: 'sem1' },
//   { id: 'daa', name: 'DAA', semesterId: 'sem1' },
//   { id: 'dbms', name: 'DBMS', semesterId: 'sem2' },
//   { id: 'deep-learning', name: 'Deep Learning', semesterId: 'sem2' },
//   { id: 'dsca', name: 'DSCA', semesterId: 'sem2' },
//   { id: 'iot', name: 'IOT', semesterId: 'sem3' },
//   { id: 'os', name: 'OS', semesterId: 'sem3' },
//   { id: 'cloud-computing', name: 'Cloud Computing', semesterId: 'sem3' },
// ];

// const QuestionPapers = () => {
//   const [files, setFiles] = useState<PaperFile[]>([]);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [selectedSemester, setSelectedSemester] = useState<string>('');
//   const [selectedSubject, setSelectedSubject] = useState<string>('');
//   const [filteredSubjects, setFilteredSubjects] = useState(subjects);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     loadPapers();
//   }, []);

//   useEffect(() => {
//     if (selectedSemester) {
//       setFilteredSubjects(subjects.filter(subject => subject.semesterId === selectedSemester));
//     } else {
//       setFilteredSubjects([]);
//     }
//     setSelectedSubject('');
//   }, [selectedSemester]);

//   const loadPapers = async (semId?: string, subId?: string) => {
//     setIsLoading(true);
//     const papersList = await fetchPapers(semId, subId);
//     setFiles(papersList);
//     setIsLoading(false);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setSelectedFile(e.target.files[0]);
//       setError('');
//     }
//   };

//   const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedSemester(e.target.value);
//   };

//   const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedSubject(e.target.value);
//   };

//   const handleFilter = () => {
//     loadPapers(selectedSemester, selectedSubject);
//   };

//   const handleClearFilters = () => {
//     setSelectedSemester('');
//     setSelectedSubject('');
//     loadPapers();
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) return setError('Please select a file first');
//     if (!selectedSemester) return setError('Please select a semester');
//     if (!selectedSubject) return setError('Please select a subject');

//     setIsUploading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const result = await uploadPaper(selectedFile, selectedSemester, selectedSubject);
//       if (result.success) {
//         setSuccess(`File "${selectedFile.name}" uploaded successfully!`);
//         setSelectedFile(null);
//         const fileInput = document.getElementById('file-upload') as HTMLInputElement;
//         if (fileInput) fileInput.value = '';
//         await loadPapers(selectedSemester, selectedSubject);
//       } else {
//         setError(result.error || 'Upload failed. Please try again.');
//       }
//     } catch (err) {
//       setError('An error occurred during upload.');
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   const handleDownload = async (file: PaperFile) => {
//     const success = await downloadPaper(file.fileUrl, file.fileName);
//     if (!success) setError('Failed to download the file.');
//   };

//   const handleDelete = async (id: string) => {
//     if (!window.confirm('Are you sure you want to delete this file?')) return;
//     const success = await deletePaper(id);
//     if (success) {
//       setSuccess('File deleted successfully!');
//       await loadPapers(selectedSemester, selectedSubject);
//     } else {
//       setError('Failed to delete the file.');
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
//   };

//   const getSubjectName = (subjectId: string) => {
//     const subject = subjects.find(s => s.id === subjectId);
//     return subject ? subject.name : 'Unknown Subject';
//   };

//   const getSemesterName = (semesterId: string) => {
//     const semester = semesters.find(s => s.id === semesterId);
//     return semester ? semester.name : 'Unknown Semester';
//   };

//   return (
//     <MainLayout>
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold">Question Papers</h1>
//           <p className="text-muted-foreground mt-1">Upload and access previous question papers for all subjects</p>
//         </div>

//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <FileUp className="h-5 w-5" />
//               Upload Question Papers
//             </CardTitle>
//             <CardDescription>Add new question papers to the repository</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="semester-select" className="text-sm font-medium">Semester:</label>
//                 <select 
//                   id="semester-select" 
//                   value={selectedSemester}
//                   onChange={handleSemesterChange}
//                   className="w-full px-3 py-2 border rounded-md"
//                 >
//                   <option value="">Select Semester</option>
//                   {semesters.map(s => (
//                     <option key={s.id} value={s.id}>{s.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label htmlFor="subject-select" className="text-sm font-medium">Subject:</label>
//                 <select 
//                   id="subject-select" 
//                   value={selectedSubject}
//                   onChange={handleSubjectChange}
//                   disabled={!selectedSemester}
//                   className="w-full px-3 py-2 border rounded-md"
//                 >
//                   <option value="">Select Subject</option>
//                   {filteredSubjects.map(s => (
//                     <option key={s.id} value={s.id}>{s.name}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 mt-4">
//               <input
//                 type="file"
//                 id="file-upload"
//                 onChange={handleFileChange}
//                 accept=".pdf,.doc,.docx"
//                 className="hidden"
//               />
//               <label 
//                 htmlFor="file-upload" 
//                 className="px-4 py-2 border rounded cursor-pointer"
//               >
//                 {selectedFile ? selectedFile.name : 'Choose File'}
//               </label>
//               <Button 
//                 onClick={handleUpload} 
//                 disabled={!selectedFile || !selectedSemester || !selectedSubject || isUploading}
//               >
//                 {isUploading ? 'Uploading...' : 'Upload Paper'}
//               </Button>
//             </div>

//             {error && (
//               <Alert variant="destructive" className="mt-4">
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
//             {success && (
//               <Alert className="mt-4 border-green-500 bg-green-50 text-green-700">
//                 <AlertDescription>{success}</AlertDescription>
//               </Alert>
//             )}
//           </CardContent>
//         </Card>

//         <Card>
//           <CardHeader className="flex flex-row justify-between">
//             <div>
//               <CardTitle className="flex items-center gap-2">
//                 <BookOpen className="h-5 w-5" />
//                 Available Question Papers
//               </CardTitle>
//               <CardDescription>Browse and download previous question papers</CardDescription>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="grid md:grid-cols-3 gap-4 mb-4">
//               <div>
//                 <label className="text-sm font-medium">Filter by Semester:</label>
//                 <select 
//                   value={selectedSemester}
//                   onChange={handleSemesterChange}
//                   className="w-full px-3 py-2 border rounded-md"
//                 >
//                   <option value="">All Semesters</option>
//                   {semesters.map(s => (
//                     <option key={s.id} value={s.id}>{s.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div>
//                 <label className="text-sm font-medium">Filter by Subject:</label>
//                 <select 
//                   value={selectedSubject}
//                   onChange={handleSubjectChange}
//                   disabled={!selectedSemester}
//                   className="w-full px-3 py-2 border rounded-md"
//                 >
//                   <option value="">All Subjects</option>
//                   {filteredSubjects.map(s => (
//                     <option key={s.id} value={s.id}>{s.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="flex items-end gap-2">
//                 <Button onClick={handleFilter} variant="outline">
//                   <Filter className="h-4 w-4 mr-2" /> Apply Filters
//                 </Button>
//                 <Button onClick={handleClearFilters} variant="ghost">
//                   Clear
//                 </Button>
//               </div>
//             </div>

//             {isLoading ? (
//               <p>Loading papers...</p>
//             ) : files.length === 0 ? (
//               <p>No papers found.</p>
//             ) : (
//               <div className="space-y-4">
//                 {files.map(file => (
//                   <div key={file.id} className="border p-4 rounded flex justify-between items-center">
//                     <div>
//                       <p className="font-semibold">{file.fileName}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {getSemesterName(file.semesterId)} | {getSubjectName(file.subjectId)} | Uploaded on {formatDate(file.uploadDate)}
//                       </p>
//                     </div>
//                     <div className="flex gap-3">
//                       <Button size="sm" variant="outline" onClick={() => handleDownload(file)}>
//                         <Download className="h-4 w-4 mr-1" /> Download
//                       </Button>
//                       <Button size="sm" variant="destructive" onClick={() => handleDelete(file.id)}>
//                         <Trash2 className="h-4 w-4 mr-1" /> Delete
//                       </Button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </MainLayout>
//   );
// };

// export default QuestionPapers;
import { useState, useEffect } from 'react';
import { MainLayout } from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BookOpen, Download, Filter } from "lucide-react";

// Predefined papers structure with built-in files
const predefinedPapers = [
  // Semester 1
  {
    id: '1-agile-2023',
    fileName: 'Agile_May_2023.pdf',
    fileUrl: 'D:/SEM-6/Tech Tank/socse-student-hub/socse-student-hu/\public/Agilesw-assignment1-process.pdf', 
    uploadDate: '2023-06-10',
    semesterId: 'sem1',
    subjectId: 'agile',
    year: '2023'
  },
  {
    id: '2-agile-2022',
    fileName: 'Agile_May_2022.pdf',
    fileUrl: 'D:/SEM-6/Tech Tank/socse-student-hub/socse-student-hub/public/Agilesw-assignment2-Scrum.pdf',
    uploadDate: '2022-06-15',
    semesterId: 'sem1',
    subjectId: 'agile',
    year: '2022'
  },
  {
    id: '3-daa-2023',
    fileName: 'DAA_May_2023.pdf',
    fileUrl: 'D:/SEM-6/Tech Tank/socse-student-hub/socse-student-hub/public/IA2_CS2000_DAA_model_question_paper.pdf.pdf',
    uploadDate: '2023-06-12',
    semesterId: 'sem1',
    subjectId: 'daa',
    year: '2023'
  },
  {
    id: '4-daa-2022',
    fileName: 'DAA_May_2022.pdf',
    fileUrl: 'D:/SEM-6/Tech Tank/socse-student-hub/socse-student-hub/public/DAA_Class_Test1_Sample_QP.pdf',
    uploadDate: '2022-06-14',
    semesterId: 'sem1',
    subjectId: 'daa',
    year: '2022'
  },
  
  // Semester 2
  {
    id: '5-dbms-2023',
    fileName: 'DBMS_Dec_2023.pdf',
    fileUrl: '/papers/sem2/dbms/DBMS_Dec_2023.pdf',
    uploadDate: '2024-01-15',
    semesterId: 'sem2',
    subjectId: 'dbms',
    year: '2023'
  },
  {
    id: '6-dbms-2022',
    fileName: 'DBMS_Dec_2022.pdf',
    fileUrl: '/papers/sem2/dbms/DBMS_Dec_2022.pdf',
    uploadDate: '2023-01-10',
    semesterId: 'sem2',
    subjectId: 'dbms',
    year: '2022'
  },
  {
    id: '7-deep-learning-2023',
    fileName: 'Deep_Learning_Dec_2023.pdf',
    fileUrl: '',
    uploadDate: '2024-01-12',
    semesterId: 'sem2',
    subjectId: 'deep-learning',
    year: '2023'
  },
  {
    id: '8-dsca-2023',
    fileName: 'DSCA_Dec_2023.pdf',
    fileUrl: '/papers/sem2/dsca/DSCA_Dec_2023.pdf',
    uploadDate: '2024-01-14',
    semesterId: 'sem2',
    subjectId: 'dsca',
    year: '2023'
  },
  
  // Semester 3
  {
    id: '9-iot-2023',
    fileName: 'IOT_May_2023.pdf',
    fileUrl: 'D:/SEM-6/Tech Tank/socse-student-hub/socse-student-hub/public/CS3100_IoT_EC_CP1_set1_3Sep24_Q_A.pdf',
    uploadDate: '2023-06-20',
    semesterId: 'sem3',
    subjectId: 'iot',
    year: '2023'
  },
  {
    id: '10-os-2023',
    fileName: 'OS_May_2023.pdf',
    fileUrl: 'D:/SEM-6/Tech Tank/socse-student-hub/socse-student-hub/public/OS_SS_IA_1_Q_A-14Sep23_Set-1.pdf',
    uploadDate: '2023-06-18',
    semesterId: 'sem3',
    subjectId: 'os',
    year: '2023'
  },
  {
    id: '11-cloud-computing-2023',
    fileName: 'Cloud_Computing_May_2023.pdf',
    fileUrl: '/papers/sem3/cloud-computing/Cloud_Computing_May_2023.pdf',
    uploadDate: '2023-06-22',
    semesterId: 'sem3',
    subjectId: 'cloud-computing',
    year: '2023'
  },
  {
    id: '12-cloud-computing-2022',
    fileName: 'Cloud_Computing_May_2022.pdf',
    fileUrl: '/papers/sem3/cloud-computing/Cloud_Computing_May_2022.pdf',
    uploadDate: '2022-06-25',
    semesterId: 'sem3',
    subjectId: 'cloud-computing',
    year: '2022'
  }
];

interface PaperFile {
    id: string;
    fileName: string;
    fileUrl: string;
    uploadDate: string;
    semesterId: string;
    subjectId: string;
    year: string;
  }
  
  const semesters = [
    { id: 'sem1', name: 'Semester 1' },
    { id: 'sem2', name: 'Semester 2' },
    { id: 'sem3', name: 'Semester 3' },
  ];
  
  const subjects = [
    { id: 'agile', name: 'Agile', semesterId: 'sem1' },
    { id: 'daa', name: 'DAA', semesterId: 'sem1' },
    { id: 'dbms', name: 'DBMS', semesterId: 'sem2' },
    { id: 'deep-learning', name: 'Deep Learning', semesterId: 'sem2' },
    { id: 'dsca', name: 'DSCA', semesterId: 'sem2' },
    { id: 'iot', name: 'IOT', semesterId: 'sem3' },
    { id: 'os', name: 'OS', semesterId: 'sem3' },
    { id: 'cloud-computing', name: 'Cloud Computing', semesterId: 'sem3' },
  ];
  
  const years = ['2023', '2022', '2021'];
  
  const QuestionPapers = () => {
    const [selectedSemester, setSelectedSemester] = useState<string>('');
    const [selectedSubject, setSelectedSubject] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [filteredSubjects, setFilteredSubjects] = useState(subjects);
    const [filteredPapers, setFilteredPapers] = useState<PaperFile[]>(predefinedPapers);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    // Update available subjects when semester changes
    useEffect(() => {
      if (selectedSemester) {
        setFilteredSubjects(subjects.filter(subject => subject.semesterId === selectedSemester));
        // If previously selected subject doesn't belong to new semester, reset it
        if (selectedSubject && !subjects.find(s => s.id === selectedSubject && s.semesterId === selectedSemester)) {
          setSelectedSubject('');
        }
      } else {
        setFilteredSubjects(subjects);
      }
    }, [selectedSemester, selectedSubject]);
  
    // Load all papers on initial load
    useEffect(() => {
      applyFilters();
    }, []);
  
    const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSemester(e.target.value);
    };
  
    const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedSubject(e.target.value);
    };
  
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedYear(e.target.value);
    };
  
    const applyFilters = () => {
      setIsLoading(true);
      setError('');
      
      try {
        // Start with all papers
        let filtered = [...predefinedPapers];
        
        // Apply semester filter if selected
        if (selectedSemester) {
          filtered = filtered.filter(paper => paper.semesterId === selectedSemester);
        }
        
        // Apply subject filter if selected
        if (selectedSubject) {
          filtered = filtered.filter(paper => paper.subjectId === selectedSubject);
        }
        
        // Apply year filter if selected
        if (selectedYear) {
          filtered = filtered.filter(paper => paper.year === selectedYear);
        }
        
        console.log('Applied filters:', { 
          semester: selectedSemester, 
          subject: selectedSubject, 
          year: selectedYear,
          resultCount: filtered.length 
        });
        
        setFilteredPapers(filtered);
      } catch (err) {
        console.error('Error applying filters:', err);
        setError('Failed to apply filters. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleClearFilters = () => {
      setSelectedSemester('');
      setSelectedSubject('');
      setSelectedYear('');
      setFilteredPapers(predefinedPapers);
    };
  
    const handleDownload = async (file: PaperFile) => {
      try {
        // Create a link element
        const link = document.createElement('a');
        
        // Set the href to the file URL (which is relative to the public directory)
        link.href = file.fileUrl;
        
        // Set download attribute to force download instead of navigation
        link.download = file.fileName;
        
        // Append to body
        document.body.appendChild(link);
        
        // Trigger click
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        
        setSuccess(`Downloading ${file.fileName}...`);
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        console.error('Download error:', err);
        setError('Failed to download the file.');
      }
    };
  
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    };
  
    const getSubjectName = (subjectId: string) => {
      const subject = subjects.find(s => s.id === subjectId);
      return subject ? subject.name : 'Unknown Subject';
    };
  
    const getSemesterName = (semesterId: string) => {
      const semester = semesters.find(s => s.id === semesterId);
      return semester ? semester.name : 'Unknown Semester';
    };
  
    return (
      <MainLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Question Papers</h1>
            <p className="text-muted-foreground mt-1">Access previous question papers for all subjects</p>
          </div>
  
          <Card>
            <CardHeader className="flex flex-row justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Available Question Papers
                </CardTitle>
                <CardDescription>Browse and download previous question papers</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium">Filter by Semester:</label>
                  <select 
                    value={selectedSemester}
                    onChange={handleSemesterChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">All Semesters</option>
                    {semesters.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Filter by Subject:</label>
                  <select 
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                    disabled={!selectedSemester}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">All Subjects</option>
                    {filteredSubjects.map(s => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Filter by Year:</label>
                  <select 
                    value={selectedYear}
                    onChange={handleYearChange}
                    className="w-full px-3 py-2 border rounded-md"
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end gap-2">
                  <Button onClick={applyFilters} variant="outline">
                    <Filter className="h-4 w-4 mr-2" /> Apply Filters
                  </Button>
                  <Button onClick={handleClearFilters} variant="ghost">
                    Clear
                  </Button>
                </div>
              </div>
  
              {error && (
                <Alert variant="destructive" className="mt-4 mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="mt-4 mb-4 border-green-500 bg-green-50 text-green-700">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
  
              {isLoading ? (
                <p>Loading papers...</p>
              ) : filteredPapers.length === 0 ? (
                <p>No papers found for the selected filters.</p>
              ) : (
                <div className="space-y-4">
                  {filteredPapers.map(file => (
                    <div key={file.id} className="border p-4 rounded flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{file.fileName}</p>
                        <p className="text-sm text-muted-foreground">
                          {getSemesterName(file.semesterId)} | {getSubjectName(file.subjectId)} | Added on {formatDate(file.uploadDate)}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button size="sm" variant="outline" onClick={() => handleDownload(file)}>
                          <Download className="h-4 w-4 mr-1" /> Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  };
  
  export default QuestionPapers;