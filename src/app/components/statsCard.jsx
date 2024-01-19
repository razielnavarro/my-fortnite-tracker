import StatsRetrieval from "./StatsRetrieval";

function StatsCard(){
    return(
    <div className="flex justify-center items-center h-full mt-16">
    <div className="bg-gray p-6 rounded-lg shadow-md max-w-xl w-full">
      {/* Title */}
      <h2 className="text-xl font-bold mb-4">Razant</h2>
      {/* Stats Table */}
      <div className="grid grid-cols-2 gap-4">
        {/* Row 1 */}
        <div>
          <p className="text-sm font-semibold">Kills</p>
          <p className="text-lg">3000</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Wins</p>
          <p className="text-lg">5000</p>
        </div>

        {/* Row 2 */}
        <div>
          <p className="text-sm font-semibold">Ratio</p>
          <p className="text-lg">3.55</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Time played</p>
          <p className="text-lg">24 days</p>
        </div>

        {/* Row 3 */}
        <div colSpan={2}>
          <p className="text-sm font-semibold">Deaths</p>
          <p className="text-lg">2500</p>
        </div>
      </div>
    </div>
    </div>
    );
}

export default StatsCard