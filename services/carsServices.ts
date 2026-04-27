export async function addCar(data: any) {
  try {
    const res = await fetch("/api/add-car", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include", // 🔥 МНОГО ВАЖНО (за cookies)
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.error || "Failed to add car");
    }

    return result;
  } catch (err) {
    console.error("ADD CAR SERVICE ERROR:", err);
    throw err;
  }
}

export async function fetchCars() {
  const res = await fetch("/api/cars");

  if (!res.ok) {
    throw new Error("Failed to fetch cars");
  }

  return res.json();
}

export async function fetchMyCars() {
  const res = await fetch("/api/cars/my-car", {
    credentials: "include", // 🔥 МНОГО ВАЖНО (за cookies)
  });

  if (!res.ok) {
    throw new Error("Failed to fetch my cars");
  }

  return res.json();
}
export async function deleteCarById(id: string) {
  const res = await fetch(`/api/cars/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.error || "Failed to delete car");
  }

  return result;
}
