import { useState, Suspense, lazy, useEffect, forwardRef } from "react";
import { MessageSquare, Gavel, Notebook, DollarSign, PoundSterling } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const LoadingSpinner = lazy(() => import("./LoadingSpinner"));
const CommentSection = lazy(() => import("./CommentSection"));
const BidHistory = lazy(() => import("./BidHistory"));
const Description = lazy(() => import("./Description"));
const OffersSection = lazy(() => import("./OffersSection"));

const TabSection = forwardRef(({ description, bids, offers, auction, activatedTab, onAuctionUpdate }, ref) => {
  const [activeTab, setActiveTab] = useState(activatedTab || "description");
  const { user } = useAuth();

  // Sync internal state when activatedTab prop changes
  useEffect(() => {
    if (activatedTab) {
      setActiveTab(activatedTab);
    }
  }, [activatedTab]);

  const userHasOffers = () => {
    if (!user) return false;

    // If activatedTab is 'offers', always show it (for immediate display after making offer)
    if (activatedTab === 'offers') {
      return true;
    }

    if (!offers || offers.length === 0) return false;

    // Use the same logic as getUserOffers
    const userOffers = offers.filter(offer => {
      const buyerId = offer.buyer?._id || offer.buyer;
      return buyerId && buyerId.toString() === user._id.toString();
    });

    return userOffers.length > 0;
  };

  const getUserOffers = () => {
    if (!user || !offers) return [];
    return offers.filter(offer => {
      // Handle both populated and unpopulated buyer objects
      const buyerId = offer.buyer?._id || offer.buyer;
      return buyerId && buyerId.toString() === user._id.toString();
    });
  };

  // Build tabs array
  const tabs = [
    // {
    //   id: "comments",
    //   label: "Comments",
    //   icon: <MessageSquare size={18} />,
    //   component: <CommentSection auctionId={auction._id} />,
    // },
    // {
    //   id: "bids",
    //   label: "Bid History",
    //   icon: <Gavel size={18} />,
    //   component: <BidHistory bids={bids} auction={auction} />,
    // },
    // {
    //   id: "description",
    //   label: "Description",
    //   icon: <Notebook size={18} />,
    //   component: <Description description={description} />,
    // },
  ];

  // Add offers tab only if user has made offers
  if (userHasOffers()) {
    tabs.push({
      id: "offers",
      label: "My Offers",
      icon: <PoundSterling size={18} />,
      component: <OffersSection
        offers={getUserOffers()}
        auction={auction}
        onAuctionUpdate={onAuctionUpdate} // Pass it down
      />,
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex flex-wrap -mb-px">
              <button
                key={`description`}
                onClick={() => setActiveTab('description')}
                className={`
                flex items-center px-6 py-4 text-base md:text-lg font-medium border-b-2 transition-colors
                ${activeTab === 'description'
                    ? "border-primary text-primary"
                    : "border-transparent text-secondary hover:text-primary hover:border-gray-300"
                  }
              `}
              >
                <Notebook size={18} />
                <span className="ml-2">Description</span>
              </button>

              {
                (auction.auctionType === 'standard' || auction.auctionType === 'reserve') && (
                  <button
                    key={`bids`}
                    onClick={() => setActiveTab('bids')}
                    className={`
                flex items-center px-6 py-4 text-base md:text-lg font-medium border-b-2 transition-colors
                ${activeTab === 'bids'
                        ? "border-primary text-primary"
                        : "border-transparent text-secondary hover:text-primary hover:border-gray-300"
                      }
              `}
                  >
                    <Gavel size={18} />
                    <span className="ml-2">Bid History</span>
                  </button>
                )
              }
        </nav>
      </div>

      {/* Tab Content */}
      <div ref={ref} className="p-4 sm:p-6">
        <Suspense fallback={<LoadingSpinner />}>
          {/* {tabs.find((tab) => tab.id === activeTab)?.component} */}
          {activeTab === 'bids' && <BidHistory bids={bids} auction={auction} />}
          {activeTab === 'description' && <Description description={description} />}
        </Suspense>
      </div>
    </div>
  );
});

TabSection.displayName = "TabSection";

export default TabSection;