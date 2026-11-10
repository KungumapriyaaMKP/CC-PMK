// demo.tsx / demo-service-grid.tsx

import { ServiceGrid, Service } from "@/components/ui/service-grid";

// Sample data for the services, mimicking the provided template
const expertServices: Service[] = [
  {
    name: "Chefs",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-5pHkFAOH2PdoeZ65oD86FZ0ikKXAvV.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Prepared meals",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-cmFCjM4wAXdV4xpW6gHOyY8kbJo6B9.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Catering",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-HbCnYirZv0o05ffcBstUMZcPgOwlWQ.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Photography",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-wnpD2WiW7gwjbHcIAcPhCbEuj7JNwY.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Personal training",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-oOxheUAwi87JIuaG4ebMbN4RqB9P8S.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Massage",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-ZlnEb5GHMXqPR4L7WVSlbGZ6czxGrv.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Spa treatments",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-bkdUNYIhdtrWnm5wKkRmKHaRfiGOAx.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Hair styling",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-d0GAO5ycNDeZ700WGF58zQs6P3yEAi.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Makeup",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-n8G31Cqh3JyKkxXgC4UC1NDwW6tD3A.png&w=320&q=75",
    href: "#",
  },
  {
    name: "Nails",
    imageUrl: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-FxF3nHvIyj3ximtxnyw76Q8BaiscEM.png&w=320&q=75",
    href: "#",
  },
];

export default function ServiceGridDemo() {
  return (
    <div className="w-full bg-background">
      <ServiceGrid
        title="A world of experts, at your service"
        subtitle="Choose from thousands of services in 260 cities, provided by trusted pros."
        services={expertServices}
      />
    </div>
  );
}
