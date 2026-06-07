import lighthouse from '@lighthouse-web3/sdk';

async function test() {
  try {
    const apiKey = "22338040.a7b97b3ea6194ff6af53ba587b89f3cf";
    
    const buffer = Buffer.from("Hello Lighthouse 123");
    
    console.log("Uploading buffer...");
    const response = await lighthouse.uploadBuffer(buffer, apiKey);
    
    console.log("Response:", response);
  } catch (err) {
    console.error("Error:", err);
  }
}

test();
