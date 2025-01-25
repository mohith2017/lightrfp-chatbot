import type { Attachment } from 'ai';

import { FileIcon, LoaderIcon } from './icons';

export const PreviewAttachment = ({
  attachment,
  isUploading = false,
}: {
  attachment: Attachment;
  isUploading?: boolean;
}) => {
  const { name, url, contentType } = attachment;

  return (
    <div className="flex flex-col gap-2">
      <div className="w-20 h-16 aspect-video bg-muted rounded-md relative flex flex-col items-center justify-center">
        {contentType ? (
          contentType.startsWith('image') ? (
            // NOTE: it is recommended to use next/image for images
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={url}
              src={url}
              alt={name ?? 'An image attachment'}
              className="rounded-md size-full object-cover"
            />
          ) : contentType === 'application/pdf' ? (
            <iframe
              key={url}
              src={url}
              title={name ?? 'PDF attachment'}
              className="w-full h-full"
            />
          ) : contentType === 'application/msword' || contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ? (
            <a
              href={url}
              download
              className="w-full h-full flex items-center justify-center"
            >
              <FileIcon />
              <span>Download</span>
            </a>
          ) : contentType === 'text/plain' || contentType === 'application/rtf' || contentType === 'application/vnd.oasis.opendocument.text' ? (
            <a
              href={url}
              download
              className="w-full h-full flex items-center justify-center"
            >
              <FileIcon />
              <span>Download</span>
            </a>
          ) : contentType === 'application/vnd.ms-powerpoint' || contentType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ? (
            <a
              href={url}
              download
              className="w-full h-full flex items-center justify-center"
            >
              <FileIcon />
              <span>Download</span>
            </a>
          ) : contentType === 'application/vnd.ms-excel' || contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ? (
            <a
              href={url}
              download
              className="w-full h-full flex items-center justify-center"
            >
              <FileIcon />
              <span>Download</span>
            </a>
          ) : contentType === 'text/html' || contentType === 'text/markdown' ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full h-full flex items-center justify-center"
            >
              <FileIcon />
              <span>View</span>
            </a>
          ) : contentType === 'application/zip' || contentType === 'application/x-rar-compressed' || contentType === 'application/x-tar' || contentType === 'application/x-7z-compressed' ? (
            <a
              href={url}
              download
              className="w-full h-full flex items-center justify-center"
            >
              <FileIcon />
              <span>Download</span>
            </a>
          ) : (
            <div className="" />
          )
        ) : (
          <div className="" />
        )}

        {isUploading && (
          <div className="animate-spin absolute text-zinc-500">
            <LoaderIcon />
          </div>
        )}
      </div>
      <div className="text-xs text-zinc-500 max-w-16 truncate">{name}</div>
    </div>
  );
};
