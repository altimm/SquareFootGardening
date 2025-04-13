import React from "react";
import { Vegetable } from "../App";

const PlantDetails = ({
  selectedVegetable,
}: {
  selectedVegetable?: Vegetable;
}) => {
  return (
    <>
      <h2>Selected Vegetable</h2>
      {selectedVegetable ? (
        <div>
          <p>
            <strong>Name:</strong> {selectedVegetable.name}
          </p>
          <p>
            <strong>Spacing:</strong> {selectedVegetable.spacing} cm
          </p>
          <p>
            <strong>Sun:</strong> {selectedVegetable.sun}
          </p>
          <p>
            <strong>Water:</strong> {selectedVegetable.water}
          </p>
          <p>
            <strong>Nitrogen:</strong> {selectedVegetable.nitrogen}
          </p>
          <p>
            <strong>Height:</strong> {selectedVegetable.height} cm
          </p>
          <p>
            <strong>Perennial:</strong>{" "}
            {selectedVegetable.perennial ? "Yes" : "No"}
          </p>
          <p>
            <strong>pH:</strong> {selectedVegetable.ph}
          </p>
          <p>
            <strong>Companion Plants:</strong>{" "}
            {selectedVegetable.companion_plant.join(", ")}
          </p>
          <p>
            <strong>Enemy Plants:</strong>{" "}
            {selectedVegetable.enemy_plant.join(", ")}
          </p>
          <p>
            <strong>Color:</strong> {selectedVegetable.color}
          </p>
        </div>
      ) : (
        <p>No vegetable selected</p>
      )}
    </>
  );
};

export default PlantDetails;
