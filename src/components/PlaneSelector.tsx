import type { PlaneConfig } from '../types';

interface PlaneSelectorProps {
    planes: PlaneConfig[];
    selectedPlaneId: string;
    onSelectPlane: (planeId: string) => void;
}

export const PlaneSelector = ({ planes, selectedPlaneId, onSelectPlane }: PlaneSelectorProps) => {
    return (
        <div className="plane-selector">
            <label htmlFor="plane-select">Select Plane Model: </label>
            <select
                id="plane-select"
                value={selectedPlaneId}
                onChange={(e) => onSelectPlane(e.target.value)}
            >
                <option value="" disabled>-- Select a Plane --</option>
                {planes.map((plane) => (
                    <option key={plane.id} value={plane.id}>
                        {plane.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
