import { BadgeCheckIcon, Star } from "lucide-react";

function Testimonial({ name, review, rating, vehicle }) {
    return (
        <div className="text-left">
            <div className="w-80 h-full flex flex-col items-start border border-gray-500/30 p-5 rounded-lg bg-white">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center flex-shrink-0">
                        <h2 className="text-lg text-gray-900 font-medium">{name}</h2>
                        <BadgeCheckIcon className="text-[#edcd1f]" />
                    </div>
                    <p className="text-sm text-gray-800 mb-4">Bought {vehicle}</p>
                </div>
                
                <div className="flex items-center justify-start mb-3 gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < rating ? 'text-[#edcd1f] fill-[#edcd1f]' : 'text-gray-300'}`} 
                        />
                    ))}
                </div>
                
                <p className="text-sm text-gray-600">{review}</p>
            </div>
        </div>
    );
}

export default Testimonial;