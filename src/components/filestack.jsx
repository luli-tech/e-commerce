import React, { useState, useEffect } from 'react';
import { client } from 'filestack-react';

const FileStack = ({ handlefileupload }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [uploaded, setUploaded] = useState('');
    const filestackApiKey = 'AOHmOfdMQjuQKBZngxLrAz'; // Replace with your Filestack API key

    const filePickerOptions = {
        accept: 'image/*',
        maxFiles: 1,
        onUploadDone: (res) => {
            if (res.filesUploaded && res.filesUploaded.length > 0) {
                const uploadedFileUrl = res.filesUploaded[0].url;
                setFile(uploadedFileUrl);
                setUploaded(uploadedFileUrl)
                handlefileupload(uploadedFileUrl)
                setLoading(true);
                console.log('Uploaded File Link:', uploadedFileUrl); // Corrected logging
                setError(null); // Clear any previous errors
            } else {
                setError('No files uploaded. Please try again.');
            }
        },
    };

    const handleFilePicker = (e) => {
        e.preventDefault();
        setError(null); // Clear any previous errors
        const filestackClient = client.init(filestackApiKey);
        const picker = filestackClient.picker(filePickerOptions);
        picker.open();
    };

    return (
        <div>
            <button
                onClick={handleFilePicker}
                disabled={loading}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    background: 'lavender',
                    cursor: loading ? 'not-allowed' : 'pointer',
                }}
            >
                Click to upload product image
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {file && <img src={file} alt="Uploaded" style={{ marginTop: '20px', maxWidth: '100%' }} />}
            <div>{uploaded}</div>
        </div>
    );
};

export default FileStack;
