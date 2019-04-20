export interface Log {
  hash: string;
  topic: string;
  state: LogStateEnum;
  status: LogStatusEnum;
  err: string;
  timestamp: number;
}

export enum LogStateEnum {
  PENDING = 'Pending',
  SUCCESSFUL = 'Successful',
  ERRORED = 'Errored'
}

export enum LogStatusEnum {
  RECEIVING = 'Receiving',
  PUBLISHING = 'Publishing'
}
