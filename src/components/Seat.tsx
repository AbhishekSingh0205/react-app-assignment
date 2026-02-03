import type { Seat as SeatType } from '../types';

interface SeatProps {
    seat: SeatType;
    isSelected: boolean;
    onToggle: (id: string) => void;
}

export const Seat = ({ seat, isSelected, onToggle }: SeatProps) => {
    const handleClick = () => {
        if (!seat.isBooked) {
            onToggle(seat.id);
        }
    };

    return (
        <div
            className={`seat ${seat.isBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={handleClick}
            title={`Seat: ${seat.id} - $${seat.price}`} // Native tooltip as fallback/accessibility
        >
            <span className="seat-id">{seat.id}</span>

            {/* Custom Tooltip */}
            <div className="tooltip">
                <div className="tooltip-row">Row: {seat.row}</div>
                <div className="tooltip-col">Col: {seat.col}</div>
                <div className="tooltip-price">Price: ${seat.price}</div>
            </div>
        </div>
    );
};
