import { google } from "googleapis";

const sheets = google.sheets("v4");

interface SheetRow {
  [key: string]: string | number | boolean | null | undefined;
}

export async function appendToSheet(
  spreadsheetId: string,
  sheetName: string,
  values: SheetRow
) {
  try {
    // Create auth from environment variable (service account JSON as string)
    const serviceAccountKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!serviceAccountKey) {
      throw new Error("GOOGLE_SHEETS_API_KEY environment variable not set");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(serviceAccountKey),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    // Convert object to array of values in consistent order
    const headers = [
      "Timestamp",
      "Name",
      "Email",
      // above same in all 

      // Beta Users

      "Role",
      "Organization",
      "Operating System",
      "Feature Requests",
      "Build Message",
      "Frustration Message",
      // Build Message = Message  


      // Contact inquries
      "inquiry",
      "inquiry_message",



      //job applications
      "resume",
      "message_job_application",
      "fav_problem",


    ];
    console.log("Incoming Value", values)
    const rowValues = headers.filter((header) =>
      values[header.toLowerCase().replace(/\s+/g, "_")] !== undefined
    ).map(
      (header) =>{
        return values[header.toLowerCase().replace(/\s+/g, "_")] || ""
      }
    );

    console.log("Row values to append:", rowValues);

    // remove spaces 

    // const rowValues = rowValues.map(element => {
    //   if (typeof element === 'string') {
    //     return element.trim();
    //   }
    //   return element;
    // });

    if (sheetName === "Contact Inquiries"){
      sheetName = `${sheetName}!A:E`
      console.log(spreadsheetId);
    }else{
      // sheetName = 
      sheetName = `${sheetName}!A:I`
      console.log(spreadsheetId);


    }
    const response = await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: sheetName,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowValues],
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error appending to Google Sheet:", error);
    throw error;
  }
}

export async function getSheetData(
  spreadsheetId: string,
  sheetName: string
): Promise<SheetRow[]> {
  try {
    const serviceAccountKey = process.env.GOOGLE_SHEETS_API_KEY;
    if (!serviceAccountKey) {
      throw new Error("GOOGLE_SHEETS_API_KEY environment variable not set");
    }

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(serviceAccountKey),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: `${sheetName}!A:I`,
    });

    const rows = response.data.values || [];
    if (rows.length === 0) return [];

    const headers = rows[0];
    const dataRows = rows.slice(1);

    return dataRows.map((row) => {
      const obj: SheetRow = {};
      (headers as string[]).forEach((header: string, index: number) => {
        obj[header.toLowerCase().replace(/\s+/g, "_")] = row[index] || "";
      });
      return obj;
    });
  } catch (error) {
    console.error("Error reading from Google Sheet:", error);
    throw error;
  }
}
