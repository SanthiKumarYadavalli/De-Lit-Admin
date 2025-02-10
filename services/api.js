
export async function getData(functionName) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${functionName}`, {
    next: {
      revalidate: 0
    }
  });
  const data = await res.json();
  return data;
}

export async function postData(functionName, formData) {
  await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${functionName}`, {
    method: "POST",
    body: formData,
  });
}

export async function deleteData(functionName, id) {
  await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${functionName}/?id=${id}`, {
    method: "GET",
  });
}