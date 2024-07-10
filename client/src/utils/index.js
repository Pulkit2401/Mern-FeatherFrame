import { surpriseMePrompts } from '../constants';
import FileSaver from 'file-saver';

export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

export async function downloadImage(_id, photo) {
  try {
    const response = await fetch(photo);
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const blob = await response.blob();
    FileSaver.saveAs(blob, `download-${_id}.jpg`);
  } catch (error) {
    console.error('Error downloading image:', error);
  }
}
