# Payload CMS Tutorial

## Prerequisites

- pnpm
- Supabase
- Vercel

## Tutorial Setup

### Install Next.js dan Dependencies

1. Install next.js, pastikan untuk memilih opsi with typescript

   ```
   npx create-next-app@latest .
   ```

2. Install beberapa dependencies berikut

   ```
   pnpm add payload sharp graph @payloadcms/db-postgres @payloadcms/next  @payloadcms/richtext-lexical @payloadcms/storage-s3
   ```

### Pasang template payload cms

1. Copy isi folder `(payload)` ke dalam root project kalian.
2. Copy template next.config.mjs ini ke dalam konfigurasi kalian

   ```js
   import { withPayload } from "@payloadcms/next/withPayload";

   /** @type {import('next').NextConfig} */
   const nextConfig = {
     // Your Next.js config here
     experimental: {
       reactCompiler: false,
     },
   };

   // Make sure you wrap your `nextConfig`
   // with the `withPayload` plugin
   export default withPayload(nextConfig);
   ```

3. Copy konfigurasi script berikut ke `package.json`

   ```json
   "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "generate:importmap": "payload generate:importmap",
    "generate:types": "payload generate:types"
   },
   ```

4. Buat folder `src/collections/`. Folder ini akan berguna untuk menyimpan seluruh konfigurasi db pada payload cms

5. Buat `payload.config.ts` pada root folder anda. Ini adalah file utama untuk mengatur koneksi database payload. Isi dengan kode berikut:

   ```ts
   import { postgresAdapter } from "@payloadcms/db-postgres";
   import { s3Storage } from "@payloadcms/storage-s3";
   import sharp from "sharp";
   import { lexicalEditor } from "@payloadcms/richtext-lexical";
   import { buildConfig } from "payload";
   import { Papers } from "./src/collections/Paper";
   import { Media } from "./src/collections/Media";

   export default buildConfig({
     // If you'd like to use Rich Text, pass your editor here
     editor: lexicalEditor(),

     // Define and configure your collections in this array
     collections: [Papers, Media],

     // Payload Secret
     secret: process.env.PAYLOAD_SECRET || "",
     // Untuk koneksi ke Database
     db: postgresAdapter({
       pool: {
         connectionString: process.env.DATABASE_URL,
         ssl: {
           rejectUnauthorized: true,
           ca: process.env.SSL_CA,
         },
       },
     }),
     plugins: [
       // Untuk koneksi ke Amazon S3
       s3Storage({
         collections: {
           media: {
             prefix: "custom-prefix",
             signedDownloads: {
               shouldUseSignedURL: ({ collection, filename, req }) => {
                 return filename.endsWith(".mp4");
               },
             },
           },
         },
         config: {
           endpoint: process.env.S3_ENDPOINT,
           credentials: {
             accessKeyId: process.env.S3_ACCESS_KEY_ID,
             secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
           },
           region: process.env.S3_REGION,
           // Opsi ini penting agar URL yang dihasilkan oleh Payload benar
           forcePathStyle: true,
         },
         bucket: process.env.S3_BUCKET,
       }),
     ],
     sharp,
   });
   ```

6. Siapkan file `.env`. Berikut templatenya. Jangan pernah commit env mu ke github!

   ```
    PAYLOAD_SECRET =
    DATABASE_URL =
    SSL_CA =
    S3_ENDPOINT =
    S3_ACCESS_KEY_ID =
    S3_SECRET_ACCESS_KEY
    S3_REGION =
    S3_BUCKET =
   ```

### Memasang Database

1. Masuk vercel, tambahkan storage baru, pilih supabase.
2. Ikuti langkah - langkahnya hingga database terbuat

### Mengisi file .env

#### **PAYLOAD_SECRET**

1. Buka terminal, masukan perintah

   ```bash
   openssl rand -base64 32
   ```

   Simpan hasilnya pada PAYLOAD_SECRET

#### **DATABASE_URL**

1. Pergi ke dashboard proyek di vercel > storage > supabase
2. Temukan .env yang diakhiri dengan tulisan `_POSTGRES_URL`. Copy isi string itu.

#### **SSL_CA**

1. Pergi ke dashboard supabase > database > settings
2. Cari opsi SSL Certificate
3. Download certificate
4. Paste isi certificate tersebut. Pastikan memberi petik 2 (") di awal dan akhir key untuk menandai bahwa nilai ini adalah string

#### **S3_ENDPOINT** dan **S3_REGION**

1. Pergi ke dashboard supabase > Project Settings
2. Cari opsi S3 Connection
3. Nyalakan opsi enable connection via S3 protocol
4. Copy nilai dari `ENDPOINT` ke dalam `S3_ENDPOINT`
5. Copy nilai dari `REGION` ke dalam `S3_REGION`

#### **S3_ACCESS_KEY_ID** dan **S3_SECRET_ACCESS_KEY**

1. Pergi ke dashboard Project Settings
2. Cari opsi S3 Access Key
3. Klik new access key. Masukan deskripsi
4. Copy `Access Key ID` ke dalam `S3_ACCESS_KEY_ID`
5. Copy `Secret Access Key` ke dalam `S3_SECRET_ACCESS_KEY`
6. Pastikan kedua key ini tidak hilang. Karena `Secret Access Key` tidak bisa dikembalikan lagi.

#### **S3_BUCKET**

1. Pergi ke dashboard supabase
2. Pilih opsi storage di sidebar kiri. Masukan dengan nama bucket yang kalian mau. Apabila belum ada, buat bucket baru

### Payload CMS siap digunakan
