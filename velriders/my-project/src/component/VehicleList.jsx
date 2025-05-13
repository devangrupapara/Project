import { useSelector } from "react-redux";

const VehicleList = () => {
  const { allVehicles, loading, error } = useSelector((state) => state.viewAll);

  if (loading) return <div>Loading vehicles...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!allVehicles.length) return <div>No vehicles found for this city.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {allVehicles.map((vehicle) => (
        <div key={vehicle.id} className="border p-4 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold">{vehicle.name || "Unnamed Vehicle"}</h3>
          <p>Fuel Type: {vehicle.properties?.fuel_type_name || "N/A"}</p>
          <p>Convenience Fees: {vehicle.convenience_fees || "N/A"}</p>
        </div>
      ))}
    </div>
  );
};

export default VehicleList;