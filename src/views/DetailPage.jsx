import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import gifLoading from "../assets/loadingUpload.svg";
export default function DetailPage() {
  const [cuisine, setCuisine] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  async function fetchCuisine() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/cuisines/${id}`);
      console.log(data.data);

      setCuisine(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCuisine();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="flex justify-center mt-32">
            <img src={gifLoading} className="w-1/5" />
          </div>
        </>
      ) : (
        <>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Cuisine Detail Page</title>
          {/* Main Container */}
          <div className="max-w-6xl mx-auto p-6">
            {/* Cuisine Detail Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
              {/* Cuisine Image */}
              <div className="md:w-1/2">
                <img src={cuisine?.imgUrl} className="w-full h-full object-cover" />
              </div>
              {/* Cuisine Details */}
              <div className="md:w-1/2 p-6 flex flex-col justify-between">
                <div>
                  {/* Cuisine Name */}
                  <h1 className="text-3xl font-serif text-gray-800 mb-4">{cuisine.name}</h1>
                  {/* Category */}
                  <p className="text-sm text-gray-500 mb-2">
                    Category: <span className="font-semibold text-gray-700">{cuisine.Category?.name}</span>
                  </p>
                  {/* Description */}
                  <p className="text-gray-700 mb-4">{cuisine.description}</p>
                </div>
                {/* Price and Actions */}
                <div className="flex items-center justify-between">
                  {/* Price */}
                  <span className="text-xl font-semibold text-gray-800">{cuisine.price}</span>
                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link to={"/"} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                      Back To Home
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
