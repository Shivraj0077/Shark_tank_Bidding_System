"use client";
import {
  createItemAction,
  createUploadUrlAction,
} from "@/app/items/create/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { useState } from "react";
import { Building2, Upload, Calendar, Info } from "lucide-react";

export default function CreatePage() {
  const [date, setDate] = useState<Date|undefined>(new Date());
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Your Startup</h1>
          <p className="text-lg text-gray-600">List your startup and connect with potential investors</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <form
              className="space-y-6"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!date) {
                  return;
                }
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
                const bidInterval = parseInt(formData.get("bidInterval") as string);

                await createItemAction({
                  name,
                  startingPrice: startingPriceInCents,
                  fileName: file.name,
                  equity: equityperc,
                  companyval,
                  description,
                  filepdf: filepdf.name,
                  bidInterval,
                  endDate: date,
                });
              }}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Startup Name</label>
                  <Input
                    required
                    name="name"
                    placeholder="Enter your startup name"
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Investment Ask (₹)</label>
                    <Input
                      required
                      name="startingPrice"
                      type="number"
                      step="0.01"
                      placeholder="Investment amount"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Equity Offered (%)</label>
                    <Input
                      required
                      name="equity"
                      type="number"
                      step="0.01"
                      placeholder="Equity percentage"
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Bid Interval ($)</label>
                  <Input
                    required
                    name="bidInterval"
                    type="number"
                    step="0.01"
                    placeholder="Minimum bid increment"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Valuation</label>
                  <Input
                    required
                    name="companyval"
                    placeholder="Current company valuation"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Description</label>
                  <Input
                    required
                    name="description"
                    placeholder="Brief description of your company"
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Upload className="w-5 h-5 inline-block mr-2" />
                      Upload Startup Logo
                    </label>
                    <Input type="file" name="file" className="w-full" />
                  </div>

                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Upload className="w-5 h-5 inline-block mr-2" />
                      Upload Pitch Deck (PDF)
                    </label>
                    <Input type="file" name="filepdf" className="w-full" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-5 h-5 inline-block mr-2" />
                      End Date
                    </label>
                    <DatePickerDemo date={date} setDate={setDate} />
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button className="w-full py-6 text-lg" type="submit">
                  Submit Startup
                </Button>
              </div>
            </form>
          </div>

          {/* Guidelines Section */}
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900">Submission Guidelines</h2>
            </div>
            <div className="prose prose-gray">
              <p className="text-gray-600 mb-4">Please ensure your pitch deck (PDF) includes the following information:</p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                  <span><strong>Basic Details:</strong> Startup name, tagline, founding date, industry</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                  <span><strong>Team:</strong> Founder profiles, team size, advisors</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                  <span><strong>Business Model:</strong> Problem, solution, revenue model, market size</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                  <span><strong>Financials:</strong> Funding history, revenue, burn rate, margins</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                  <span><strong>Product:</strong> Overview, features, development stage, tech stack</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                  <span><strong>Traction:</strong> Key metrics, partnerships, awards</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                  <span><strong>Legal:</strong> Incorporation details, IP, licenses</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                  <span><strong>Investment:</strong> Funding needs, equity, utilization plan</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2 mr-2"></span>
                  <span><strong>Risks:</strong> Market, operational, competitor analysis</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}