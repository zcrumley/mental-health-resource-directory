import { Pressable, Text, StyleSheet, Linking } from "react-native";
import { theme } from "../src/styles/theme";

type Props = {
    phoneNumber: string;
    title: string;
};


export default function PhoneCard({ phoneNumber, title }: Props)
{
    return (
        <Pressable style={styles.card} onPress={() => Linking.openURL("tel:" + phoneNumber)}>
        <Text>
        {title}
        </Text>
        <Text>
        {phoneNumber}
        </Text>
         </Pressable>


    )

}


const styles = StyleSheet.create({
    card:
    {
        backgroundColor: theme.colors.card,
        borderRadius: theme.radius.lg,
        padding: theme.spacing.lg,

        borderWidth: 1,
        borderColor: theme.colors.border,

        marginBottom: theme.spacing.md,

        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2
    }
});