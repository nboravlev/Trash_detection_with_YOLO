import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload } from 'react-icons/fa';
import styles from '../styles/DropzoneArea.module.css';

const DropzoneArea = ({ onFileSelect }) => {
  const onDrop = useCallback(acceptedFiles => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      onFileSelect({ file: selectedFile, previewUrl });
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });



  return (
    <div
      {...getRootProps()}
      className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''}`}
    >
      <input {...getInputProps()} />
      <FaUpload className={styles.icon} />
      <div className={styles.textContainer}>
        <p className={styles.text}>
          {isDragActive ? 'Drop the image here...' : 'Drag & drop an image, or click to select'}
        </p>
        <p className={styles.subtext}>PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  );
};

export default DropzoneArea;