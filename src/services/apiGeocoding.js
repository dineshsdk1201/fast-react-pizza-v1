export async function getAddress({ latitude, longitude }) {
  const res = await fetch(
    `https://us1.api-bdc.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  if (!res.ok) throw Error("Failed getting address");

  const data = await res.json();
  return data;
}
