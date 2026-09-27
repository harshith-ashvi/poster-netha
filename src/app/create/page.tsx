import type { Metadata } from "next";
import { Editor } from "@/components/editor/Editor";

export const metadata: Metadata = { title: "Make your poster" };

export default function CreatePage() {
  return <Editor />;
}
