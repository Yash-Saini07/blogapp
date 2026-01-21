'use client';

import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, X } from 'lucide-react';
import Image from 'next/image';

interface CloudinaryUploadProps {
    defaultValue?: string;
}

export default function CloudinaryUpload({ defaultValue = '' }: CloudinaryUploadProps) {
    const [imageUrl, setImageUrl] = useState(defaultValue);

    // Update local state if defaultValue changes (optional, but good for edits)
    useEffect(() => {
        setImageUrl(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
        if (imageUrl) {
            document.body.style.overflow = 'auto';
        }
    }, [imageUrl]);

    const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
            setImageUrl(result.info.secure_url as string);
            document.body.style.overflow = 'auto';
        }
    };

    const handleRemove = () => {
        setImageUrl('');
    }

    return (
        <div className="space-y-4 w-full">
            {/* Hidden input to ensure value is submitted with the form */}
            <input type="hidden" name="image" value={imageUrl} />

            {imageUrl ? (
                <div className="relative w-full max-w-md h-48 rounded-lg overflow-hidden border border-border group">
                    <Image
                        src={imageUrl}
                        alt="Uploaded image"
                        fill
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
                <CldUploadWidget
                    uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    onSuccess={handleUploadSuccess}
                    options={{
                        maxFiles: 1,
                        sources: ['local', 'url', 'camera'],
                    }}
                >
                    {({ open }) => {
                        return (
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => open()}
                                className="w-full max-w-md h-32 border-dashed flex flex-col gap-2 bg-secondary/30 hover:bg-secondary/50"
                            >
                                <ImagePlus size={24} className="text-muted-foreground" />
                                <span className="text-muted-foreground">Upload Cover Image</span>
                            </Button>
                        );
                    }}
                </CldUploadWidget>
            )}
        </div>
    );
}
