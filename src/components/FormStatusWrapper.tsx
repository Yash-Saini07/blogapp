'use client'

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

// Wraps form fields to automatically disable them during server action submission
export function FormFieldset({ children }: { children: React.ReactNode }) {
    const { pending } = useFormStatus();
    return (
        <fieldset disabled={pending} className="group w-full disabled:opacity-80">
            {children}
        </fieldset>
    );
}

interface SubmitButtonProps {
    defaultText: string;
    pendingText: string;
}

// Automatically handles loading state text and styling during submission
export function SubmitButton({ defaultText, pendingText }: SubmitButtonProps) {
    const { pending } = useFormStatus();
    
    return (
        <Button
            type="submit"
            variant="default"
            disabled={pending}
            className={pending ? "opacity-50 cursor-not-allowed disabled:cursor-not-allowed" : ""}
        >
            {pending ? pendingText : defaultText}
        </Button>
    );
}
