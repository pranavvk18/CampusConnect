// lib/fileService.ts - Enhanced version

interface UploadResponse {
    success: boolean;
    fileUrl?: string;
    fileName?: string;
    error?: string;
  }
  
  interface PaperFile {
    id: string;
    fileName: string;
    fileUrl: string;
    uploadDate: string;
    semesterId: string;
    subjectId: string;
  }
  
  // Store uploaded files in localStorage for this example
  // In a real application, this would be server storage
  const STORAGE_KEY = 'questionPapers';
  
  // Helper to save papers to localStorage
  const savePapers = (papers: PaperFile[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(papers));
  };
  
  // Helper to get papers from localStorage
  const getPapers = (): PaperFile[] => {
    const storedPapers = localStorage.getItem(STORAGE_KEY);
    return storedPapers ? JSON.parse(storedPapers) : [];
  };
  
  export const uploadPaper = async (
    file: File, 
    semesterId: string, 
    subjectId: string
  ): Promise<UploadResponse> => {
    try {
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('semesterId', semesterId);
      formData.append('subjectId', subjectId);
      
      // For a real backend, you would use this:
      // const response = await fetch('/api/upload-paper', {
      //   method: 'POST',
      //   body: formData
      // });
      // const data = await response.json();
      
      // For now, we'll use local storage as a simple database
      return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
          // Generate a file URL
          const fileUrl = URL.createObjectURL(file);
          
          // Create a new paper entry
          const newPaper: PaperFile = {
            id: Date.now().toString(),
            fileName: file.name,
            fileUrl: fileUrl,
            uploadDate: new Date().toISOString(),
            semesterId,
            subjectId
          };
          
          // Get existing papers and add the new one
          const papers = getPapers();
          papers.push(newPaper);
          savePapers(papers);
          
          resolve({
            success: true,
            fileName: file.name,
            fileUrl: fileUrl
          });
        }, 1000);
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      return {
        success: false,
        error: 'Failed to upload file. Please try again.'
      };
    }
  };
  
  export const fetchPapers = async (
    semesterId?: string, 
    subjectId?: string
  ): Promise<PaperFile[]> => {
    try {
      // In a real app with a backend:
      // const url = subjectId 
      //   ? /api/papers?semesterId=${semesterId}&subjectId=${subjectId}
      //   : semesterId 
      //     ? /api/papers?semesterId=${semesterId}
      //     : '/api/papers';
      // const response = await fetch(url);
      // const data = await response.json();
      
      // For this example, we'll retrieve from localStorage
      return new Promise((resolve) => {
        setTimeout(() => {
          const papers = getPapers();
          
          // Filter based on provided parameters
          const filteredPapers = papers.filter(paper => {
            if (semesterId && subjectId) {
              return paper.semesterId === semesterId && paper.subjectId === subjectId;
            } else if (semesterId) {
              return paper.semesterId === semesterId;
            }
            return true; // Return all papers if no filters provided
          });
          
          resolve(filteredPapers);
        }, 500);
      });
    } catch (error) {
      console.error('Error fetching papers:', error);
      return [];
    }
  };
  
  export const downloadPaper = async (fileUrl: string, fileName: string): Promise<boolean> => {
    try {
      // Create a download link and trigger it
      const a = document.createElement('a');
      a.href = fileUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return true;
    } catch (error) {
      console.error('Error downloading file:', error);
      return false;
    }
  };
  
  export const deletePaper = async (paperId: string): Promise<boolean> => {
    try {
      // For a real backend:
      // const response = await fetch(/api/papers/${paperId}, {
      //   method: 'DELETE'
      // });
      // return response.ok;
      
      // For localStorage implementation:
      return new Promise((resolve) => {
        setTimeout(() => {
          const papers = getPapers();
          const filteredPapers = papers.filter(paper => paper.id !== paperId);
          savePapers(filteredPapers);
          resolve(true);
        }, 500);
      });
    } catch (error) {
      console.error('Error deleting paper:', error);
      return false;
    }
  };