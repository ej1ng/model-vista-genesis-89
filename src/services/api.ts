// API service for communicating with the backend

const API_URL = 'https://snapcadbackend.onrender.com/';

/**
 * Generate a 3D model from an image
 * @param imageFile - The image file to generate a 3D model from
 * @returns Promise with the blob data of the 3D model
 */
export async function generate3DModel(imageFile: File): Promise<Blob> {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch(`${API_URL}/generate3d`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to generate 3D model');
  }

  return await response.blob();
}

/**
 * Check if the backend API is available
 * @returns Promise with boolean indicating if the API is available
 */
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    return false;
  }
} 