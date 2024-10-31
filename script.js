const pdfPath = 'assets/pdf/sample.pdf'; // Path to the single PDF file
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';

const pdfContainer = document.getElementById('pdf-container');

// Function to render the PDF
async function renderPdf() {
    try {
        const pdfDoc = await pdfjsLib.getDocument(pdfPath).promise;
        const page = await pdfDoc.getPage(1); // Display the first page (modify for multi-page support if needed)
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement('canvas');
        pdfContainer.innerHTML = ''; // Clear any existing content in the container
        pdfContainer.appendChild(canvas);
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport: viewport }).promise;
    } catch (error) {
        console.error('Error rendering PDF:', error);
    }
}

// Ensure the PDF renders as soon as the page loads
window.onload = renderPdf;
