export class PdfSplitRequest {
  files: FormData = new FormData();
  ranges: Array<string> = new Array<string>();
}
