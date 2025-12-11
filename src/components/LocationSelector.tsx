import React, { useState } from 'react';
import Card from './Card';
import type { Location } from '../types/weatherTypes';

interface LocationSelectorProps {
  locations: Location[];
  onSelectLocation: (lat: number, lon: number) => void;
  onAddLocation: (name: string, lat: number, lon: number) => void;
}

const LocationSelector = ({ 
  locations, 
  onSelectLocation,
  onAddLocation
}: LocationSelectorProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');
  const [newLocationLat, setNewLocationLat] = useState('');
  const [newLocationLon, setNewLocationLon] = useState('');
  
  const handleAddLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLocationName && newLocationLat && newLocationLon) {
      onAddLocation(
        newLocationName,
        parseFloat(newLocationLat),
        parseFloat(newLocationLon)
      );
      setNewLocationName('');
      setNewLocationLat('');
      setNewLocationLon('');
      setShowAddForm(false);
    }
  };
  
  return (
    <Card className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gray-900 font-semibold">Locations</h3>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          {showAddForm ? 'Cancel' : 'Add Location'}
        </button>
      </div>
      
      {showAddForm ? (
        <form onSubmit={handleAddLocation} className="mb-4">
          <div className="grid grid-cols-1 gap-3">
            <input
              type="text"
              placeholder="Location name"
              value={newLocationName}
              onChange={(e) => setNewLocationName(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
              required
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Latitude"
                value={newLocationLat}
                onChange={(e) => setNewLocationLat(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                step="any"
                required
              />
              <input
                type="number"
                placeholder="Longitude"
                value={newLocationLon}
                onChange={(e) => setNewLocationLon(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
                step="any"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-3 py-2 text-sm font-medium hover:bg-blue-700"
            >
              Save Location
            </button>
          </div>
        </form>
      ) : null}
      
      <div className="space-y-2">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => onSelectLocation(location.lat, location.lon)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
              location.isDefault 
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : 'hover:bg-gray-100'
            }`}
          >
            {location.name}
            {location.isDefault && (
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Default
              </span>
            )}
          </button>
        ))}
      </div>
    </Card>
  );
};

export default LocationSelector;