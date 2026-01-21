"use client";

import { CldImage, CldImageProps } from 'next-cloudinary';

const CldImageWrapper = (props: CldImageProps) => {
    return <CldImage {...props} />;
};

export default CldImageWrapper;
