export class ErrorGeneral {
  codeStatus: number;
  internalCodeStatus: number;
  status: string;
  message: string;
  error: string;
  bussinesData: any;
}
export class ErrorTrace {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  trace: string;
  path: string;
}
