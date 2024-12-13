import { Tools } from "@/utils/analyser";

export default async function Home() {
  const _string = "I am a23 bad boy";
  const analyserEngine = new Tools.Analyser(_string, { removenum: true });
  const result = await analyserEngine.main();
  const purpose = result["purpose"];
  const out = result['output'];
  return (
    <div>
      <code>{out}</code>
      <code>{purpose}</code>
    </div>
  );
}