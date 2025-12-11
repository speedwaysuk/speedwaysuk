import { 
    Car, 
    Cog, 
    Trophy, 
    Calendar, 
    Gauge, 
    Fuel, 
    Users, 
    Wrench,
    Settings,
    FileText,
    Award,
    Clock,
    MapPin,
    RefreshCw,
    Zap,
    Palette,
    Shield,
    Cpu,
    Heart,
    Tag,
    Key,
    DollarSign,
    AlertCircle,
    CheckCircle
} from "lucide-react";

// Icon mapping for specification fields - UPDATED WITH ALL NEW FIELDS
const specificationIcons = {
    // Car identification fields
    make: Car,
    model: Settings,
    year: Calendar,
    registration: FileText,
    firstRegistration: Calendar,
    
    // Engine & Performance
    engine: Cog,
    engineSize: Cog,
    horsepower: Zap,
    transmission: Settings,
    fuelType: Fuel,
    
    // Appearance
    color: Palette,
    interiorColor: Palette,
    
    // Condition & Value
    condition: Award,
    capCleanValue: DollarSign,
    
    // History & Ownership
    owners: Users,
    accidentHistory: AlertCircle,
    mileage: Gauge,
    
    // Capacity & Features
    seating: Users,
    keys: Key,
    
    // Documentation
    motExpiry: Calendar,
    v5Document: FileText,
    
    // Additional potential fields
    drivetrain: Settings,
    torque: Zap,
    topSpeed: Gauge,
    acceleration: Zap,
    fuelEconomy: Fuel,
    warranty: Shield,
    serviceHistory: Wrench,
    modifications: Settings,
    features: Cpu,
    ownershipHistory: FileText,
    exterior: Palette,
    interior: Palette,
    safetyFeatures: Shield,
    entertainment: Cpu,
    comfortFeatures: Heart,
    bodyType: Car
};

// Field labels mapping - UPDATED WITH ALL NEW FIELDS
const fieldLabels = {
    // Car identification fields
    make: 'Make',
    model: 'Model', 
    year: 'Year',
    registration: 'Registration Number',
    firstRegistration: 'First Registration',
    
    // Engine & Performance
    engine: 'Engine Type',
    engineSize: 'Engine Size',
    horsepower: 'Horsepower',
    transmission: 'Transmission',
    fuelType: 'Fuel Type',
    
    // Appearance
    color: 'Exterior Color',
    interiorColor: 'Interior Color',
    
    // Condition & Value
    condition: 'Condition',
    capCleanValue: 'CAP Clean Value',
    
    // History & Ownership
    owners: 'Previous Owners',
    accidentHistory: 'Accident History',
    mileage: 'Mileage',
    
    // Capacity & Features
    seating: 'Seating Capacity',
    keys: 'Number of Keys',
    
    // Documentation
    motExpiry: 'MOT Expiry',
    v5Document: 'V5 Document',
    
    // Additional fields
    drivetrain: 'Drivetrain',
    torque: 'Torque',
    topSpeed: 'Top Speed',
    acceleration: '0-60 mph',
    fuelEconomy: 'Fuel Economy',
    warranty: 'Warranty Status',
    serviceHistory: 'Service History',
    modifications: 'Modifications',
    features: 'Features',
    ownershipHistory: 'Ownership History',
    exterior: 'Exterior',
    interior: 'Interior',
    safetyFeatures: 'Safety Features',
    entertainment: 'Entertainment System',
    comfortFeatures: 'Comfort Features',
    bodyType: 'Body Type'
};

