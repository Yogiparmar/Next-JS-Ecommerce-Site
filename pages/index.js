import FeaturedProduct from "@/components/FeaturedProduct";
import Navbar from "@/components/Navbar";
import LatestProContainers from "@/components/containers/LatestProContainers";

export default function Home() {
  return (
    <>
      <Navbar />
      <FeaturedProduct />
      <div className="bg-gray-100 pb-14">
        <div className="w-full flex justify-center">
          <div className="w-[75%]">
            <LatestProContainers />
          </div>
        </div>
      </div>
    </>
  );
}
