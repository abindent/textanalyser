import { Tools } from "@/utils/analyser";

// TEST
export default async function Home() {
  const _string = "I am a23 bad boy https://chatgpt.com/c/675bc0ee-1390-800e-8896-b758070540b1 https://www.typescriptlang.org/docs/handbook/2/classes.html";
  const analyserEngine = new Tools.Analyser(_string, { removepunc: true, removenum: true, removealpha: true });
  const result = await analyserEngine.main();
  const purpose = result["purpose"];
  const out = result['output'];
  return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
      <code>{out}</code><br/>
      <code>{purpose}</code>
    </div>
  );
}