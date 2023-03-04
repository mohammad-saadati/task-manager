// import React, { useState, useRef, useEffect } from 'react';

// const Canvas = (props) => {
//   const canvasRef = useRef(null);
//   const [isPainting, setIsPainting] = useState(false);
//   const [mousePosition, setMousePosition] = useState(undefined);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = window.innerWidth * 2;
//     canvas.height = window.innerHeight * 2;
//     canvas.style.width = `${window.innerWidth}px`;
//     canvas.style.height = `${window.innerHeight}px`;

//     const context = canvas.getContext('2d');
//     context.scale(2, 2);
//     context.lineCap = 'round';
//     context.strokeStyle = 'black';
//     context.lineWidth = 5;
//   }, []);

//   const startPaint = (event) => {
//     const coordinates = getCoordinates(event);
//     if (coordinates) {
//       setMousePosition(coordinates);
//       setIsPainting(true);
//     }
//   };

//   const paint = (event) => {
//     if (isPainting) {
//       const newMousePosition = getCoordinates(event);
//       if (mousePosition && newMousePosition) {
//         drawLine(mousePosition, newMousePosition);
//         setMousePosition(newMousePosition);
//       }
//     }
//   };

//   const exitPaint = () => {
//     setIsPainting(false);
//   };

//   const getCoordinates = (event) => {
//     if (!canvasRef.current) {
//       return;
//     }

//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     return {
//       x: event.clientX - rect.left,
//       y: event.clientY - rect.top,
//     };
//   };

//   const drawLine = (originalMousePosition, newMousePosition) => {
//     if (!canvasRef.current) {
//       return;
//     }

//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     if (context) {
//       context.beginPath();
//       context.moveTo(originalMousePosition.x, originalMousePosition.y);
//       context.lineTo(newMousePosition.x, newMousePosition.y);
//       context.stroke();
//     }
//   };

//   return (
//     <canvas
//       onMouseDown={startPaint}
//       onMouseUp={exitPaint}
//       onMouseMove={paint}
//       ref={canvasRef}
//     />
//   );
// };

// export default Canvas;