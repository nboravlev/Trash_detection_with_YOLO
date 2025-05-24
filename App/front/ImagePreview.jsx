// components/ImagePreview.jsx
import React, { useRef, useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import styles from '../styles/ImagePreview.module.css';
import shared from '../styles/Shared.module.css';

const ImagePreview = ({ previewUrl, onUpload, loading}) => {if (!previewUrl) return null;
  return (
      <div>
      <h2 className={shared.heading}>Preview</h2>
      <div className={`${shared.container} ${styles.previewContainer}`}>
        <img
          src={previewUrl}
          alt="Preview"
          className={styles.previewImage}
        />
      </div>

      <button
        onClick={onUpload}
        disabled={loading}
        className={shared.button}
      >
        {loading ? (
          <>
            <FaSpinner className={shared.spinner} />
            Processing...
          </>
        ) : (
          'Detect Objects'
        )}
      </button>
    </div>
  );
};

export default ImagePreview;
