export async function saveResult(result: any) {
  try {
    const response = await fetch('/api/save-result', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ result }),
    });
    return await response.json();
  } catch (error) {
    console.error('Failed to save result:', error);
    return null;
  }
}
