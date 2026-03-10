import { View, Text, StyleSheet } from "react-native"
import Screen from "../../components/Screen";
import { theme } from "../../src/styles/theme";
import PhoneCard from "../../components/PhoneCard";


export default function PhoneNumbers()
{
    return (
        <Screen>
         <Text style={{ fontSize: 50, fontWeight: "700", color: "#22C55E" }}>
                Emergency Numbers</Text>
        
            <PhoneCard title ="Emergency" phoneNumber="911"/>
                
        </Screen>
        
    );
}