export interface ISendFeedbackDto {
  userName: string;
  clientName: string;
  vehicleName?: string;
  visitString?: string;
  text: string;
}

export interface IFeedbackDto extends ISendFeedbackDto {
  id: number;
  createAt: string;
}
