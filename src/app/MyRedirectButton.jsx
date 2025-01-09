"use client";

import { useRouter } from 'next/navigation';

export default function MyRedirectButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/your-target-url')} // Replace with your desired URL
      className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 p-2 rounded-lg"
    >
      View PDF
    </button>
  );
}