// Value formatting functions
const formatValue = (field, value) => {
    if (!value) return '';
    
    // Handle date fields
    if (field === 'firstRegistration' || field === 'motExpiry') {
        try {
            const date = new Date(value);
            return date.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (e) {
            return value;
        }
    }
    
    // Handle number fields with units
    if (field === 'horsepower') return `${value} HP`;
    if (field === 'mileage') return `${value.toLocaleString()} miles`;
    if (field === 'engineSize') return `${value} cc`;
    if (field === 'capCleanValue') return `£${value.toLocaleString()}`;
    if (field === 'seating') return `${value} seats`;
    if (field === 'owners') return `${value} owner${value !== 1 ? 's' : ''}`;
    if (field === 'keys') return `${value} key${value !== 1 ? 's' : ''}`;
    
    // Handle boolean-like fields
    if (field === 'v5Document') {
        if (value === 'Available') return '✓ Available';
        if (value === 'Not Available') return '✗ Not Available';
        if (value === 'Applied For') return '⏳ Applied For';
    }
    
    return value;
};

// Category-specific field groupings - UPDATED WITH NEW FIELDS
const categoryFieldGroups = {
    // For all car categories
    'ALL': {
        'Vehicle Identification': ['make', 'model', 'year', 'registration', 'firstRegistration'],
        'Engine & Performance': ['engine', 'engineSize', 'horsepower', 'transmission', 'fuelType'],
        'Appearance & Interior': ['color', 'interiorColor', 'seating'],
        'Condition & History': ['condition', 'mileage', 'owners', 'accidentHistory'],
        'Value & Documentation': ['capCleanValue', 'motExpiry', 'v5Document', 'keys'],
        
        // Additional groups that can be used conditionally
        'Technical Specifications': ['drivetrain', 'topSpeed', 'acceleration', 'fuelEconomy'],
        'Features & Equipment': ['features', 'safetyFeatures', 'entertainment', 'comfortFeatures'],
        'Service & Maintenance': ['serviceHistory', 'warranty', 'modifications']
    }
};

// Specifications Section Component
const SpecificationsSection = ({ auction }) => {
    if (!auction.specifications || Object.keys(auction.specifications).length === 0) {
        return null;
    }

    // Helper to get value from Map or object
    const getFieldValue = (field) => {
        if (auction.specifications.get) {
            // If it's a Map
            return auction.specifications.get(field);
        } else {
            // If it's a regular object
            return auction.specifications[field];
        }
    };

    // Get all specifications as entries
    const getSpecificationsEntries = () => {
        if (auction.specifications.entries) {
            // If it's a Map
            return Array.from(auction.specifications.entries());
        } else {
            // If it's a regular object
            return Object.entries(auction.specifications);
        }
    };

    // Filter out empty values and create grouped specifications
    const getFieldGroups = () => {
        const groups = categoryFieldGroups['ALL'] || {};
        const validGroups = {};
        
        Object.entries(groups).forEach(([groupName, fields]) => {
            const validFields = fields.filter(field => {
                const value = getFieldValue(field);
                return value !== undefined && value !== null && value !== '' && value !== 0;
            });
            
            if (validFields.length > 0) {
                validGroups[groupName] = validFields;
            }
        });
        
        return validGroups;
    };

    // Check if a field should be displayed in simple view (not in any group)
    const isFieldInAnyGroup = (field, groups) => {
        for (const groupFields of Object.values(groups)) {
            if (groupFields.includes(field)) {
                return true;
            }
        }
        return false;
    };

    const fieldGroups = getFieldGroups();
    const entries = getSpecificationsEntries();

    // If no grouped fields or many ungrouped fields, show all in simple grid
    if (Object.keys(fieldGroups).length === 0) {
        return (
            <div className="mt-8">
                <h3 className="my-5 text-primary text-xl font-semibold flex items-center gap-2">
                    <Car className="w-5 h-5" />
                    Vehicle Specifications
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-5">
                    {entries.map(([key, value]) => {
                        if (!value || value === '' || value === 0) return null;
                        
                        const IconComponent = specificationIcons[key] || FileText;
                        const label = fieldLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        const formattedValue = formatValue(key, value);
                        
                        return (
                            <div key={key} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <IconComponent className="flex-shrink-0 w-5 h-5 mt-1 text-primary" strokeWidth={1.5} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-secondary text-sm font-medium">{label}</p>
                                    <p className="text-base text-gray-900 break-words">{formattedValue}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Get ungrouped fields (fields not in any group)
    const ungroupedEntries = entries.filter(([key]) => !isFieldInAnyGroup(key, fieldGroups));

    return (
        <div className="mt-8">
            <h3 className="my-5 text-primary text-xl font-semibold flex items-center gap-2">
                <Car className="w-5 h-5" />
                Vehicle Specifications
            </h3>
            
            {/* Render grouped fields */}
            {Object.entries(fieldGroups).map(([groupName, fields]) => (
                <div key={groupName} className="mb-6">
                    <h4 className="text-base font-medium text-gray-800 mb-4 border-b pb-2">{groupName}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-5">
                        {fields.map(field => {
                            const value = getFieldValue(field);
                            if (!value || value === '' || value === 0) return null;
                            
                            const IconComponent = specificationIcons[field] || FileText;
                            const label = fieldLabels[field] || field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                            const formattedValue = formatValue(field, value);
                            
                            return (
                                <div key={field} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <IconComponent className="flex-shrink-0 w-8 h-8 mt-1 text-primary" strokeWidth={1} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-secondary text-sm font-medium">{label}</p>
                                        <p className="text-base text-gray-900 break-words">{formattedValue}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
            
            {/* Render ungrouped fields if any */}
            {ungroupedEntries.length > 0 && (
                <div className="mb-6">
                    <h4 className="text-base font-medium text-gray-800 mb-4 border-b pb-2">Additional Information</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-x-5">
                        {ungroupedEntries.map(([key, value]) => {
                            if (!value || value === '' || value === 0) return null;
                            
                            const IconComponent = specificationIcons[key] || FileText;
                            const label = fieldLabels[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                            const formattedValue = formatValue(key, value);
                            
                            return (
                                <div key={key} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <IconComponent className="flex-shrink-0 w-5 h-5 mt-1 text-primary" strokeWidth={1.5} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-secondary text-sm font-medium">{label}</p>
                                        <p className="text-base text-gray-900 break-words">{formattedValue}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpecificationsSection;