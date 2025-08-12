import { BlobServiceClient } from '@azure/storage-blob';
import dotenv from 'dotenv';
dotenv.config();

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'jd-files';

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Ensure container exists
async function ensureContainer() {
  try {
    await containerClient.createIfNotExists();
    console.log(`✅ Azure Blob container '${containerName}' ready`);
  } catch (error) {
    console.error('❌ Failed to initialize Azure Blob container:', error);
    throw error;
  }
}

export default async function uploadToAzure(file) {
  if (!file || !file.buffer) {
    throw new Error('File or buffer not found');
  }

  await ensureContainer(); // Ensure container exists before upload

  const blobName = `${Date.now()}-${file.originalname}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    await blockBlobClient.uploadData(file.buffer);
    return blockBlobClient.url;
  } catch (error) {
    console.error('❌ Error uploading to Azure Blob:', error);
    throw error;
  }
}