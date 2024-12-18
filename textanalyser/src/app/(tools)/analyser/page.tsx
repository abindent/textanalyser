import { Tools } from "@/utils/analyser";

// TEST
export default async function Home() {
  const _string =
    "I am a23 bad boy https://chatgpt.com/c/675bc0ee-1390-800e-8896-b758070540b1 https://www.typescriptlang.org/docs/handbook/2/classes.html";
  const analyserEngine = new Tools.Analyser(_string, {
    extractUrls: true,
    removepunc: true,
  });
  await analyserEngine.addCustomOperation("reverseText", "Reverse Text", (text) =>
    text.split("").reverse().join("")
  );
  analyserEngine.toggleOperation("reverseText", true)
  const result = await analyserEngine.main();
  const purpose = result["purpose"];
  const out = result["output"];
  const metadata = result["metadata"];
  const eE = new Tools.Analyser("Sample Text", { charcount: true });
  const r = await eE.main();
  const mtd = r["metadata"].characterCount;
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <code>{out}</code>
      <br />
      <code>Extracted URL: {metadata.url}</code>
      <br />
      <code>{purpose}</code> <br />
      <code>Charcount for "Sample Text" is {mtd}</code> <br />
    </div>
  );
}
