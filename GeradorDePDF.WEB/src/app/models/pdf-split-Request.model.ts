export class PdfSplitRequest {
  file: FormData = new FormData();
  ranges: Array<string> = new Array<string>();
}
