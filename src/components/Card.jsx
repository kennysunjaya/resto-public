import { Link } from "react-router-dom";

export default function Card({ cuisine }) {
  return (
    <>
      <div className="card-1" key={cuisine.id}>
        <div className="flex justify-center">
          <div className="card-1-pict w-80 h-64 rounded-lg overflow-hidden">
            <img src={cuisine.imgUrl} className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex card-1-desc w-full p-2 justify-around">
          <h2 className="card-button text-white mr-4 rounded-md px-2">{cuisine.name}</h2>
          <Link to={`/${cuisine.id}`} className="card-button text-white mr-4 rounded-md px-2">
            {" "}
            See Detail{" "}
          </Link>
        </div>
      </div>
    </>
  );
}
