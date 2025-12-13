import { Gavel, Zap, PoundSterling, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

const MobileBidStickyBar = ({
  currentBid,
  timeRemaining,
  onBidClick,
  buyNowPrice,
  onBuyNowClick,
  onMakeOfferClick,
  allowOffers,
  auctionType,
  status
}) => {
  const { days, hours, minutes, seconds, status: timeStatus } = timeRemaining;
  const isActive = timeStatus === 'counting-down';

  // State for live timer
  const [liveTimer, setLiveTimer] = useState({
    days: days || 0,
    hours: hours || 0,
    minutes: minutes || 0,
    seconds: seconds || 0
  });

  // Update live timer every second
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setLiveTimer(prev => {
        let { days, hours, minutes, seconds } = prev;

        // Decrement seconds
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Sync with props when they change
  useEffect(() => {
    if (isActive) {
      setLiveTimer({
        days: days || 0,
        hours: hours || 0,
        minutes: minutes || 0,
        seconds: seconds || 0
      });
    }
  }, [days, hours, minutes, seconds, isActive]);

  // Determine which buttons to show
  const showBuyNow = buyNowPrice && isActive;
  const showMakeOffer = allowOffers && isActive;

  return (
    <div className="lg:hidden bg-white border border-gray-200 rounded-lg shadow-sm mb-6">
      <div className="p-4">
        <div className="flex flex-col items-center justify-between">
          {/* Left: Current Bid */}
          <div className="flex w-full justify-between items-center mb-3">
            <div>
              <p className="text-xs text-gray-500 font-light">CURRENT BID</p>
              <p className="text-lg font-semibold">£{currentBid.toLocaleString()}</p>
            </div>
            {/* Timer - Always show days, hours, minutes, and seconds */}
            {isActive && (
              <div className="flex justify-start items-center space-x-1 text-sm font-medium">
                <span className="bg-gray-100 px-1 rounded">{liveTimer.days}d</span>
                <span>:</span>
                <span className="bg-gray-100 px-1 rounded">{liveTimer.hours}h</span>
                <span>:</span>
                <span className="bg-gray-100 px-1 rounded">{liveTimer.minutes}m</span>
                <span className="bg-gray-100 px-1 rounded">{liveTimer.seconds}s</span>
              </div>
            )}
          </div>

          {/* Right: Timer and Button */}
          <div className="flex-1 flex flex-col items-end gap-2 justify-end w-full">

            {/* Action buttons - Show Buy Now, Make Offer, or Place Bid */}
            {isActive ? (
              <div className="flex flex-col gap-2 w-full">
                {/* Show Buy Now if available */}
                {showBuyNow && (
                  <button
                    onClick={onBuyNowClick}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md cursor-pointer flex items-center gap-2 text-sm font-medium w-full justify-center"
                  >
                    <Zap size={16} />
                    <span>Buy Now £{buyNowPrice.toLocaleString()}</span>
                  </button>
                )}

                {/* Show Make Offer if available (can be shown with Buy Now) */}
                {showMakeOffer && (
                  <button
                    onClick={onMakeOfferClick}
                    className="bg-[#edcd1f] hover:bg-[#edcd1f]/90 text-black py-2 px-4 rounded-md cursor-pointer flex items-center gap-2 text-sm font-medium w-full justify-center"
                  >
                    <PoundSterling size={16} />
                    <span>Make Offer</span>
                  </button>
                )}

                {/* Show Place Bid only if neither Buy Now nor Make Offer is available */}
                {!showBuyNow && !showMakeOffer && (
                  <button
                    onClick={onBidClick}
                    className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-md cursor-pointer flex items-center gap-2 text-sm font-medium w-full justify-center"
                  >
                    <Gavel size={16} />
                    <span>Place Bid</span>
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={onBidClick}
                className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md cursor-pointer flex items-center justify-center text-sm font-medium w-full"
              >
                <span>View Auction</span>
              </button>
            )}
          </div>
        </div>

        {/* Status indicator for non-active auctions */}
        {!isActive && (
          <div className="mt-3 text-center">
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${timeStatus === 'ended' ? 'bg-yellow-100 text-yellow-800' :
                timeStatus === 'approved' ? 'bg-blue-100 text-blue-800' :
                  timeStatus === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
              }`}>
              {timeStatus === 'ended' ? 'Auction Ended' :
                timeStatus === 'approved' ? 'Starting Soon' :
                  timeStatus === 'cancelled' ? 'Cancelled' :
                    timeStatus}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileBidStickyBar;