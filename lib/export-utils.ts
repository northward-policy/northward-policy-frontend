import { toPng, toJpeg } from 'html-to-image';

/**
 * Downloads a DOM element as an image (PNG).
 * @param elementId The ID of the element to capture.
 * @param fileName The name of the file to save.
 */
export const downloadAsImage = async (elementId: string, fileName: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const dataUrl = await toPng(element, {
      backgroundColor: '#0f172a', // Matches typical dark theme background
      style: {
        borderRadius: '12px',
      }
    });
    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = dataUrl;
    link.click();
  } catch (err) {
    console.error('Error downloading image:', err);
  }
};

/**
 * Downloads data as a CSV file.
 * @param data Array of objects to export.
 * @param fileName The name of the file to save.
 */
export const downloadAsCSV = (data: any[], fileName: string) => {
  if (!data || data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(fieldName => {
        const value = row[fieldName];
        // Handle strings with commas
        const escaped = ('' + value).replace(/"/g, '""');
        return `"${escaped}"`;
      }).join(',')
    )
  ];

  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
