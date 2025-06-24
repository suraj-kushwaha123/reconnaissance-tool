// File: pages/api/reverse-image.js (Cloudinary upload method with debug logging)

import { IncomingForm } from 'formidable';
import fs from 'fs';

import FormData from 'form-data';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const CLOUDINARY_UPLOAD_PRESET = 'osint_unsigned';
const CLOUDINARY_CLOUD_NAME = 'dyyzypcjp';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const form = new IncomingForm({ keepExtensions: true });

  const data = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });

  const uploadedFile = data.files.image?.[0] || data.files.image;

  if (!uploadedFile) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const formData = new FormData();
  formData.append('file', fs.createReadStream(uploadedFile.filepath));
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const text = await response.text();
    console.log('Cloudinary raw response:', text);
    let result;
    try {
      result = JSON.parse(text);
    } catch (parseErr) {
      return res.status(500).json({
        error: 'Invalid JSON from Cloudinary',
        rawResponse: text,
        parseError: parseErr.message,
      });
    }

    if (result.secure_url) {
      const hostedImageUrl = result.secure_url;
      const googleSearchUrl = `https://www.google.com/searchbyimage?&image_url=${encodeURIComponent(hostedImageUrl)}`;

      return res.status(200).json({
        success: true,
        imageUrl: hostedImageUrl,
        redirectTo: googleSearchUrl,
      });
    } else {
      return res.status(500).json({ error: 'Cloudinary upload failed', details: result });
    }
  } catch (error) {
    console.error('Upload or fetch error:', error);
    res.status(500).json({ error: 'Upload or fetch failed', details: error.message });
  }
}
