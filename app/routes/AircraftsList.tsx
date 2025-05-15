import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAddAircraftApi } from "~/api/useAddAircraftApi";
import { useAircraftsApi, type Aircraft } from "~/api/useAircraftsApi";
import {
  AircraftFormModal,
  type CreateAircraftDto,
} from "~/components/AircraftFormModal";

export default function AircraftsList() {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const aircraftsApi = useAircraftsApi();
  const addAircraftApi = useAddAircraftApi();

  useEffect(() => {
    setAircrafts(aircraftsApi.data || []);
  }, [aircraftsApi.data]);

  const handleAddAircraft = async (data: CreateAircraftDto) => {
    try {
      await addAircraftApi.mutateAsync({ data });

      aircraftsApi.refetch();
    } catch (error) {
      console.error("Error adding aircraft:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="text-2xl font-bold">Aircraft List</h1>
        <button
          onClick={() => setOpenModal((prev) => !prev)}
          className="btn btn-primary"
        >
          Add aircraft
        </button>
      </div>

      <div
        className="grid gap-4"
        style={{ flex: 1, overflowY: "auto", scrollbarWidth: "thin" }}
      >
        {aircrafts.length === 0 && (
          <div className="card text-center p-8">
            <p className="text-secondary">No aircraft found.</p>
          </div>
        )}

        {aircrafts.map((aircraft) => (
          <div
            key={aircraft.Id}
            className="card hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <Link
                to={`/aircraft/${aircraft.Id}`}
                className="text-lg font-medium hover:text-accent"
              >
                {aircraft.Model} - {aircraft.Manufacturer.Name}
              </Link>
              <div className="text-sm text-secondary">
                Capacity: {aircraft.Capacity}
              </div>
            </div>
            <div className="mt-2 text-sm text-secondary">
              Company: {aircraft.Company.Name}
            </div>
          </div>
        ))}
      </div>

      <AircraftFormModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        handleSubmit={handleAddAircraft}
        title="Create Aircraft"
      />
    </div>
  );
}
