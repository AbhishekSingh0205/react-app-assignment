import type { BookingStatus } from "../types";

interface BookingSummaryProps {
    selectedCount: number;
    totalPrice: number;
    onBook: () => void;
    status: BookingStatus;
}

export const BookingSummary = ({ selectedCount, totalPrice, onBook, status }: BookingSummaryProps) => {
    return (
        <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="summary-details">
                <p>Selected Seats: <strong>{selectedCount}</strong></p>
                <p>Total Price: <strong>${totalPrice}</strong></p>
            </div>

            <button
                className="book-btn"
                disabled={selectedCount === 0 || status === 'loading' || status === 'success'}
                onClick={onBook}
            >
                {status === 'loading' ? 'Processing...' : status === 'success' ? 'Booked!' : 'Book Selected Seats'}
            </button>

            {status === 'error' && <p className="error-msg">Booking failed. Please try again.</p>}
        </div>
    );
};
