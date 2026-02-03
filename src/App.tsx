import { useState, useMemo } from 'react';
import './App.css';
import planesData from './data/planes.json';
import seatsData from './data/seats.json';
import { PlaneSelector } from './components/PlaneSelector';
import { SeatingChart } from './components/SeatingChart';
import { BookingSummary } from './components/BookingSummary';
import type { BookingStatus, PlaneConfig, Seat as SeatType } from './types';

// Cast imported data to types
const typedPlanes = planesData as PlaneConfig[];
const initialSeats = seatsData as SeatType[];

function App() {
  const [selectedPlaneId, setSelectedPlaneId] = useState<string>('');
  const [allSeats, setAllSeats] = useState<SeatType[]>(initialSeats);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>(() => []);
  const [bookingStatus, setBookingStatus] = useState<BookingStatus>('idle');

  const selectedPlane = useMemo(() =>
    typedPlanes.find(p => p.id === selectedPlaneId),
    [selectedPlaneId]
  );

  const handlePlaneSelect = (id: string) => {
    setSelectedPlaneId(id);
    setSelectedSeatIds([]); // Reset selections on plane change
    setBookingStatus('idle');
  };

  const handleToggleSeat = (id: string) => {
    if (bookingStatus === 'loading') return;

    // If we are in success state, any interaction resets to idle
    if (bookingStatus === 'success') {
      setBookingStatus('idle');
    }

    setSelectedSeatIds(prev => {
      const exists = prev.includes(id);
      if (exists) return prev.filter(s => s !== id);
      return [...prev, id];
    });
  };

  const handleBook = () => {
    if (selectedSeatIds.length === 0) return;

    setBookingStatus('loading');

    // Mock API call
    setTimeout(() => {
      // Success scenario
      setAllSeats(prevSeats =>
        prevSeats.map(seat =>
          selectedSeatIds.includes(seat.id) ? { ...seat, isBooked: true } : seat
        )
      );
      setBookingStatus('success');
      setSelectedSeatIds([]);

      // Auto-reset message after a few seconds? OR keep it until user interacts? 
      // The requirement says "display the updated status".
    }, 1500);
  };

  // Calculate totals
  const selectedSeatsList = useMemo(() =>
    allSeats.filter(s => selectedSeatIds.includes(s.id)),
    [allSeats, selectedSeatIds]
  );

  const totalPrice = selectedSeatsList.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <div className="app-container">
      <header>
        <h1>Airline Seating Chart</h1>
      </header>

      <main>
        <section className="controls">
          <PlaneSelector
            planes={typedPlanes}
            selectedPlaneId={selectedPlaneId}
            onSelectPlane={handlePlaneSelect}
          />
        </section>

        {selectedPlane ? (
          <>
            <section className="chart-container">
              <h2>{selectedPlane.name}</h2>
              <SeatingChart
                plane={selectedPlane}
                seats={allSeats}
                selectedSeats={selectedSeatIds}
                onToggleSeat={handleToggleSeat}
              />
            </section>

            <section className="booking-actions">
              <BookingSummary
                selectedCount={selectedSeatIds.length}
                totalPrice={totalPrice}
                onBook={handleBook}
                status={bookingStatus}
              />
            </section>
          </>
        ) : (
          <div className="placeholder-msg">
            <p>Please select a plane model to view the seating map.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
