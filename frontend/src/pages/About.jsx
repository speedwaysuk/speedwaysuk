import { Verified, Upload, Tag, Gavel, BadgeCheck, UserCog2, UserPlus, Clock, Heart, Shield, Users, Award, Car, Calendar, Cpu, CheckCircle, Mail, TrendingUp, Search } from "lucide-react";
import { aboutUs, audi, bmw, faqImg, ford, hyundai, kia, lamborghini, mercedes, renault, skoda, tesla, volkswagen, volvo } from "../assets";
import { Container, HowItWorksCard, Testimonial } from "../components";
import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

const stats = [
    {
        name: 'Trusted Marketplace',
        data: '100%'
    },
    {
        name: 'Completed Sales',
        data: '95%'
    },
    {
        name: 'Verified Listings',
        data: '100%'
    },
    {
        name: 'Customer Satisfaction',
        data: `5/5`
    }
];

const HowItWorksSelling = [
    {
        icon: <Upload />,
        title: 'Submit Your Listing',
        description: 'Begin by submitting your aircraft, aviation parts, or memorabilia through our secure online form. Upload clear photos, accurate details, and any supporting documents to showcase your aircraft or aviation related item.'
    },
    {
        icon: <UserCog2 />,
        title: 'Expert Curation',
        description: `Our aviation specialists carefully review and refine each submission to ensure it's presented in the most compelling way possible. Every listing is tailored for maximum visibility, credebility, and results - giving both you and the buyer confidence in every transaction.`
    },
    {
        icon: <Gavel />,
        title: 'Go Live and Engage',
        description: `Once approved, your listing is published on PlaneVault for our global audience of qualified buyers. You'll have the opportunity to answer questions, share insights, and help your auction reach its highest potential.`
    },
    {
        icon: <BadgeCheck />,
        title: 'Complete the Sale',
        description: 'When the auction closes, PlaneVault connects the winning bidder and seller directly. From there, both parties finalize the transaction on their own terms. For security and convenience, we recommend completing payment through wire transfer or a trusted escrow service'
    }
];

const HowItWorksBuying = [
    {
        icon: <UserPlus />,
        title: 'Register as a Trader',
        description: 'Create a free account and complete trade verification to gain access to the platform.'
    },
    {
        icon: <Clock />,
        title: 'Browse & Monitor Stock',
        description: 'View live, closed, and upcoming vehicles with full listing details and real-time updates.'
    },
    {
        icon: <Gavel />,
        title: 'Bid, Buy, or Make an Offer',
        description: 'Participate in auctions, submit offers, or secure vehicles using Buy Now options. All bids, offers, and purchases are legally binding.'
    },
    {
        icon: <Search />,
        title: 'Inspect Prior to Collection',
        description: 'Buyers are encouraged to inspect and, where permitted, test drive vehicles prior to collection. Any inspection must be completed before the vehicle is collected. Once collection takes place, the sale is confirmed.'
    },
    {
        icon: <BadgeCheck />,
        title: 'Complete Payment & Collection',
        description: 'Once full payment is received, collection or delivery is arranged efficiently and securely. After collection, no returns or claims are accepted, unless expressly agreed in writing in advance.'
    }
];

const testimonials = [
    {
        name: 'Michael R.',
        review: 'The "Make an Offer" feature was perfect. I got exactly what I wanted for my Porsche 911 without the stress of traditional auctions.',
        rating: 5,
        vehicle: 'Porsche 911 Turbo S'
    },
    {
        name: 'Samantha L.',
        review: 'Buying my dream car was so simple with the "Buy Now" option. The entire process was transparent and hassle-free.',
        rating: 5,
        vehicle: 'Mercedes-Benz G-Class'
    },
    {
        name: 'James K.',
        review: 'Sold my classic Mustang through the platform. The instant "Buy Now" purchase saved me weeks of waiting for bids.',
        rating: 4,
        vehicle: 'Ford Mustang GT'
    },
    {
        name: 'Olivia M.',
        review: 'Made an offer on a BMW M3 and it was accepted within hours. The negotiation process was smooth and fair.',
        rating: 5,
        vehicle: 'BMW M3 Competition'
    },
    {
        name: 'Daniel P.',
        review: 'The "Buy Now" option gave me immediate ownership of my Audi R8. No bidding wars, just straight to purchase.',
        rating: 5,
        vehicle: 'Audi R8 V10'
    },
    {
        name: 'Sophia H.',
        review: 'Loved being able to make offers on multiple vehicles. Ended up securing my dream Range Rover at a great price.',
        rating: 4,
        vehicle: 'Land Rover Range Rover'
    },
    {
        name: 'Christopher B.',
        review: 'As a first-time buyer, the "Make an Offer" system was intuitive. Felt in control of the purchase price.',
        rating: 5,
        vehicle: 'Tesla Model S Plaid'
    },
    {
        name: 'Emma W.',
        review: 'Sold my vintage Corvette with "Buy Now" pricing. Had serious offers within minutes of listing.',
        rating: 5,
        vehicle: 'Chevrolet Corvette Stingray'
    }
];

