import { useQuery } from "@tanstack/react-query";

async function fetchStatus() {
  const response = await fetch("http://localhost:8000/health");
  if (!response.ok) {
    throw new Error("Backend unavailable");
  }
  return response.json() as Promise<{ status: string }>;
}

export function useBackendStatus() {
  return useQuery({
    queryKey: ["backend-status"],
    queryFn: fetchStatus,
    retry: 1,
  });
}
