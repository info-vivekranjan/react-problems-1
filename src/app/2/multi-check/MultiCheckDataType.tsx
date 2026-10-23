export interface MultiCheckChildDataType {
  id: string;
  label: string;
}

export interface MultiCheckDataType extends MultiCheckChildDataType {
  children: MultiCheckChildDataType[];
}
