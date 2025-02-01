
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
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${functionName}`, {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteData(functionName, id) {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/${functionName}/?id=${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error(error);
  }
}