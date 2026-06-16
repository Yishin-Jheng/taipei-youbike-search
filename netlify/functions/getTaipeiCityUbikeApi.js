export async function handler() {
  try {
    const response = await fetch(
      `https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json`,
    );
    const data = await response.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch Taipei City Ubike data" }),
    };
  }
}
