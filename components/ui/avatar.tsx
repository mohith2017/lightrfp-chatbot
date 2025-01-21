'use client';

import * as React from 'react';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
    ({ className, children, ...props }, ref) => (
        <div ref={ref} className={`relative inline-block ${className}`} {...props}>
            {children}
        </div>
    ),
);
Avatar.displayName = 'Avatar';

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    alt?: string;
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
    ({ src, alt = 'User Avatar', className, ...props }, ref) => (
        <img
            ref={ref}
            src={src}
            alt={alt}
            className={`rounded-full object-cover ${className}`}
            style={{ width: '40px', height: '40px' }} // Adjust size as needed
            {...props}
        />
    ),
);
AvatarImage.displayName = 'AvatarImage';

interface AvatarFallbackProps {
    className?: string;
    children: React.ReactNode;
}

const AvatarFallback: React.FC<AvatarFallbackProps> = ({ className, children }) => (
    <div className={`flex items-center justify-center rounded-full bg-gray-200 ${className}`} style={{ width: '40px', height: '40px' }}>
        {children}
    </div>
);
AvatarFallback.displayName = 'AvatarFallback';

export { Avatar, AvatarImage, AvatarFallback };
