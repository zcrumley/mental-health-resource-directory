export type SubcategoryItem = {
    key: string;
    label: string;
};

export const subcategoryMap: Record<string, SubcategoryItem[]> = {
    "medical-mental-health": [
        { key: "mental health", label: "Psychiatric Inpatient" },
        { key: "medical", label: "Medical" },
        { key: "substance-use", label: "Substance Use" },
        { key: "dental", label: "Dental" },
    ],

    "housing-shelter": [
        { key: "emergency-shelter", label: "Emergency Shelter" },
        { key: "housing-rental-assistance", label: "Housing & Rental Assistance" },
        { key: "temporary-transitional", label: "Temporary & Transitional" },
    ],

    "social-services": [
        {key: "transportation", label:"Transportation"},
        { key: "clothing", label: "Clothing" },
        { key: "education-employment", label: "Education & Employment" },
        { key: "financial", label: "Financial" },
        { key: "legal", label: "Legal" },
    ],

    "specialized-services": [
        { key: "veterans", label: "Veterans" },
        { key: "pregnancy", label: "Pregnancy" },
        { key: "idd", label: "IDD" },
        { key: "deaf", label: "Deaf" },
        { key: "domestic-violence", label: "Domestic Violence" },
        { key: "hiv-aids", label: "HIV / AIDS" },
        { key: "first-responders", label: "First Responders" },
  
    ],
};
