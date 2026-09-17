declare module 'pdf-parse' {
  function pdfParse(buffer: Buffer): Promise<{ text: string; numpages: number; info: any }>
  export = pdfParse
}
declare module 'mammoth' {
  export function extractRawText(options: { buffer: Buffer }): Promise<{ value: string; messages: any[] }>
}
