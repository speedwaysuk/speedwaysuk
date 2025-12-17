import { Heart, Eye, Clock, Shield, Zap, File, Gauge, Settings, MapPin, Users, Gavel } from "lucide-react";
import { heroImg } from "../assets";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuctionCountdown from "../hooks/useAuctionCountDown";
import { useWatchlist } from "../hooks/useWatchlist";

function AuctionListItem({ auction }) {
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(false);

    const auctionTime = useAuctionCountdown(auction);
    const { isWatchlisted, watchlistCount, loading, toggleWatchlist } = useWatchlist(auction._id);

    const handleWatchlist = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await toggleWatchlist();
    };

    // Check if reserve is met
    const isReserveMet = auction.currentPrice >= auction.reservePrice;
    const isAuctionActive = auction.status === 'active' && !auctionTime.completed;

    // Calculate status badges
    const getStatusBadges = () => {
        const badges = [];

        if (auction.auctionType === 'reserve' && isReserveMet) {
            badges.push({
                label: 'Reserve Met',
                icon: Shield,
                color: 'bg-green-100 text-green-700 border-green-200'
            });
        } else if (auction.auctionType === 'reserve') {
            badges.push({
                label: 'Reserve',
                icon: Shield,
                color: 'bg-orange-100 text-orange-700 border-orange-200'
            });
        }

        if (auction.auctionType === 'standard') {
            badges.push({
                label: 'No Reserve',
                icon: Shield,
                color: 'bg-green-100 text-green-700 border-green-200'
            });
        }

        if (auction.status === 'active') {
            badges.push({
                label: 'Live',
                icon: Clock,
                color: 'bg-green-100 text-green-700 border-green-200'
            });
        }

        if (auction.status === 'approved') {
            badges.push({
                label: 'Starting Soon',
                icon: Clock,
                color: 'bg-orange-100 text-orange-700 border-orange-200'
            });
        }

        if (auction.status === 'ended') {
            badges.push({
                label: 'Ended',
                icon: Clock,
                color: 'bg-red-100 text-red-700 border-red-200'
            });
        }

        if (auction.status === 'sold') {
            badges.push({
                label: 'Sold',
                icon: Clock,
                color: 'bg-green-100 text-green-700 border-green-200'
            });
        }

        return badges;
    };

    const statusBadges = getStatusBadges();

    // Format auction time remaining
    const formatTimeRemaining = () => {
        if (!auctionTime || auctionTime.completed) return 'Auction Ended';

        if (auctionTime.days > 0) {
            return `${auctionTime.days}d ${auctionTime.hours}h ${auctionTime.minutes}m`;
        } else if (auctionTime.hours > 0) {
            return `${auctionTime.hours}h ${auctionTime.minutes}m`;
        } else {
            return `${auctionTime.minutes}m ${auctionTime.seconds}s`;
        }
    };

    // Calculate pending offers
    const pendingOffers = auction?.offers?.filter(o => o.status === 'pending').length || 0;

    if (!auctionTime) return null;

    return (
        // Change the main container styling to be more compact
        <div
            className="bg-white border border-gray-200 p-3 hover:bg-gray-50 transition-colors duration-150 cursor-pointer group"
            onClick={() => navigate(`/auction/${auction._id}`)}
        >
            {/* Mobile: Stack, Desktop: Row */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Image - Mobile: larger, Desktop: compact */}
                <div className="sm:w-20 sm:h-16 w-full h-40 sm:flex-shrink-0">
                    <img
                        src={auction.photos?.[0]?.url || heroImg}
                        alt={auction.title}
                        className="w-full h-full object-cover rounded sm:rounded"
                    />
                </div>

                {/* Content - Mobile: full width, Desktop: flex-1 */}
                <div className="flex-1 min-w-0 w-full sm:w-auto">
                    {/* Mobile: Stack info, Desktop: inline */}
                    <div className="mb-2 sm:mb-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                            <Link
                                to={`/auction/${auction._id}`}
                                className="font-semibold text-base sm:text-sm text-gray-900 hover:text-primary truncate"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {auction.title}
                            </Link>
                            <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded inline-block w-fit">
                                {auction.category}
                            </span>
                        </div>
                    </div>

                    {/* Mobile: Grid of info, Desktop: single line */}
                    <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                            <File size={12} />
                            <span className="truncate">{auction?.specifications?.registration || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Gauge size={12} />
                            <span>{auction?.specifications?.miles || auction?.specifications?.mileage || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-1 col-span-2 sm:col-auto">
                            <Users size={12} />
                            <span>{pendingOffers} offers • {auction.watchlistCount || 0} watchers</span>
                        </div>
                    </div>
                </div>

                {/* Mobile: Right side info - stack below, Desktop: inline */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-3 sm:gap-1 w-full sm:w-auto">
                    <div className="text-sm font-bold text-green-600">
                        £{(auction.currentPrice || auction.startPrice)?.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={12} />
                        {!auctionTime?.completed ? (
                            <span>
                                {auctionTime?.days > 0 ? `${auctionTime.days}d` :
                                    auctionTime?.hours > 0 ? `${auctionTime.hours}h` :
                                        `${auctionTime?.minutes}m`}
                            </span>
                        ) : (
                            <span>Ended</span>
                        )}
                    </div>
                </div>

                {/* Mobile: Actions inline with price/time, Desktop: separate */}
                <div className="flex sm:flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/auction/${auction._id}`);
                        }}
                        className="px-4 py-2 sm:px-3 sm:py-1.5 bg-[#edcd1f] text-black text-sm sm:text-xs font-medium rounded hover:bg-[#edcd1f]/90 flex-1 sm:flex-none"
                    >
                        {!isAuctionActive ? 'View Details' : 'Place Bid'}
                    </button>
                    <button
                        onClick={handleWatchlist}
                        className={`p-2 sm:p-1.5 rounded ${isWatchlisted
                            ? 'text-red-500 bg-red-50'
                            : 'text-gray-500 hover:text-red-500 hover:bg-red-50'
                            }`}
                    >
                        <Heart size={20} sm:size={16} fill={isWatchlisted ? 'currentColor' : 'none'} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuctionListItem;