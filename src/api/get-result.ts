export async function getResult(shareId: string) {
  try {
    const response = await fetch(`/api/get-result?shareId=${shareId}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to get result:', error);
    return null;
  }
}
