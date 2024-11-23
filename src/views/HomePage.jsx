import { useEffect, useState } from "react";
import Card from "../components/Card";
import videoBg from "../assets/video.mp4";
import pict from "../assets/pict.png";
import axios from "axios";
import Toastify from "toastify-js";
import gifLoading from "../assets/loadingUpload.svg";

export default function Home() {
  const [cuisines, setCuisines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const pagination = getPagination();

  function getPagination() {
    let temp = [];
    for (let i = 1; i <= totalPage; i++) {
      temp.push(i);
    }
    return temp;
  }

  async function fetchProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/cuisines?q=${search}&i=${filter}&sort=${sort}&limit=10&page=${currentPage}`);
      setCuisines(data.data.query);
      setCurrentPage(data.data.pagination.currentPage);
      setTotalPage(data.data.pagination.totalPage);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCategories() {
    try {
      setLoading(true);
      const { data } = await axios.get(`https://h8-phase2-gc.vercel.app/apis/pub/restaurant-app/categories`);

      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function handlePrev() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  async function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [search, filter, sort, currentPage]);

  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Table Restaurant</title>
      <style
        dangerouslySetInnerHTML={{
          __html: '\n      .main-header {\n        font-family: Georgia, serif;\n        font-size: 2rem;\n      }\n      .transition-div {\n        background-color: #183434;\n      }\n      .transition-text {\n        font-family: "Times New Roman", Times, serif;\n      }\n      .main-div {\n        background-color: #f6f6f0;\n      }\n      .menu-header {\n        color: #393e41;\n        font-family: Georgia, serif;\n      }\n      .nav-button {\n        background-color: #393e41;\n        font-family: Georgia, serif;\n      }\n      .card-button {\n        background-color: #393e41;\n        font-family: Georgia, serif;\n      }\n    ',
        }}
      />
      {/* Hero Section */}
      <div className="relative w-screen h-screen">
        {/* Video Background */}
        <video autoPlay="true" loop="true" muted="true" playsInline="" className="absolute inset-0 w-full h-full object-cover">
          <source src={videoBg} type="video/mp4" />
        </video>
        {/* tint */}
        <div className="absolute inset-0 opacity-50 bg-black z-0" />
        {/* Content Layer */}
        <div className="absolute flex mt-20">
          <div className="flex basis-4/10">
            <img src={pict} className="w-full h-full" />
          </div>
          <div className="flex justify-center items-center w-full basis-6/10">
            <h2 className="main-header text-white p-5 italic font-bold">"Timeless Refinement" - Signifying classic dishes with a modern touch.</h2>
          </div>
        </div>
      </div>
      <div className="transition-div flex w-screen h-14 justify-center items-center">
        <h1 className="transition-text italic text-white">Table ranked 3rd best restaurant in the world in The World's 50 Best Restaurants 2024 ranking</h1>
      </div>

      {/* Main div */}
      <div className="main-div">
        {/* Header Menu */}
        <div className="flex justify-center items-center">
          <span className="menu-header mt-14 text-black text-7xl p-5">Our Menu</span>
        </div>
        {/* Nav Bar */}
        <div className="search-bar flex justify-center">
          <input type="text" className="border-2 border-black w-1/2 mr-4 rounded-md" onChange={(e) => setSearch(e.target.value)} />
          <label className="nav-button text-white mr-4 rounded-md px-2"> Sort </label>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value={"ASC"}> Ascending </option>
            <option value={"DESC"}> Descending </option>
          </select>
          <label className="nav-button text-white mr-4 rounded-md px-2"> Filter </label>
          <select onChange={(e) => setFilter(e.target.value)}>
            {categories?.map((category) => {
              return <option value={category.name}>{category.name}</option>;
            })}
          </select>
        </div>

        {loading ? (
          <>
            <div className="flex justify-center mt-32">
              <img src={gifLoading} className="w-1/5" />
            </div>
          </>
        ) : (
          <>
            {/* Cards  */}
            <div className="card-div my-10 grid grid-cols-3 gap-5">
              {cuisines.map((cuisine) => {
                return <Card key={cuisine.id} cuisine={cuisine} />;
              })}
            </div>
          </>
        )}

        {/* Pagination  */}
        <div className="flex justify-center items-center mt-6">
          <button className="bg-[#f4a261] font-serif text-black px-3 py-1.5 rounded mx-2.5 cursor-pointer" disabled={currentPage == 1} onClick={handlePrev}>
            Prev
          </button>
          {pagination.map((el) => {
            return (
              <button
                type="button"
                className={el == currentPage ? "min-h-[38px] min-w-[38px] flex justify-center items-center bg-purple-400 py-2 px-3 text-sm rounded-lg border-2 border-black rounded-lg shadow-[2px_2px_0px_rgba(0,0,0,1)]" : "min-h-[38px] min-w-[38px] flex justify-center items-center rounded-lg border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:bg-purple-400 hover:border-2 hover:border-black hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] py-2 px-3 text-sm"}
                onClick={() => {
                  setCurrentPage(el);
                }}
              >
                {el}
              </button>
            );
          })}
          <button className="bg-[#f4a261] font-serif text-black px-3 py-1.5 rounded mx-2.5 cursor-pointer" disabled={currentPage == totalPage} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
