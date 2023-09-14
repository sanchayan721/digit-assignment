import fs from 'fs';
import path from 'path';

// Define the path to the data directory and the JSON file
const dataDir = path.join(__dirname, '../../', 'data');
const jsonFilePath = path.join(dataDir, 'user.json');

// Function to write data to the JSON file
export function writeDataToJsonFile(data: any): Promise<void> {
  return new Promise((resolve, reject) => {
    // Convert the data to JSON format
    const jsonData = JSON.stringify(data, null, 2);

    // Write the JSON data to the file
    fs.writeFile(jsonFilePath, jsonData, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}