'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
    defaultValue?: string;
}

export default function ImageUpload({ defaultValue = '' }: ImageUploadProps) {
    const [previewUrl, setPreviewUrl] = useState(defaultValue);
    const inputFileRef = useRef<HTMLInputElement>(null);

    // Update local state if defaultValue changes (optional, but good for edits)
    useEffect(() => {
        setPreviewUrl(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        // Cleanup object URL to prevent memory leaks when component unmounts or previewUrl changes
        return () => {
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Create a local object URL for instant preview without uploading
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
    };

    const handleRemove = () => {
        setPreviewUrl('');
        if (inputFileRef.current) {
            inputFileRef.current.value = '';
        }
    };

    return (
        <div className="space-y-4 w-full">
            {/* If we have a previewUrl but it is exactly the defaultValue, 
                we submit it as a hidden input so the server knows the user didn't change the image. */}
            {previewUrl && previewUrl === defaultValue && (
                <input type="hidden" name="existingImage" value={defaultValue} />
            )}

            {previewUrl && previewUrl.length > 5 ? (
                <div className="relative w-full max-w-md h-48 rounded-lg overflow-hidden border border-border group">
                    <Image
                        src={previewUrl}
                        alt="Uploaded preview"
                        fill
                        unoptimized={true} // Unoptimized ensures robust admin previews without relying on Next.js optimizer domains
                        className="object-cover"
                    />
                    <button
                        type="button"
                        onClick={handleRemove}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-md relative">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => inputFileRef.current?.click()}
                        className="w-full h-32 border-dashed flex flex-col gap-2 bg-secondary/30 hover:bg-secondary/50"
                    >
                        <ImagePlus size={24} className="text-muted-foreground" />
                        <span className="text-muted-foreground">Select Cover Image</span>
                    </Button>
                </div>
            )}

            {/* The actual file input is hidden but active, meaning its File will be submitted with the form */}
            <input
                type="file"
                name="imageFile"
                accept="image/*"
                className="hidden"
                ref={inputFileRef}
                onChange={handleFileChange}
            />
        </div>
    );
}
