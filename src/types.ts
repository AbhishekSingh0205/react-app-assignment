export interface Seat {
  id: string;
  row: number;
  col: string;
  price: number;
  isBooked: boolean;
}

export interface PlaneConfig {
  id: string;
  name: string;
  sections: number[];
  rows: number;
}

export type BookingStatus = 'idle' | 'loading' | 'success' | 'error';
