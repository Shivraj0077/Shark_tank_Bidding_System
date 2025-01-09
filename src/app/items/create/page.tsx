"use client";

import {
  createItemAction,
  createUploadUrlAction,
} from "@/app/items/create/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreatePage() {
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Post a startup</h1>

      <div className="flex flex-wrap gap-8">
        {/* Form Section */}
        <form
          className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg flex-1"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget as HTMLFormElement;
            const formData = new FormData(form);
            const file = formData.get("file") as File;
            const filepdf = formData.get("filepdf") as File;

            const uploadUrl = await createUploadUrlAction(file.name, file.type);
            const uploadUrlpdf = await createUploadUrlAction(filepdf.name, filepdf.type);

            await fetch(uploadUrl, {
              method: "PUT",
              body: file,
            });
            await fetch(uploadUrlpdf, {
              method: "PUT",
              body: filepdf,
            });

            const name = formData.get("name") as string;
            const startingPrice = parseInt(formData.get("startingPrice") as string);
            const startingPriceInCents = Math.floor(startingPrice * 100);
            const equityperc = parseInt(formData.get("equity") as string);
            const companyval = formData.get("companyval") as string;
            const description = formData.get("description") as string;

            await createItemAction({
              name,
              startingPrice: startingPriceInCents,
              fileName: file.name,
              equity: equityperc,
              companyval,
              description,
              filepdf: filepdf.name,

            });
          }}
        >
          <Input
            required
            className="max-w-lg"
            name="name"
            placeholder="Name your startup"
          />
          <Input
            required
            className="max-w-lg"
            name="startingPrice"
            type="number"
            step="0.01"
            placeholder="What is your ask?"
          />
          <Input
            required
            className="max-w-lg"
            name="equity"
            type="number"
            step="0.01"
            placeholder="How much equity do you want to give?"
          />
          <Input
            required
            className="max-w-lg"
            name="companyval"
  
            placeholder="company valuation?"
          />
           <Input
            required
            className="max-w-lg"
            name="description"
  
            placeholder="company description?"
          />
          <p>Upload your startup logo:</p>
          <Input type="file" name="file" />
          <p>Upload your startup pitch in PDF format:</p>
          <Input type="file" name="filepdf" />
          <Button className="self-end" type="submit">
            Post startup
          </Button>
        </form>

        {/* Rules Section */}
        <div className="flex-1 border p-8 rounded-xl bg-gray-50 space-y-8 max-w-3xl">
  <h2 className="text-2xl font-bold">Startup Information Checklist in (pdf fromat)</h2>
  <ul className="list-disc pl-6 text-gray-700 space-y-2">
    <li>Basic Details: Startup name, tagline, founding date, industry.</li>
    <li>Founders and Team: Founder profiles, team size, and advisors.</li>
    <li>Business Model: Problem, solution, revenue model, target audience, and market size.</li>
    <li>Financials: Funding history, revenue, burn rate, profit margins, and valuation.</li>
    <li>Product/Service: Overview, features, development stage, and technology stack.</li>
    <li>Traction: Key metrics (user growth, partnerships, awards).</li>
    <li>Legal and Compliance: Incorporation details, IP, and licenses.</li>
    <li>Pitch Materials: Pitch deck, business plan, and financial projections.</li>
    <li>Investment Details: Funding needed, equity offered, fund utilization, and exit strategy.</li>
    <li>Risks and Challenges: Market, operational, and competitor analysis.</li>
  </ul>
</div>

      </div>
    </main>
  );
}
