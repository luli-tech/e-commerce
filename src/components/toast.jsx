import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

const Toast = () => {
    return (
        <div>
            <ToastContainer
                position="top-left"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition:Bounce
            />
        </div>
    );
};

export default Toast;