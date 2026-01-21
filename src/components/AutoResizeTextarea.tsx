'use client';

import React, { useRef, useEffect } from 'react';

// 1. Add minRows to your interface
interface AutoResizeTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    minRows?: number;
}

// 2. Destructure minRows out of props
export default function AutoResizeTextarea({ minRows, ...props }: AutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    useEffect(() => {
        adjustHeight();
    }, []);

    return (
        <textarea
            {...props}
            // 3. Use minRows to set the standard HTML 'rows' attribute
            rows={minRows} 
            ref={textareaRef}
            onInput={(e) => {
                adjustHeight();
                if (props.onInput) {
                    props.onInput(e);
                }
            }}
            className={`${props.className} overflow-hidden resize-none`}
        />
    );
}