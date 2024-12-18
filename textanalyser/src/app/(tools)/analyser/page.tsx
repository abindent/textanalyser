import { Tools } from "@/utils/analyser";

// TEST
export default async function Home() {
  const _string =
    "I am a23 bad boy℗™ https://chatgpt.com/c/675bc0ee-1390-800e-8896-b758070540b1 https://www.typescriptlang.org/docs/handbook/2/classes.html";
  const analyserEngine = new Tools.Analyser(_string, {
    extractUrls: true,
    removespecialchar: true,
  });
  await analyserEngine.addCustomOperation("reverseText", "Reverse Text", (text) =>
    text.split("").reverse().join("")
  );
  analyserEngine.toggleOperation("reverseText", true)
  const result = await analyserEngine.main();
  const purpose = result["purpose"];
  const out = result["output"];
  const metadata = result["metadata"];

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <h4>Given String:&nbsp;</h4><code>{analyserEngine.raw_text}</code>
      <br />
      <h4>Extracted URL:</h4> <code>{metadata.url}</code>
      <br />
      <h4>Purposes:</h4>
      <code>{purpose}</code> <br />
    </div>
  );
}
