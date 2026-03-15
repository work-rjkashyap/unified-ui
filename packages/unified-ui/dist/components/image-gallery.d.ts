import * as react from 'react';
import { ReactNode } from 'react';

interface GalleryImage {
    /** Image source URL. */
    src: string;
    /** Alt text for accessibility. */
    alt: string;
    /** Optional thumbnail URL (falls back to src). */
    thumbnail?: string;
    /** Optional caption shown in lightbox. */
    caption?: string;
}
interface ImageGalleryProps {
    /** Array of images to display. */
    images: GalleryImage[];
    /** Number of grid columns. @default 3 */
    columns?: 1 | 2 | 3 | 4;
    /** Gap between grid items in pixels. @default 8 */
    gap?: number;
    /** Aspect ratio for thumbnails. @default "square" */
    aspectRatio?: "square" | "video" | "auto";
    /** Whether to show the lightbox on click. @default true */
    lightbox?: boolean;
    /** Additional CSS classes on the grid container. */
    className?: string;
    /** Render custom thumbnail. */
    renderThumbnail?: (image: GalleryImage, index: number) => ReactNode;
}
/**
 * `ImageGallery` — a grid of images with optional lightbox viewer.
 *
 * @example
 * ```tsx
 * <ImageGallery
 *   images={[
 *     { src: "/photo-1.jpg", alt: "Beach sunset", caption: "Malibu, CA" },
 *     { src: "/photo-2.jpg", alt: "Mountain view" },
 *   ]}
 *   columns={3}
 * />
 * ```
 */
declare const ImageGallery: react.ForwardRefExoticComponent<ImageGalleryProps & react.RefAttributes<HTMLDivElement>>;

export { type GalleryImage, ImageGallery, type ImageGalleryProps };
