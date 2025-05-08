export class ColumnNumberTransformer {
  to(data: number): number {
    return data;
  }
  from(data: number | string): number {
    return Number(data);
  }
}
