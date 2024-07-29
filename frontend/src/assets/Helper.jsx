export const formatTime = seconds => {
    if (isNaN(seconds)) return "00:00";
  
    const date = new Date(seconds * 1000);
  
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
  
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, "0")}:${ss}`;
    }
    return `${mm}:${ss}`;
  }; 
   
   
  export const formatTimeQuiz = seconds => {
    if (isNaN(seconds)) return "00:00";
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
  
    if (hours > 0) {
      return `${hours} hours and ${minutes} minutes`;
    }
    return `${minutes} minutes`;
  };