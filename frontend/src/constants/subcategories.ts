export type SubcategoryItem = {
    key: string;
    label: string;
};

export const subcategoryMap: Record<string, SubcategoryItem[]> = {
    "medical-mental-health": [
        { key: "psychiatric-inpatient", label: "Psychiatric Inpatient" },
        { key: "general-medical", label: "General Medical" },
        { key: "substance-use", label: "Substance Use" },
        { key: "dental", label: "Dental" },
    ],

    "housing-shelter": [
        { key: "emergency-shelter", label: "Emergency Shelter" },
        { key: "housing-rental-assistance", label: "Housing & Rental Assistance" },
        { key: "temporary-transitional", label: "Temporary & Transitional" },
    ],

    "social-services": [
        { key: "clothing", label: "Clothing" },
        { key: "education-career-development", label: "Education & Career Development" },
        { key: "financial", label: "Financial" },
        { key: "legal", label: "Legal" },
    ],

    "specialized-services": [
        { key: "deaf", label: "Deaf" },
        { key: "domestic-violence", label: "Domestic Violence" },
        { key: "hiv-aids", label: "HIV / AIDS" },
        { key: "first-responders", label: "First Responders" },
        { key: "idd", label: "IDD" },
        { key: "pregnancy", label: "Pregnancy" },
        { key: "veterans", label: "Veterans" },
    ],
};
