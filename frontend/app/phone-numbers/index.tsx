import { View, Text, StyleSheet, ScrollView } from "react-native"
import Screen from "../../components/Screen";
import { theme } from "../../src/styles/theme";
import PhoneCard from "../../components/PhoneCard";


const phoneGroups = [
{
    category: "Emergency",
    numbers: [
        { title: "Police / Fire / EMS", phoneNumber: "911" },
        { title: "988 Suicide & Crisis Lifeline", phoneNumber: "988" }
    ]
},
{
    category: "Crisis & Suicide Prevention",
    numbers: [
        { title: "CHCS Crisis Line", phoneNumber: "1-800-316-9241" },
        { title: "Safe Alternatives", phoneNumber: "1-800-366-8288" },
        { title: "Veterans Crisis Line", phoneNumber: "988 (Press 1)" },
        { title: "COPLINE – Law Enforcement Crisis Support", phoneNumber: "1-800-267-5463" },
        { title: "Heroes Helpline – First Responders & Healthcare Workers", phoneNumber: "833-367-4689" },
        { title: "Mobile Crisis Outreach Team (MCOT)", phoneNumber: "210-223-7233" }
    ]
},
{
    category: "Youth",
    numbers: [
        { title: "Foster Youth Justice Project – Legal Assistance", phoneNumber: "1-877-313-3688" },
        { title: "National Runaway Safeline", phoneNumber: "1-800-786-2929" },
        { title: "Texas Youth Helpline", phoneNumber: "1-800-989-6884" },
        { title: "Trevor Lifeline – LGBTQ Youth Helpline", phoneNumber: "1-866-488-7386" }
    ]
},
{
    category: "Homeless",
    numbers: [
        { title: "Homeless Connection Hotline", phoneNumber: "210-207-1799" },
        { title: "Haven for Hope", phoneNumber: "210-220-2357" },
        { title: "National Homeless Veterans Hotline", phoneNumber: "1-877-424-3838" }
    ]
},
{
    category: "Abuse & Assault",
    numbers: [
        { title: "Family Violence Prevention Services", phoneNumber: "210-733-8810" },
        { title: "Love Is Respect", phoneNumber: "1-866-331-9474" },
        { title: "National Child Abuse Hotline", phoneNumber: "1-800-422-4453" },
        { title: "National Domestic Violence Hotline", phoneNumber: "1-800-799-7233" },
        { title: "RAINN (Rape, Abuse & Incest National Network)", phoneNumber: "1-800-656-4673" },
        { title: "Rape Crisis Line", phoneNumber: "210-349-7273" },
        { title: "Texas Abuse Helpline", phoneNumber: "1-800-252-5400" }
    ]
},
{
    category: "Addiction Services",
    numbers: [
        { title: "Alcoholics Anonymous (Spanish)", phoneNumber: "210-409-8524" },
        { title: "Alcoholics Anonymous", phoneNumber: "210-828-6235" },
        { title: "Narcotics Anonymous", phoneNumber: "1-800-221-9091" },
        { title: "Rise Recovery", phoneNumber: "210-729-2273" },
        { title: "SAMHSA National Helpline", phoneNumber: "1-800-662-4357" },
        { title: "210-SAY-CARE", phoneNumber: "210-729-2273" }
    ]
},
{
    category: "Miscellaneous",
    numbers: [
        { title: "Alamo Service Connection – Seniors & Disabilities", phoneNumber: "210-477-3275" },
        { title: "American Red Cross", phoneNumber: "210-224-5151" },
        { title: "Disaster Distress Helpline", phoneNumber: "1-800-985-5990" },
        { title: "National Eating Disorder Association", phoneNumber: "1-800-931-2237" },
        { title: "National Human Trafficking Resource Center", phoneNumber: "1-888-373-7888" },
        { title: "San Antonio Food Bank", phoneNumber: "210-431-8326" },
        { title: "United Way Hotline", phoneNumber: "211" }
    ]
}
];

export default function PhoneNumbers()
{
    return (
        <Screen>
         <Text style={{ fontSize: 50, fontWeight: "700", color: "#22C55E", textDecorationLine: "underline"  }}>
                Helpful Phone Numbers</Text>
        <ScrollView>
            {phoneGroups.map(group => (
            <View key={group.category}>
             <Text style={{ fontSize: 46, fontWeight: "700", color: "#22C55E" }}>{group.category}</Text>

             {group.numbers.map(number => (
             <PhoneCard
                key={number.phoneNumber}
                title={number.title}
                phoneNumber={number.phoneNumber}
            />
        ))}
    </View>
   

))}

 </ScrollView>
                
        </Screen>
        
    );
}