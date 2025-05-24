// components/DetectionResults.jsx
import React, { useRef, useEffect, useState } from 'react';
import styles from '../styles/DetectionResult.module.css'; // CSS-модули для стилей
import shared from '../styles/Shared.module.css';

const DetectionResults = ({ previewUrl, results }) => {
  const imgRef = useRef(null);
  const [scale, setScale] = useState({ x: 1, y: 1 });




useEffect(() => {
  console.log('useEffect triggered', results);

  if (imgRef.current && results?.original_size) {
    const { clientWidth, clientHeight } = imgRef.current;
    const [origW, origH] = results.original_size;
    console.log('Image size:', clientWidth, clientHeight);
    console.log('Original size:', origW, origH);
    setScale({ x: clientWidth / origW, y: clientHeight / origH });
  }
}, [results]);




  if (!results?.detections || !previewUrl) return null;

  return (
    <div className="mt-8">
      <h2 className={shared.heading}>Detection Results</h2>

      <div className={shared.container}>
        <div className={styles.imageWrapper}>
          <img
			  ref={imgRef}
			  src={previewUrl}
			  alt="Original"
			  className={styles.image}
			  onLoad={() => {
				if (imgRef.current && results?.original_size) {
				  const { naturalWidth, naturalHeight } = imgRef.current;
				  const [origW, origH] = results.original_size;
				  setScale({ x: naturalWidth / origW, y: naturalHeight / origH });
				}
			  }}
			/>
			
			
{results.detections.map((det, index) => {
  const [x1, y1, x2, y2] = det.bbox;
  const binStatus = results.messages?.bin_statuses?.find(
    bin => bin.bin_label === det.label
  );

  const isOverfilled = binStatus?.is_overfilled ?? false;
  const fillRatio = binStatus?.fill_ratio ?? null;
  const IsBin = det.class === 'bin';
  const IsTires = det.class === 'tires';
  const IsTrash = det.class === 'trash';
  
  let bboxClass = styles.bbox;
  let labelClass = styles.label;


  if (IsTrash) {
    bboxClass += ` ${styles.bboxTrash}`;
    labelClass += ` ${styles.labelTrash}`;
  } else if (IsBin) {
    if (isOverfilled) {
      bboxClass += ` ${styles.bboxOverfilled}`;
      labelClass += ` ${styles.labelOverfilled}`;
    } else {
      bboxClass += ` ${styles.bboxBin}`;
      labelClass += ` ${styles.labelBin}`;
    } 
  }
  else if(IsTires) {
	bboxClass += ` ${styles.bboxTires}`;
	labelClass += ` ${styles.labelTires}`;
	}
 

  let progressClass = styles.progressBar;
  if (fillRatio !== null) {
    if (fillRatio > 0.8) {
      progressClass = `${styles.progressBar} ${styles.progressBarCritical}`;
    } else if (fillRatio > 0.4) {
      progressClass = `${styles.progressBar} ${styles.progressBarHigh}`;
    }
  }
  

  const style = {
    left: `${x1 * scale.x}px`,
    top: `${y1 * scale.y}px`,
    width: `${(x2 - x1) * scale.x}px`,
    height: `${(y2 - y1) * scale.y}px`,
  };

  return (
    <div key={index} className={bboxClass} style={style}>
      <div className={labelClass}>
        {det.label} ({(det.confidence * 100).toFixed(1)}%)
        {isOverfilled && ' — бак переполнен'}
      </div>
      {fillRatio !== null && (
        <div className={styles.progressContainer}>
          <div
            className={progressClass}
            style={{ width: `${Math.round(fillRatio * 100)}%` }}
          ></div>
        </div>
      )}
    </div>
  );
})}


        </div>
	</div>
	
	{results?.messages?.tires_warning && (
  <div className={styles.warningBoxTires}>
    ⚠️ {results.messages.tires_warning}⚠️
  </div>
)}

{results.messages?.outside_trash?.length > 0 && (
  <div className={styles.warningBoxOutTrash}>
   ⚠️ Обнаружен мусор на земле. Вероятно, баки переполнены или площадка не убрана.⚠️
  </div>
)}

        {results.result_image_url && (
		<div>
          <h3 className={shared.heading}>YOLO Results</h3>
			<div className ={shared.container}>
				<img
				  src={`http://localhost:8000${results.result_image_url}`}
				  alt="Detection Results"
				  className={styles.image}
				/>
          </div>
		</div>
        )}
      
	
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Detection Details</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Label</th>
                <th className="px-4 py-2 text-left">Confidence</th>
                <th className="px-4 py-2 text-left">Bounding Box</th>
              </tr>
            </thead>
            <tbody>
              {results.detections.map((det, index) => (
                <tr key={index} className="border-t border-gray-200">
                  <td className="px-4 py-2">{det.label}</td>
                  <td className="px-4 py-2">{(det.confidence * 100).toFixed(1)}%</td>
                  <td className="px-4 py-2">[{det.bbox.join(', ')}]</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DetectionResults;
