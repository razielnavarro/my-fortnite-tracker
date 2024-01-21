function StatsCard({ playerName, playerStats }){

  const overallStats = playerStats?.data?.stats?.all?.overall;

  // Check if overallStats is available before rendering
  if (!overallStats) {
    return null; // or display a loading state
  }

    return(
    <div className="flex justify-center items-center h-full mt-16">
    <div className="bg-gray p-6 rounded-lg shadow-md max-w-xl w-full">
      {/* Title */}
      <h2 className="text-xl font-bold mb-4">{playerName}</h2>
      {/* Stats Table */}
      <div className="grid grid-cols-2 gap-4">
        {/* Row 1 */}
        <div>
          <p className="text-sm font-semibold">Kills</p>
          <p className="text-lg">{overallStats.kills}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Wins</p>
          <p className="text-lg">{overallStats.wins}</p>
        </div>

        {/* Row 2 */}
        <div>
          <p className="text-sm font-semibold">Ratio</p>
          <p className="text-lg">{overallStats.kd.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm font-semibold">Win %</p>
          <p className="text-lg">{overallStats.winRate.toFixed(2)}%</p>
        </div>

      </div>
    </div>
    </div>
    );
}

export default StatsCard