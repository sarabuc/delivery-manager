import { useState } from "react";
import { FileText, UploadCloud } from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";

const ACCEPTED = ["application/pdf", "image/png", "image/jpeg"];

export function UploadZone() {
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleMockUpload = (file: File) => {
    setFileName(file.name);
    setProgress(20);
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + 20, 100);
        if (next === 100) {
          clearInterval(timer);
        }
        return next;
      });
    }, 300);
  };

  return (
    <Card className="border-dashed border-2 border-slate-700 bg-slate-950/40">
      <CardContent className="flex flex-col items-center gap-5 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800">
          <UploadCloud className="h-7 w-7 text-emerald-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Upload bank statements</h3>
          <p className="text-sm text-slate-400">
            Drag & drop PDF/JPG/PNG statements. Files are encrypted and deleted
            after OCR.
          </p>
        </div>
        <label className="cursor-pointer">
          <input
            type="file"
            accept={ACCEPTED.join(",")}
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                handleMockUpload(file);
              }
            }}
          />
          <Button type="button">Select file</Button>
        </label>
        {fileName && (
          <div className="w-full space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {fileName}
              </span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
            {progress === 100 && (
              <p className="text-xs text-emerald-400">OCR complete · Success</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
