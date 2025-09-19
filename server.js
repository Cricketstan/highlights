// scripts/fetch.js
import fs from "fs";
import fetch from "node-fetch";

const API_URL = "https://acc-matchcentre.s3-ap-south-1.amazonaws.com/cpanel/client_14/2025/mediadoc/videos/1/videos.js?v=1756540254";

async function main() {
  try {
    const res = await fetch(API_URL);
    let text = await res.text();

    // Clean wrapper (in case it's like "var data = ...;")
    text = text.replace(/^.*?=\s*/, "").replace(/;$/, "");

    const jsonData = JSON.parse(text);

    const simplified = jsonData.map(item => ({
      SNo: item.SNo,
      Title: item.Title,
      Image: item.Image,
      Video: item.MediaData?.videos,
      VideoThumb: item.MediaData?.videothumb,
      VideoDuration: item.MediaData?.videoDuration,
      Date: item.Date,
      MatchID: item.MatchID,
      CategoryName: item.CategoryName
    }));

    fs.writeFileSync("output.json", JSON.stringify(simplified, null, 2));
    console.log("✅ output.json generated!");
  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

main();
