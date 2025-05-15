import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useAircraftApi } from "~/api/useAircraftApi";
import type { Aircraft } from "~/api/useAircraftsApi";
import { useDeleteAircraftApi } from "~/api/useDeleteAircraftApi";
import { useUpdateAircraftApi } from "~/api/useUpdateAircraft";
import type { CreateAircraftDto } from "~/components/AircraftFormModal";
import { AircraftFormModal } from "~/components/AircraftFormModal";

export default function AircraftDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [aircraft, setAircraft] = useState<Aircraft | undefined>();
  const aircraftApi = useAircraftApi(Number(id) || -1);
  const updateAircraftApi = useUpdateAircraftApi(Number(id) || -1);
  const deleteAircraftApi = useDeleteAircraftApi(Number(id) || -1);

  const defaultValues = useMemo(() => {
    return {
      Model: aircraft?.Model,
      Capacity: aircraft?.Capacity,
      ManufacturerId: aircraft?.ManufacturerId,
      CompanyId: aircraft?.CompanyId,
    };
  }, [aircraft]);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setAircraft(aircraftApi.data);
  }, [aircraftApi.data]);

  const handleUpdateAircraft = async (data: CreateAircraftDto) => {
    try {
      await updateAircraftApi.mutateAsync(data);

      aircraftApi.refetch();
    } catch (error) {
      console.error("Error updating aircraft:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAircraftApi.mutateAsync();
      // Navigate back to the home page after successful deletion
      navigate("/");
    } catch (error) {
      console.error("Error deleting aircraft:", error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1 className="text-2xl font-bold">Aircraft Details</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setOpenModal((prev) => !prev)}
            className="btn btn-primary"
          >
            Update
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
          <Link to="/" className="btn btn-secondary">
            Back to list
          </Link>
        </div>
      </div>

      {!aircraft ? (
        <div className="card text-center p-8">
          <div className="text-danger font-medium text-lg">{`No aircraft with id: ${id} found`}</div>
        </div>
      ) : (
        <div className="card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold">{aircraft.Model}</h2>
                <div className="text-secondary">Model</div>
              </div>

              <div>
                <div className="text-lg">{aircraft.Capacity}</div>
                <div className="text-secondary">Capacity</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-lg">{aircraft.Company.Name}</div>
                <div className="text-secondary">Company</div>
              </div>

              <div>
                <div className="text-lg">{aircraft.Manufacturer.Name}</div>
                <div className="text-secondary">Manufacturer</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <AircraftFormModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        handleSubmit={handleUpdateAircraft}
        defaultValues={defaultValues}
        title="Update Aircraft"
      />
    </div>
  );
}
