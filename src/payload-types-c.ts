/* tslint:disable */
/* eslint-disable */
/** Split from generated src/payload-types.ts for upload size. */
import type { Config, Page, Post, User } from './payload-types-a'
export interface PagesSelect<T extends boolean = true> {
  title?: T;
  hero?:
    | T
    | {
        type?: T;
        richText?: T;
        links?:
          | T
          | {
              link?:
                | T
                | {
                    type?: T;
                    newTab?: T;
                    reference?: T;
                    url?: T;
                    label?: T;
                    appearance?: T;
                  };
              id?: T;
            };
        media?: T;
      };
  layout?:
    | T
    | {
        cta?: T | CallToActionBlockSelect<T>;
        content?: T | ContentBlockSelect<T>;
        mediaBlock?: T | MediaBlockSelect<T>;
        archive?: T | ArchiveBlockSelect<T>;
        formBlock?: T | FormBlockSelect<T>;
      };
  meta?:
    | T
    | {
        title?: T;
        image?: T;
        description?: T;
      };
  publishedAt?: T;
  generateSlug?: T;
  slug?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
export interface CallToActionBlockSelect<T extends boolean = true> {
  richText?: T;
  links?:
    | T
    | {
        link?:
          | T
          | {
              type?: T;
              newTab?: T;
              reference?: T;
              url?: T;
              label?: T;
              appearance?: T;
            };
        id?: T;
      };
  id?: T;
  blockName?: T;
}
export interface ContentBlockSelect<T extends boolean = true> {
  columns?:
    | T
    | {
        size?: T;
        richText?: T;
        enableLink?: T;
        link?:
          | T
          | {
              type?: T;
              newTab?: T;
              reference?: T;
              url?: T;
              label?: T;
              appearance?: T;
            };
        id?: T;
      };
  id?: T;
  blockName?: T;
}
export interface MediaBlockSelect<T extends boolean = true> {
  media?: T;
  id?: T;
  blockName?: T;
}
export interface ArchiveBlockSelect<T extends boolean = true> {
  introContent?: T;
  populateBy?: T;
  relationTo?: T;
  categories?: T;
  limit?: T;
  selectedDocs?: T;
  id?: T;
  blockName?: T;
}
export interface FormBlockSelect<T extends boolean = true> {
  form?: T;
  enableIntro?: T;
  introContent?: T;
  id?: T;
  blockName?: T;
}
export interface PostsSelect<T extends boolean = true> {
  title?: T;
  heroImage?: T;
  content?: T;
  relatedPosts?: T;
  categories?: T;
  meta?:
    | T
    | {
        title?: T;
        image?: T;
        description?: T;
      };
  publishedAt?: T;
  authors?: T;
  populatedAuthors?:
    | T
    | {
        id?: T;
        name?: T;
      };
  generateSlug?: T;
  slug?: T;
  updatedAt?: T;
  createdAt?: T;
  _status?: T;
}
export interface MediaSelect<T extends boolean = true> {
  alt?: T;
  caption?: T;
  folder?: T;
  updatedAt?: T;
  createdAt?: T;
  url?: T;
  thumbnailURL?: T;
  filename?: T;
  mimeType?: T;
  filesize?: T;
  width?: T;
  height?: T;
  focalX?: T;
  focalY?: T;
  sizes?:
    | T
    | {
        thumbnail?: T | { url?: T; width?: T; height?: T; mimeType?: T; filesize?: T; filename?: T };
        square?: T | { url?: T; width?: T; height?: T; mimeType?: T; filesize?: T; filename?: T };
        small?: T | { url?: T; width?: T; height?: T; mimeType?: T; filesize?: T; filename?: T };
        medium?: T | { url?: T; width?: T; height?: T; mimeType?: T; filesize?: T; filename?: T };
        large?: T | { url?: T; width?: T; height?: T; mimeType?: T; filesize?: T; filename?: T };
        xlarge?: T | { url?: T; width?: T; height?: T; mimeType?: T; filesize?: T; filename?: T };
        og?: T | { url?: T; width?: T; height?: T; mimeType?: T; filesize?: T; filename?: T };
      };
}
export interface CategoriesSelect<T extends boolean = true> {
  title?: T;
  generateSlug?: T;
  slug?: T;
  parent?: T;
  breadcrumbs?: T | { doc?: T; url?: T; label?: T; id?: T };
  updatedAt?: T;
  createdAt?: T;
}
export interface UsersSelect<T extends boolean = true> {
  name?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
  sessions?: T | { id?: T; createdAt?: T; expiresAt?: T };
}
export interface RedirectsSelect<T extends boolean = true> {
  from?: T;
  to?: T | { type?: T; reference?: T; url?: T };
  updatedAt?: T;
  createdAt?: T;
}
export interface FormsSelect<T extends boolean = true> {
  title?: T;
  fields?:
    | T
    | {
        checkbox?: T | { name?: T; label?: T; width?: T; required?: T; defaultValue?: T; id?: T; blockName?: T };
        country?: T | { name?: T; label?: T; width?: T; required?: T; id?: T; blockName?: T };
        email?: T | { name?: T; label?: T; width?: T; required?: T; id?: T; blockName?: T };
        message?: T | { message?: T; id?: T; blockName?: T };
        number?: T | { name?: T; label?: T; width?: T; defaultValue?: T; required?: T; id?: T; blockName?: T };
        select?: T | { name?: T; label?: T; width?: T; defaultValue?: T; placeholder?: T; options?: T | { label?: T; value?: T; id?: T }; required?: T; id?: T; blockName?: T };
        state?: T | { name?: T; label?: T; width?: T; required?: T; id?: T; blockName?: T };
        text?: T | { name?: T; label?: T; width?: T; defaultValue?: T; required?: T; id?: T; blockName?: T };
        textarea?: T | { name?: T; label?: T; width?: T; defaultValue?: T; required?: T; id?: T; blockName?: T };
      };
  submitButtonLabel?: T;
  confirmationType?: T;
  confirmationMessage?: T;
  redirect?: T | { url?: T };
  emails?: T | { emailTo?: T; cc?: T; bcc?: T; replyTo?: T; emailFrom?: T; subject?: T; message?: T; id?: T };
  updatedAt?: T;
  createdAt?: T;
}
export interface FormSubmissionsSelect<T extends boolean = true> {
  form?: T;
  submissionData?: T | { field?: T; value?: T; id?: T };
  updatedAt?: T;
  createdAt?: T;
}
export interface SearchSelect<T extends boolean = true> {
  title?: T;
  priority?: T;
  doc?: T;
  slug?: T;
  meta?: T | { title?: T; description?: T; image?: T };
  categories?: T | { relationTo?: T; categoryID?: T; title?: T; id?: T };
  updatedAt?: T;
  createdAt?: T;
}
export interface PayloadKvSelect<T extends boolean = true> {
  key?: T;
  data?: T;
}
export interface PayloadJobsSelect<T extends boolean = true> {
  input?: T;
  taskStatus?: T;
  completedAt?: T;
  totalTried?: T;
  hasError?: T;
  error?: T;
  log?: T | { executedAt?: T; completedAt?: T; taskSlug?: T; taskID?: T; input?: T; output?: T; state?: T; error?: T; id?: T };
  taskSlug?: T;
  queue?: T;
  waitUntil?: T;
  processing?: T;
  updatedAt?: T;
  createdAt?: T;
}
export interface PayloadFoldersSelect<T extends boolean = true> {
  name?: T;
  folder?: T;
  documentsAndFolders?: T;
  folderType?: T;
  updatedAt?: T;
  createdAt?: T;
}
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
export interface Header {
  id: number;
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({ relationTo: 'pages'; value: number | Page } | null)
            | ({ relationTo: 'posts'; value: number | Post } | null);
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
export interface Footer {
  id: number;
  navItems?:
    | {
        link: {
          type?: ('reference' | 'custom') | null;
          newTab?: boolean | null;
          reference?:
            | ({ relationTo: 'pages'; value: number | Page } | null)
            | ({ relationTo: 'posts'; value: number | Post } | null);
          url?: string | null;
          label: string;
        };
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
export interface HeaderSelect<T extends boolean = true> {
  navItems?: T | { link?: T | { type?: T; newTab?: T; reference?: T; url?: T; label?: T }; id?: T };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
export interface FooterSelect<T extends boolean = true> {
  navItems?: T | { link?: T | { type?: T; newTab?: T; reference?: T; url?: T; label?: T }; id?: T };
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
export interface CollectionsWidget {
  data?: { [k: string]: unknown };
  width: 'full';
}
export interface TaskSchedulePublish {
  input: {
    type?: ('publish' | 'unpublish') | null;
    locale?: string | null;
    doc?:
      | ({ relationTo: 'pages'; value: number | Page } | null)
      | ({ relationTo: 'posts'; value: number | Post } | null);
    global?: string | null;
    user?: (number | null) | User;
  };
  output?: unknown;
}
export interface BannerBlock {
  style: 'info' | 'warning' | 'error' | 'success';
  content: {
    root: {
      type: string;
      children: { type: any; version: number; [k: string]: unknown }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  id?: string | null;
  blockName?: string | null;
  blockType: 'banner';
}
export interface CodeBlock {
  language?: ('typescript' | 'javascript' | 'css') | null;
  code: string;
  id?: string | null;
  blockName?: string | null;
  blockType: 'code';
}
export interface Auth {
  [k: string]: unknown;
}
