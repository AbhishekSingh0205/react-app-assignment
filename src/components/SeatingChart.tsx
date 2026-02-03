import type { PlaneConfig, Seat as SeatType } from '../types';
import { Seat } from './Seat';

interface SeatingChartProps {
    plane: PlaneConfig;
    seats: SeatType[];
    selectedSeats: string[];
    onToggleSeat: (id: string) => void;
}

export const SeatingChart = ({ plane, seats, selectedSeats, onToggleSeat }: SeatingChartProps) => {
    // Helper to convert "A", "B" etc to 0, 1
    const getColIndex = (col: string) => col.charCodeAt(0) - 'A'.charCodeAt(0);

    // Group seats by row
    const rows: { [key: number]: SeatType[] } = {};
    seats.forEach(seat => {
        if (!rows[seat.row]) {
            rows[seat.row] = [];
        }
        rows[seat.row].push(seat);
    });

    // Sort rows
    const sortedRowNumbers = Object.keys(rows).map(Number).sort((a, b) => a - b);

    // Filter rows to only what fits the plane config
    // (Assuming data might have more rows than plane config, or we just trust data)
    const displayRows = sortedRowNumbers.slice(0, plane.rows);

    return (
        <div className="seating-chart">
            <div className="cockpit">Cockpit</div>

            {displayRows.map(rowNum => {
                const rowSeats = rows[rowNum] || [];

                // We need to render sections.
                // Current seat index pointer
                let currentSeatIdx = 0;

                return (
                    <div key={rowNum} className="seat-row">
                        <div className="row-number">{rowNum}</div>

                        {plane.sections.map((sectionSize, sectionIdx) => {
                            // Get the seats that belong to this section
                            // We rely on column index to be contiguous A,B,C...
                            // So for [3, 2, 3] -> section 0 is A,B,C. section 1 is D,E.

                            // Filter seats for this section based on currentSeatIdx to currentSeatIdx + sectionSize
                            // BUT we should verify against 'col' property to be safe, or just trust the sorted order if they are sorted?
                            // Let's filter by calculated column chars for robustness.

                            const sectionParamStart = currentSeatIdx;
                            const sectionParamEnd = currentSeatIdx + sectionSize;

                            const seatsInSection = rowSeats.filter(seat => {
                                const colIdx = getColIndex(seat.col);
                                return colIdx >= sectionParamStart && colIdx < sectionParamEnd;
                            });

                            // Increment for next section
                            currentSeatIdx += sectionSize;

                            return (
                                <div key={sectionIdx} className="seat-section">
                                    {seatsInSection.map(seat => (
                                        <Seat
                                            key={seat.id}
                                            seat={seat}
                                            isSelected={selectedSeats.includes(seat.id)}
                                            onToggle={onToggleSeat}
                                        />
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};
