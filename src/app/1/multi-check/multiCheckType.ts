export interface MultiCheckChildDataType {
  id: string;
  label: string;
}

export interface MultiCheckDataType {
  id: string;
  label: string;
  children: MultiCheckChildDataType[];
}
