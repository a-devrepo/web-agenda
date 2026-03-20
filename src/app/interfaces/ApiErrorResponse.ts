export interface ApiErrorResponse {
  title: string;
  detail: string;
  fields?: { [key: string]: string };
}