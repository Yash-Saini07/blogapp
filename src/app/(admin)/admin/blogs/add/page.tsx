'use client'
import { addBlog } from '@/actions/addBlog';
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectLabel
} from '@/components/ui/select';
import { ThemeToggleButton } from '@/components/ui/skiper26';
import { Button } from '@/components/ui/button';
import ImageUpload from '@/components/ImageUpload';

import { FormFieldset, SubmitButton } from '@/components/FormStatusWrapper';

export default function AddBlogPage() {
    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Write New Blog</h1>
                <ThemeToggleButton
                    variant='circle'
                    start="top-left" />
            </div>

            <form action={addBlog} className="bg-card p-8 rounded-lg shadow-md border border-border">
                <FormFieldset>
                    {/* Top Section: Meta Data */}
                    <div className="grid grid-cols-1 gap-6 mb-6">

                        {/* Title Input */}
                        <div className="col-span-2">
                            <label className="block text-sm font-medium text-foreground mb-2">Blog Title</label>
                            <Input
                                name="title"
                                type="text"
                                required
                                placeholder="Enter an engaging title..."
                                className="bg-secondary/80 border-transparent focus:border-ring"
                            />
                        </div>

                        {/* Type Dropdown */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                            <Select required name="type">
                                <SelectTrigger className="w-full max-w-48 bg-secondary/80 border-transparent focus:ring-ring">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="Technology">Technology</SelectItem>
                                        <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                                        <SelectItem value="Travel">Travel</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <br />
                        {/* Image URL Input */}
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Cover Image URL</label>
                            <ImageUpload />
                        </div>

                        {/* Description */}
                        <div className="col-span-2">
                            <FieldSet>
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel>
                                            Description
                                        </FieldLabel>
                                        <Textarea
                                            name="description"
                                            rows={2}
                                            required
                                            placeholder="A quick summary of what this post is about..."
                                            className="resize-none bg-secondary/80 border-transparent focus:border-ring"
                                        />
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                        </div>

                    </div>

                    {/* Body Editor (Notepad Style) */}
                    <div className="mt-8">
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Content (Markdown Supported)
                        </label>
                        <div className="relative">
                            <Textarea
                                name="body"
                                required
                                placeholder="# Start writing your story here..."
                                className="w-full min-h-[96px] p-6 rounded-lg border border-transparent focus:ring-2 focus:ring-blue-500 outline-none font-mono text-foreground leading-relaxed bg-secondary/80"
                            />

                            {/* Helper Text */}
                            <p className="text-xs text-muted-foreground mt-2 text-right">
                                {`Use **bold**, # headings, and > quotes`}
                            </p>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex justify-end">
                        <SubmitButton defaultText="Publish Blog" pendingText="Publishing..." />
                    </div>
                </FormFieldset>
            </form>
        </div>
    );
}