function About() {
    return (
        <section className="pt-24 md:pt-32 pb-16 max-w-full text-gray-600">
            <div className="bg-white">
                <Container>
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 md:py-16">
                        {/* Left Content */}
                        <div className="order-2 lg:order-1">
                            <p className="text-sm font-medium text-[#1e2d3b] mb-4">About Us</p>
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
                                Redefining <br />
                                Vehicle Remarketing <br />
                                For the Motor Trade.
                            </h1>
                            <p className="text-lg md:text-lg text-gray-700 leading-relaxed mb-4">
                                SpeedWays Auto Limited is a trade-only vehicle remarketing and auction platform, providing motor traders with access to nearly new vehicles at wholesale prices.
                            </p>

                            <p className="text-lg md:text-lg text-gray-700 leading-relaxed mb-4">Our focus is on delivering efficient, transparent, and secure transactions through professional auctions, direct sales, and bespoke remarketing services.</p>

                            <p className="text-lg md:text-lg text-gray-700 leading-relaxed mb-4">We work closely with leasing, finance, fleet, and insurance companies, as well as motor traders, to support the full vehicle remarketing lifecycle — from inspection and appraisal through to sale and delivery.</p>
                        </div>

                        {/* Right Image */}
                        <div className="order-1 lg:order-2">
                            <div className="relative h-[400px] lg:h-[550px] rounded-2xl overflow-hidden">
                                {/* Replace this with your actual image */}
                                <img src={faqImg} alt="About Us" className="" />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            {/* A Professional Trade Platform Section */}
            <Container className="my-14">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Left Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                            A Professional Trade Platform
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            SpeedWays Auto is built exclusively for verified motor trade users.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            We do not sell to consumers and all transactions are conducted on a trade sale, sold-as-seen basis.
                        </p>

                        <div className="space-y-4">
                            <p className="text-gray-700 font-medium">Our platform is designed to support:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    "Live and upcoming auctions",
                                    "Buy Now and offer-based sales",
                                    "Direct trader-to-trade transactions",
                                    "Bespoke remarketing solutions for partners"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Image/Icon */}
                    <div className="flex justify-center items-center">
                        <div className="bg-gray-50 rounded-xl p-8 md:p-12 border border-gray-100 w-full max-w-md">
                            <div className="flex flex-col items-center text-center">
                                <div className="p-4 bg-primary/10 rounded-full mb-4">
                                    <Shield className="h-12 w-12 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Trade-Exclusive Access
                                </h3>
                                <p className="text-gray-600">
                                    Verified trade professionals only. No consumer traffic, no retail obligations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Our Experience in Vehicle Remarketing Section */}
            <div className="bg-gray-50 pb-14">
                <Container>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                            Our Experience in Vehicle Remarketing
                        </h2>
                        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                            Backed by industry expertise and a dedicated team focused on trade success
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Trade-Only Platform */}
                        <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Verified className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Trade-Only Platform
                                </h3>
                            </div>
                            <p className="text-gray-700">
                                Verified motor traders and industry partners only. We maintain a professional environment free from consumer buyers.
                            </p>
                        </div>

                        {/* Consistent Sales Activity */}
                        <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <TrendingUp className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Consistent Sales Activity
                                </h3>
                            </div>
                            <p className="text-gray-700">
                                Vehicles sold regularly through auctions and direct sales. Reliable marketplace with active trade participation.
                            </p>
                        </div>

                        {/* Dedicated Support */}
                        <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-amber-100 rounded-lg">
                                    <Users className="h-6 w-6 text-amber-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900">
                                    Dedicated Support
                                </h3>
                            </div>
                            <p className="text-gray-700">
                                Experienced team available during business hours. Personalised assistance for trade-specific requirements.
                            </p>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Brands we work with */}
            <Container className="mb-14">
                <div className="max-w-full mx-auto mb-8 text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                        Brands & Vehicle Types
                    </h2>
                    <p className="text-lg text-gray-700 mb-2">
                        We remarket vehicles across a wide range of manufacturers and categories, including passenger vehicles, premium marques, and specialist stock, depending on partner supply and market demand.
                    </p>
                    <p className="text-gray-500 text-sm">(Vehicle availability varies and is subject to ongoing listings.)</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-1.5 mx-auto">
                    {/* <div className="flex items-center justify-center h-20 w-44 md:h-24 md:w-60 bg-slate-100/80 hover:bg-slate-100 transition-all duration-100">
                        <img src={audi} alt="audi" className="h-10" />
                    </div> */}
                    <div className="flex items-center justify-center h-20 w-44 md:h-24 md:w-60 bg-slate-100/80 hover:bg-slate-100 transition-all duration-100">
                        <img src={kia} alt="kia" className="h-10 mix-blend-multiply" />
                    </div>
                    <div className="flex items-center justify-center h-20 w-44 md:h-24 md:w-60 bg-slate-100/80 hover:bg-slate-100 transition-all duration-100">
                        <img src={hyundai} alt="hyundai" className="h-10 mix-blend-multiply" />
                    </div>
                    {/* <div className="flex items-center justify-center h-20 w-44 md:h-24 md:w-60 bg-slate-100/80 hover:bg-slate-100 transition-all duration-100">
                        <img src={ford} alt="ford" className="h-10" />
                    </div> */}
                    <div className="flex items-center justify-center h-20 w-44 md:h-24 md:w-60 bg-slate-100/80 hover:bg-slate-100 transition-all duration-100">
                        <img src={mercedes} alt="mercedes" className="h-12 mix-blend-multiply" />
                    </div>
                    <div className="flex items-center justify-center h-20 w-44 md:h-24 md:w-60 bg-slate-100/80 hover:bg-slate-100 transition-all duration-100">
                        <img src={bmw} alt="bmw" className="h-12 mix-blend-multiply" />
                    </div>
                    <div className="flex items-center justify-center h-20 w-44 md:h-24 md:w-60 bg-slate-100/80 hover:bg-slate-100 transition-all duration-100">
                        <img src={volkswagen} alt="volkswagen" className="h-12 mix-blend-multiply" />
                    </div>
                    <div className="flex items-center justify-center h-20 w-44 md:h-24 md:w-60 bg-slate-100/80 hover:bg-slate-100 transition-all duration-100">
                        <img src={volvo} alt="volvo" className="h-12 mix-blend-multiply" />
                    </div>
                    <div className="flex items-center justify-center h-20 w-44 md:h-24 md:w-60 bg-slate-100/80 hover:bg-slate-100 transition-all duration-100">
                        <img src={lamborghini} alt="lamborghini" className="h-12 mix-blend-multiply" />
                    </div>
                    <div className="flex items-center justify-center h-20 w-44 md:h-24 md:w-60 bg-slate-100/80 hover:bg-slate-100 transition-all duration-100">
                        <img src={renault} alt="renault" className="h-12 mix-blend-multiply" />
                    </div>
                    <div className="flex items-center justify-center h-20 w-44 md:h-24 md:w-60 bg-slate-100/80 hover:bg-slate-100 transition-all duration-100">
                        <img src={tesla} alt="tesla" className="h-12 mix-blend-multiply" />
                    </div>
                    <div className="flex items-center justify-center h-20 w-44 md:h-24 md:w-60 bg-slate-100/80 hover:bg-slate-100 transition-all duration-100">
                        <img src={skoda} alt="skoda" className="h-12 mix-blend-multiply" />
                    </div>
                </div>
            </Container>

            {/* Why choose SpeedWays Auto */}
            <div className="">
                <Container>
                    <div className="max-w-full mx-auto mb-10 text-left">
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                            Why Work With SpeedWays Auto?
                        </h2>
                        <p className="text-lg text-gray-700">
                            A smarter, safer, and more transparent way to buy and sell vehicles online.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Decorative line */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-2 gap-8 md:gap-12">

                            {/* Left Column */}
                            <div className="space-y-8 md:pr-12">

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="p-2 bg-green-100 rounded-lg">
                                            <TrendingUp className="h-5 w-5 text-green-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            Professional Remarketing
                                        </h3>
                                        <p className="text-gray-600">
                                            We provide structured, trade-focused remarketing solutions designed to maximise value and reduce time-to-sale.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <CheckCircle className="h-5 w-5 text-blue-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            Accurate Listings
                                        </h3>
                                        <p className="text-gray-600">
                                            Vehicles are inspected and appraised prior to listing, with condition notes provided to support informed trade purchasing.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="p-2 bg-purple-100 rounded-lg">
                                            <Cpu className="h-5 w-5 text-purple-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            Smart, Modern Platform
                                        </h3>
                                        <p className="text-gray-600">
                                            Built with advanced technology for smooth browsing, secure offers, and hassle-free transactions.
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* Right Column */}
                            <div className="space-y-8 md:pl-12">

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="p-2 bg-amber-100 rounded-lg">
                                            <Heart className="h-5 w-5 text-amber-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            Trade-Focused Platform
                                        </h3>
                                        <p className="text-gray-600">
                                            Built specifically for the motor trade — no consumer traffic, no retail obligations, no unnecessary friction.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="p-2 bg-cyan-100 rounded-lg">
                                            <Calendar className="h-5 w-5 text-cyan-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            Flexible Selling Options
                                        </h3>
                                        <p className="text-gray-600">
                                            Sell through live auctions, Buy Now pricing, or negotiated offers depending on your stock and strategy.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="p-2 bg-red-100 rounded-lg">
                                            <Shield className="h-5 w-5 text-red-600" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            Secure & Transparent Transactions
                                        </h3>
                                        <p className="text-gray-600">
                                            All sales are processed through SpeedWays Auto, with clear documentation, binding bids, and controlled payment processes.
                                        </p>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </Container>
            </div>

            {/* <Container className="my-14">
                <section className="">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">How It Works - Selling on PlaneVault</h2>
                    <p className="text-sm md:text-base text-gray-500 mt-3 mb-8">
                        Simple steps, seamless auctions — see how Plane Vault makes listing and selling aviation assets effortless.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 xl:gap-8">
                        {
                            HowItWorksSelling && HowItWorksSelling.map((howItWork, i) => {
                                return (
                                    <HowItWorksCard key={howItWork.title} index={i} icon={howItWork.icon} title={howItWork.title} description={howItWork.description} />
                                )
                            })
                        }
                    </div>
                </section>
            </Container> */}

            <Container className="my-14">
                <section className="">
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">How It Works</h2>
                    <p className="text-sm md:text-base text-gray-500 mt-3 mb-8">
                        Effortless bidding, confident buying — experience how SpeedWays Auto makes finding the right car simple and smooth.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 xl:gap-8">
                        {
                            HowItWorksBuying && HowItWorksBuying.map((howItWork, i) => {
                                return (
                                    <HowItWorksCard key={howItWork.title} index={i} icon={howItWork.icon} title={howItWork.title} description={howItWork.description} />
                                )
                            })
                        }
                    </div>
                </section>
            </Container>

            {/* Selling With SpeedWays Auto Section */}
            <Container className="my-14">
                <div className="max-w-full mx-auto mb-8 text-left">
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                        Selling With SpeedWays Auto
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        We also support motor traders, fleets, and partners looking to remarket stock.
                    </p>

                    <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-100">
                        <p className="text-gray-700 mb-4">
                            Our services include:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-gray-700">Vehicle inspection and appraisal</span>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-gray-700">Professional listings</span>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-gray-700">Storage solutions</span>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-gray-700">Collection and delivery</span>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-gray-700">Vehicle preparation</span>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 mt-1">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-gray-700">Mechanical and bodywork repairs</span>
                            </div>

                            <div className="flex items-start gap-3 md:col-span-2">
                                <div className="flex-shrink-0 mt-1">
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                </div>
                                <span className="text-gray-700">Bespoke remarketing strategies</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <p className="text-gray-700">
                                For sellers, we provide tailored quotations based on stock volume and service requirements.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Testimonials section */}
            {/* <section className="my-14">
                <Container>
                    <h2 className="text-3xl md:text-4xl font-bold text-primary">
                        What Our Customers Say
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 mt-3">
                        Trusted by car buyers and sellers across the UK — discover why thousands rely on SpeedWays Auto for every automotive deal.
                    </p>
                    <Marquee speed={50} gradient={false} pauseOnHover={true}>
                        <div className="flex flex-wrap justify-between items-stretch gap-5 mt-8 mx-5 text-left">
                            {
                                testimonials?.slice(0, 4).map(testimonial => (
                                    <Testimonial
                                        key={testimonial.name}
                                        name={testimonial.name}
                                        review={testimonial.review}
                                        rating={testimonial.rating}
                                        vehicle={testimonial.vehicle}
                                    />
                                ))
                            }
                        </div>
                    </Marquee>

                    <Marquee speed={50} direction="right" gradient={false} pauseOnHover={true}>
                        <div className="flex flex-wrap justify-between items-stretch gap-5 mt-8 mx-5 text-left">
                            {
                                testimonials?.slice(4, 8).map(testimonial => (
                                    <Testimonial
                                        key={testimonial.name}
                                        name={testimonial.name}
                                        review={testimonial.review}
                                        rating={testimonial.rating}
                                        vehicle={testimonial.vehicle}
                                    />
                                ))
                            }
                        </div>
                    </Marquee>
                </Container>
            </section> */}
        </section >
    );
}

export default About;